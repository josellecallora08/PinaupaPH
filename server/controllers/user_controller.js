const TENANTMODEL = require('../models/tenant')
const USERMODEL = require('../models/user')
const UNITMODEL = require('../models/unit')
const PAYMENTMODEL = require('../models/payment')
const TOKENMODEL = require('../models/token')
const httpStatusCodes = require('../constants/constants')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const OTPMODEL = require('../models/otp')
const nodemailer = require('nodemailer')
const { emailContent } = require('../template/emailTemplate')

const cloudinary = require('cloudinary').v2

const createToken = (id, username, role) => {
  return jwt.sign({ id, username, role }, process.env.SECRET, {
    expiresIn: '3d',
  })
}

// * Done Testing API
module.exports.sign_up = async (req, res) => {
  try {
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //   return res.status(httpStatusCodes.BAD_REQUEST).json({ errors: errors.array() });
    // }

    const role = req.user.role;
    if (role !== 'Admin') {
      return res.status(httpStatusCodes.UNAUTHORIZED).json({ error: 'Unauthorized. Only admin can add tenants.' });
    }

    const {
      name,
      username,
      email,
      password,
      mobile_no,
      birthday,
      unit_id,
      deposit,
      occupancy,
    } = req.body;
    
    // Validation for email and mobile number
    const emailRegex = /^\S+@\S+\.\S+$/;
    const mobileRegex = /^[0-9]{10}$/;

    if (!email) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({ error: 'Invalid email format.' });
    }

    if (!mobile_no) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({ error: 'Invalid mobile number format.' });
    }

    // Check if password is provided
    if (!password) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({ error: 'Password is required.' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);
    if (!hashed) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({ error: 'Error hashing the password.' });
    }

    const details = {
      name,
      username,
      email,
      password: hashed,
      mobile_no,
      birthday,
      monthly_due: occupancy
    };

    // Check if user already exists
    const existingUser = await USERMODEL.findOne({ $or: [{ username }, { email }, { mobile_no }] });
    if (existingUser) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({ error: 'User with this username, email, or mobile number already exists.' });
    }

    const unit_status = await UNITMODEL.findById(unit_id);
    if (unit_status.occupied === true) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({ error: `Unit ${unit_id} is already occupied.` });
    }

    let response = await USERMODEL.create(details);

    // File Upload
    const imageUpload = await cloudinary.uploader.upload(`./template/profile-default.svg`, {
      quality: 'auto:low',
      folder: 'PinaupaPH/Profile',
      resource_type: 'auto',
    });

    if (!imageUpload || !imageUpload.secure_url) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({ error: 'Failed to upload profile image.' });
    }

    response.profile_image.image_url = imageUpload.secure_url;
    response.profile_image.public_id = imageUpload.public_id;

    if (response.role === 'Tenant') {
      const tenant = await TENANTMODEL.create({
        user_id: response._id,
        unit_id,
        deposit
      });
      if (!tenant) {
        return res.status(httpStatusCodes.BAD_REQUEST).json({ error: 'Failed to create Tenant Data.' });
      }
    }

    await response.save();

    const unit = await UNITMODEL.findByIdAndUpdate( unit_id, { occupied: true });
    if (!unit) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({ error: 'Failed to update occupancy status at Unit Collection.' });
    }

    // Token Creation
    // const token = createToken(response._id, response.username, response.role);
    // res.cookie('token', token, { maxAge: 900000 });

    // Sanitize response
    // const sanitizedResponse = {
    //   name: response.name,
    //   username: response.username,
    //   email: response.email,
    //   role: response.role
    // };

    return res.status(httpStatusCodes.OK).json({ msg: 'Created Account successfully!', response});
  } catch (err) {
    console.error('Error during sign up:', err);
    return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal server error.' });
  }
};
// * Done Testing API
module.exports.sign_in = async (req, res) => {
  const { username, password } = req.body
  try {
    let response = await USERMODEL.findOne({ username })
    if (!response) {
      response = await USERMODEL.findOne({ email: username })
      if (!response)
        return res
          .status(httpStatusCodes.BAD_REQUEST)
          .json({ error: 'Invalid Credentials (temp - Username)' })
    }

    const match = await bcrypt.compare(password, response.password)
    if (!match)
      return res
        .status(httpStatusCodes.BAD_REQUEST)
        .json({ error: 'Invalid Credentials (temp - Password)' })

    // Create token
    const token = createToken(response._id, response.username, response.role)

    // // Store token in the database with TTL
    // if (!(await TOKENMODEL.findOne({user_id:response._id}))) {
    //   const generateToken = await TOKENMODEL.create({
    //     user_id: response._id,
    //     token: token,
    //     expiresAt: new Date(Date.now() + 60000), // Set expiry time for 5 minutes (300,000 milliseconds)
    //   })

    //   if (!generateToken)
    //     return res
    //       .status(httpStatusCodes.UNAUTHORIZED)
    //       .json({ error: 'Unable to store token in DB' })
    // }

    // const generateToken = await TOKENMODEL.findOneAndUpdate({user_id:response._id},{
    //   token: token
    // })

    // if (!generateToken)
    //     return res
    //       .status(httpStatusCodes.UNAUTHORIZED)
    //       .json({ error: 'Unable to store token in DB' })

    // // Set token in cookie (optional)
    res.cookie('token', token, { maxAge: 300000 })

    return res
      .status(httpStatusCodes.OK)
      .json({ msg: 'Login Successfully!', response, token })
  } catch (err) {
    console.error({ error: err.message })
    return res
      .status(httpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Server Error...' })
  }
}

// * Tested API
module.exports.search_user = async (req, res) => {
  try {
    const { filter } = req.query
    let search = await TENANTMODEL.aggregate([
      {
        $lookup: {
          from: 'units',
          localField: 'unit_id',
          foreignField: '_id',
          as: 'unit',
        },
      },
      {
        $unwind: {
          path: '$unit',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'user_id',
          foreignField: '_id',
          as: 'user',
        },
      },
      {
        $unwind: {
          path: '$user',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $match: {
          $or: [
            { 'unit.unit_no': filter },
            { 'user.name': { $regex: filter, $options: 'i' } },
          ],
        },
      },
      {
        $sort: { createdAt: -1 },
      },
    ])

    if (!search || search.length <= 0) {
      return res
        .status(httpStatusCodes.NOT_FOUND)
        .json({ msg: 'No matching records..' })
    }

    search = search.map((item) => {
      let userData = {
        _id: item.user_id._id,
        name: item.user.name,
        image: item.user.profile_image.image_url,
        image_id: item.user.profile_image.public_id,
        username: item.user.username,
        email: item.user.email,
        birthday: item.user.birthday,
        phone: item.user.mobile_no,
        role: item.user.role,
        unit_id: '',
        rent: '',
        deposit: item.deposit,
        advance: item.advance,
        balance: item.balance,
        monthly_due:
          item.monthly_due !== null
            ? new Date(item.monthly_due).toDateString()
            : null,
      }

      if (item.unit_id) {
        userData.unit_id = item.unit_id._id
        userData.unit_no = item.unit.unit_no
        userData.rent = item.unit.rent
      }

      return userData
    })

    return res.status(httpStatusCodes.OK).json(search)
  } catch (err) {
    console.error({ error: err.message })
    return res
      .status(httpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Server Error...' })
  }
}

// * Tested API
module.exports.fetch_users = async (req, res) => {
  // const generatedToken = req.newToken
  // const role = req.user.role
  // if (role !== 'Admin') {
  //   return res
  //     .status(httpStatusCodes.BAD_REQUEST)
  //     .json({ error: 'Unauthorized. Only admin can add tenants.' })
  // }
  let user = await TENANTMODEL.find()
    .populate({
      path: 'user_id',
      model: USERMODEL,
      select: 'name username email profile_image birthday mobile_no role',
    })
    .populate({
      path: 'unit_id',
      model: UNITMODEL,
      select: 'unit_no rent',
    })
    .select('-payment -household -pet -createdAt -updatedAt')

  try {
    if (!user) {
      return res
        .status(httpStatusCodes.NOT_FOUND)
        .json({ error: 'User not found' })
    }

    user = user.map((item) => {
      let userData = {
        _id: item.user_id._id,
        image: item.user_id.profile_image.image_url,
        image_id: item.user_id.profile_image.public_id,
        name: item.user_id.name,
        username: item.user_id.username,
        email: item.user_id.email,
        birthday: item.user_id.birthday,
        phone: item.user_id.mobile_no,
        role: item.user_id.role,
      }

      if (item.unit_id) {
        userData.unit_id = item.unit_id._id
        userData.unit_no = item.unit_id.unit_no
        userData.rent = item.unit_id.rent
      }

      userData.deposit = item.deposit
      userData.advance = item.advance
      userData.balance = item.balance
      userData.monthly_due =
        item.monthly_due !== null
          ? new Date(item.monthly_due).toDateString()
          : null

      return userData
    })

    return res.status(httpStatusCodes.OK).json({user})
  } catch (err) {
    console.error({ error: err.message })
    return res
      .status(httpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Server Error...' })
  }
}

module.exports.fetch_user = async (req, res) => {
  const { user_id } = req.query
  let user = await TENANTMODEL.findOne({ user_id: user_id })
    .populate({
      path: 'user_id',
      model: USERMODEL,
      select: 'name username email profile_image mobile_no role birthday',
    })
    .populate({
      path: 'unit_id',
      model: UNITMODEL,
      select: 'unit_no rent',
    })
    .select('-payment -household -pet -createdAt -updatedAt')

  try {
    if (!user) {
      return res
        .status(httpStatusCodes.NOT_FOUND)
        .json({ error: 'User not found' })
    }

    let userData = {
      id: user.user_id._id,
      name: user.user_id.name,
      image: user.user_id.profile_image.image_url,
      image_id: user.user_id.profile_image.public_id,
      birthday: user.user_id.birthday,
      username: user.user_id.username,
      email: user.user_id.email,
      phone: user.user_id.mobile_no,
      role: user.user_id.role,
      unit_id: '',
      unit_no: '',
      rent: '',
      deposit: user.deposit,
      advance: user.advance,
      balance: user.balance,
      monthly_due:
        user.monthly_due !== null
          ? new Date(user.monthly_due).toDateString()
          : null,
    }

    if (user.unit_id) {
      userData.unit_id = user.unit_id._id
      userData.unit_no = user.unit_id.unit_no
      userData.rent = user.unit_id.rent
    }

    return res.status(httpStatusCodes.OK).json(userData)
  } catch (err) {
    console.error({ error: err.message })
    return res
      .status(httpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Server Error...' })
  }
}

// * Tested API
module.exports.fetch_data = async (req, res) => {
  const user_id = req.user.id

  try {
    if (req.user.role === 'Admin') {
      let response = await USERMODEL.findById(user_id)
      if (!response)
        return res
          .status(httpStatusCodes.BAD_REQUEST)
          .json({ error: 'User not found: Admin' })

      response = {
        id: response._id,
        image: response.profile_image.image_url,
        image_id: response.profile_image.public_id,
        name: response.name,
        username: response.username,
        email: response.email,
        phone: response.mobile_no,
        role: response.role,
        birthday: response.birthday,
      }

      return res.status(httpStatusCodes.OK).json(response)
    }

    let user = await TENANTMODEL.findOne({ user_id: user_id })
      .populate({
        path: 'user_id',
        model: USERMODEL,
        select: 'name username email profile_image mobile_no role',
      })
      .populate({
        path: 'unit_id',
        model: UNITMODEL,
        select: 'unit_no rent',
      })
      .select('-payment -household -pet -createdAt -updatedAt')

    if (!user) {
      return res
        .status(httpStatusCodes.NOT_FOUND)
        .json({ error: 'User not found' })
    }

    let userData = {
      id: user.user_id._id,
      image: user.user_id.profile_image.image_url,
      image_id: user.user_id.profile_image.public_id,
      name: user.user_id.name,
      username: user.user_id.username,
      email: user.user_id.email,
      phone: user.user_id.mobile_no,
      role: user.user_id.role,
      deposit: user.deposit,
      advance: user.advance,
      balance: user.balance,
      monthly_due:
        user.monthly_due !== null
          ? new Date(user.monthly_due).toDateString()
          : null,
    }

    if (user.unit_id) {
      userData.unit_id = user.unit_id._id
      userData.unit_no = user.unit_id.unit_no
      userData.rent = user.unit_id.rent
    }

    return res.status(httpStatusCodes.OK).json(userData)
  } catch (err) {
    console.error({ error: err.message })
    return res
      .status(httpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Server Error...' })
  }
}

// * Done checking on POSTMAN API
module.exports.update_profile = async (req, res) => {
  const { user_id } = req.params
  const {
    name,
    username,
    email,
    newpassword,
    confirmpassword,
    password,
    mobile_no,
    birthday,
  } = req.body
  const salt = await bcrypt.genSalt(10)
  const details = {}
  if (name !== '') details.name = name
  if (username !== '') details.username = username
  if (email !== '') details.email = email
  if (mobile_no !== '') details.mobile_no = mobile_no
  if (birthday !== '') details.birthday = birthday
  try {
    let response = await USERMODEL.findByIdAndUpdate(
      { _id: user_id },
      details,
    ).select('name username password email phone birthday role')
    if (!response)
      return res
        .status(httpStatusCodes.BAD_REQUEST)
        .json({ error: 'Failed to update information(2)' })

    if (password && newpassword && confirmpassword) {
      if (newpassword !== confirmpassword)
        return res
          .status(httpStatusCodes.BAD_REQUEST)
          .json({ msg: 'New password does not match' })
    }

    if (password && newpassword) {
      if (bcrypt.compareSync(password, response.password)) {
        const hashed = await bcrypt.hash(newpassword, salt)
        if (!hashed)
          return res
            .status(httpStatusCodes.BAD_REQUEST)
            .json({ error: 'Error hashing the password.' })

        response.password = hashed
      }
    }

    await response.save()

    return res
      .status(httpStatusCodes.OK)
      .json({ msg: 'Information Updated Successfully!', response })
  } catch (err) {
    console.error({ error: err.message })
    return res
      .status(httpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Server Error...' })
  }
}
// * Tested API
module.exports.update_unit_info = async (req, res) => {
  try {
    const role = req.user.role
    if (role !== 'Admin') {
      return res.status(httpStatusCodes.UNAUTHORIZED).json({
        error: 'Unauthorized. Only admin can update tenant information.',
      })
    }

    const { user_id } = req.params
    const { unit_id, deposit, occupancy } = req.body

    // Find the current tenant
    const tenant = await TENANTMODEL.findOne({ user_id: user_id })
    if (!tenant) {
      return res
        .status(httpStatusCodes.NOT_FOUND)
        .json({ error: 'User not found' })
    }

    // Retrieve the current unit assigned to the tenant
    const currentUnit = await UNITMODEL.findById(tenant.unit_id)
    if (!currentUnit) {
      const newUnit = await UNITMODEL.findById(unit_id)
      if (!newUnit) {
        return res
          .status(httpStatusCodes.NOT_FOUND)
          .json({ error: 'New unit not found' })
      }
      newUnit.occupied = true // Assuming "true" means occupied
      await newUnit.save()
    }

    // Update the status of the current unit to false
    currentUnit.occupied = false
    await currentUnit.save()

    // Update tenant information with the new unit
    if (unit_id) {
      tenant.unit_id = unit_id

      const newUnit = await UNITMODEL.findById(unit_id)
      if (!newUnit) {
        return res
          .status(httpStatusCodes.NOT_FOUND)
          .json({ error: 'New unit not found' })
      }
      newUnit.occupied = true // Assuming "true" means occupied
      await newUnit.save()
    }
    if (deposit) {
      tenant.deposit = deposit
    }

    if (occupancy) {
      tenant.monthly_due = occupancy
    }
    await tenant.save()

    return res
      .status(httpStatusCodes.OK)
      .json({
        message: 'Tenant information updated successfully',
        response: tenant,
      })
  } catch (err) {
    console.error({ error: err.message })
    return res
      .status(httpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Server Error' })
  }
}
// * Tested API
module.exports.update_profile_picture = async (req, res) => {
  try {
    const user_id = req.user.id
    const { public_id } = req.query
    const profile_image = req.file
    // console.log(profile_image)
    const b64 = Buffer.from(profile_image.buffer).toString('base64')
    let dataURI = 'data:' + profile_image.mimetype + ';base64,' + b64
    console.log(`dataURI: ${dataURI}`)
    uploadedImage = await cloudinary.uploader.upload(dataURI, {
      public_id: public_id,
      overwrite: true,
      quality: 'auto:low',
      resource_type: 'auto',
      folder: 'PinaupaPH/Profile',
    })

    console.log(uploadedImage)

    if (!uploadedImage || !uploadedImage.secure_url) {
      return res
        .status(httpStatusCodes.BAD_REQUEST)
        .json({ error: 'Failed to upload profile.' })
    }
    const url = uploadedImage.secure_url
    const response = await USERMODEL.findByIdAndUpdate(
      { _id: user_id },
      {
        profile_image: {
          image_url: url,
          public_id: public_id,
        },
      },
    )
    if (!response) {
      return res
        .status(httpStatusCodes.BAD_REQUEST)
        .json({ error: 'Failed to change image' })
    }

    return res
      .status(httpStatusCodes.OK)
      .json({ msg: 'Profile has been changed' })
  } catch (err) {
    console.error({ err })
    return res
      .status(httpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: `Server Error: ${err.message}` })
  }
}
//  * Tested API
module.exports.delete_tenant = async (req, res) => {
  try {
    const role = req.user.role
    if (role !== 'Admin') {
      return res
        .status(httpStatusCodes.BAD_REQUEST)
        .json({ error: 'Unauthorized. Only admin can add tenants.' })
    }

    const { user_id } = req.query
    const response = await USERMODEL.findByIdAndDelete({ _id: user_id })
    if (!response) {
      return res
        .status(httpStatusCodes.NOT_FOUND)
        .json({ error: 'User not found...' })
    }

    await cloudinary.uploader.destroy(response.profile_image.public_id)
    console.log('deleted successfully!')
    if (response.role === 'Tenant') {
      const tenant = await TENANTMODEL.findOneAndDelete({ user_id: user_id })
      if (!tenant)
        return res
          .status(httpStatusCodes.BAD_REQUEST)
          .json({ error: 'Unable to Locate Tenant' })

      const unit = await UNITMODEL.findByIdAndUpdate(
        { _id: tenant.unit_id },
        { occupied: false },
      )

      if (!unit)
        return res
          .status(httpStatusCodes.BAD_REQUEST)
          .json({ error: 'Unable to locate Unit' })
    }

    return res
      .status(httpStatusCodes.OK)
      .json({ msg: 'Removed Successfully...', response })
  } catch (err) {
    console.error({ error: err.message })
    return res
      .status(httpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Server Error...' })
  }
}

module.exports.forgot_password = async (req, res) => {
  try {
    const { email } = req.query
    const response = await USERMODEL.findOne({ email: email })
    if (!response)
      return res
        .status(httpStatusCodes.BAD_REQUEST)
        .json({ error: `${email} does not exists.` })

    const pin = Math.floor(100000 + Math.random() * 900000)
    // Save pin, email, and expiration timestamp in a database
    let expirationTime = new Date()
    expirationTime = expirationTime.setMinutes(expirationTime.getMinutes() + 10) // Expires after 10 minutes
    // Assuming you have a method in your user model to save the pin and expiration time
    const otp = await OTPMODEL.create({ email, pin, expiry: expirationTime })

    // Send the pin to the provided email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GOOGLE_EMAIL,
        pass: process.env.GOOGLE_PASSWORD,
      },
    })

    await transporter.sendMail({
      from: process.env.GOOGLE_EMAIL,
      to: email,
      subject: 'Password Reset Pin',
      html: emailContent(response.name, pin),
    })

    return res
      .status(httpStatusCodes.OK)
      .json({ msg: `OTP has been sent your email: ${email} `, otp: otp._id })
  } catch (err) {
    console.error('Error in forgot password:', err)
    res
      .status(httpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Internal server error.' })
  }
}

module.exports.check_otp = async (req, res) => {
  try {
    const { id, pin } = req.query

    const response = await OTPMODEL.findById(id)
    if (!response) {
      return res
        .status(httpStatusCodes.BAD_REQUEST)
        .json({ error: `${pin} not found` })
    }
    if (response.attempts <= 0) {
      return res
        .status(httpStatusCodes.BAD_REQUEST)
        .json({ error: 'No attempts left, Please try again later.' })
    }

    if (response.pin !== pin) {
      console.log(response.pin)
      console.log(pin)

      response.attempts = response.attempts - 1
      await response.save()
      return res
        .status(httpStatusCodes.BAD_REQUEST)
        .json({ error: `Invalid OTP, ${response.attempts} attempts left` })
    }

    return res.status(httpStatusCodes.OK).json(response.id)
  } catch (err) {
    console.error('Error in forgot password:', err)
    res
      .status(httpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Internal server error.' })
  }
}

module.exports.reset_password = async (req, res) => {
  try {
    const { id } = req.query
    const { password, confirmpassword } = req.body
    if (password.toString() != confirmpassword.toString()) {
      return res
        .status(httpStatusCodes.BAD_REQUEST)
        .json({ error: 'Password does not match' })
    }
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const exist = await OTPMODEL.findById(id)
    if (!exist) {
      return res
        .status(httpStatusCodes.BAD_REQUEST)
        .json({ error: 'Invalid Queries.' })
    }

    const response = await USERMODEL.findOneAndUpdate(
      { email: exist.email },
      { password: hash },
    )
    if (!response)
      return res
        .status(httpStatusCodes.BAD_REQUEST)
        .json({ error: 'Failed to update password.' })

    const remove = await OTPMODEL.findByIdAndDelete(id)
    if (!remove)
      return res
        .status(httpStatusCodes.BAD_REQUEST)
        .json({ error: 'Unable to delete PIN' })

    return res.status(httpStatusCodes.OK).json({ msg: 'Password updated..' })
  } catch (err) {
    console.error('Error in forgot password:', err)
    res
      .status(httpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Internal server error.' })
  }
}

module.exports.fetch_otp = async (req, res) => {
  try {
    const { id } = req.query

    const response = await OTPMODEL.findById(id)
    if (!response) {
      return res
        .status(httpStatusCodes.BAD_REQUEST)
        .json({ error: 'OTP Expired' })
    }

    return res.status(httpStatusCodes.OK).json({ msg: 'OTP is still alive.' })
  } catch (err) {
    console.error('Error in forgot password:', err)
    res
      .status(httpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Internal server error.' })
  }
}
