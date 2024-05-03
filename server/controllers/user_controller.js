const TENANTMODEL = require('../models/tenant')
const USERMODEL = require('../models/user')
const UNITMODEL = require('../models/unit')
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

    const role = req.user.role
    if (role !== 'Admin') {
      return res
        .status(httpStatusCodes.UNAUTHORIZED)
        .json({ error: 'Unauthorized. Only admin can add tenants.' })
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
      apartment_id,
    } = req.body

    // Validation for email and mobile number
    const emailRegex = /^\S+@\S+\.\S+$/
    const mobileRegex = /^[0-9]{10}$/

    if (!email) {
      return res
        .status(httpStatusCodes.BAD_REQUEST)
        .json({ error: 'Invalid email format.' })
    }

    if (!mobile_no) {
      return res
        .status(httpStatusCodes.BAD_REQUEST)
        .json({ error: 'Invalid mobile number format.' })
    }

    // Check if password is provided
    if (!password) {
      return res
        .status(httpStatusCodes.BAD_REQUEST)
        .json({ error: 'Password is required.' })
    }

    const salt = await bcrypt.genSalt(10)
    const hashed = await bcrypt.hash(password, salt)
    if (!hashed) {
      return res
        .status(httpStatusCodes.BAD_REQUEST)
        .json({ error: 'Error hashing the password.' })
    }

    const details = {
      name,
      username,
      email,
      password: hashed,
      mobile_no,
      birthday,
      apartment_id,
    }

    // Check if user already exists
    const existingUser = await USERMODEL.findOne({
      $or: [{ username }, { email }, { mobile_no }],
    })
    if (existingUser) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
        error:
          'User with this username, email, or mobile number already exists.',
      })
    }

    const unit_status = await UNITMODEL.findById(unit_id)
    if (unit_status.occupied === true) {
      return res
        .status(httpStatusCodes.CONFLICT)
        .json({ error: `Unit ${unit_id} is already occupied.` })
    }

    // File Upload
    const imageUpload = await cloudinary.uploader.upload(
      `./template/profile-default.svg`,
      {
        quality: 'auto:low',
        folder: 'PinaupaPH/Profile',
        resource_type: 'auto',
      },
    )

    if (!imageUpload || !imageUpload.secure_url) {
      return res
        .status(httpStatusCodes.BAD_REQUEST)
        .json({ error: 'Failed to upload profile image.' })
    }


    let response = await USERMODEL.create({
      name: name,
      username: username,
      email: email,
      password: hashed,
      mobile_no: mobile_no,
      birthday: birthday,
      'profile_image.image_url': imageUpload.secure_url,
      'profile_image.public_id': imageUpload.public_id
    })

    if (response.role === 'Tenant') {
      const tenant = await TENANTMODEL.create({
        user_id: response._id,
        unit_id,
        apartment_id,
        deposit,
        monthly_due: occupancy,
      })
      if (!tenant) {
        return res
          .status(httpStatusCodes.BAD_REQUEST)
          .json({ error: 'Failed to create Tenant Data.' })
      }

      const unit = await UNITMODEL.findByIdAndUpdate(unit_id, {
        occupied: true,
      })
      if (!unit) {
        return res.status(httpStatusCodes.BAD_REQUEST).json({
          error: 'Failed to update occupancy status at Unit Collection.',
        })
      }
    }
    const userResponse = await TENANTMODEL.findOne({ user_id: response._id }).populate('user_id unit_id apartment_id')
    if (!userResponse) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
        error: 'Failed to fetch user information.',
      })
    }
    return res
      .status(httpStatusCodes.OK)
      .json({ msg: 'Tenant account has been created.', response: userResponse })
  } catch (err) {
    console.error('Error during sign up:', err)
    return res
      .status(httpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: err.message })
  }
}
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

    const token = createToken(response._id, response.username, response.role)
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
          from: 'apartments',
          localField: 'apartment_id',
          foreignField: '_id',
          as: 'apartment'
        }
      },
      {
        $unwind: {
          path: '$apartment',
          preserveNullAndEmptyArrays: true
        }
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
        $project: {
          _id: 1,
          user_id: '$user',
          unit_id: '$unit',
          apartment_id: '$apartment',
          deposit: 1,
          advance: 1,
          balance: 1,
          monthly_due: 1,
          payment: 1,
          household: 1,
          pet: 1,
          createdAt: 1,
          updatedAt: 1
        }
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

    return res.status(httpStatusCodes.OK).json({ response: search })
  } catch (err) {
    console.error({ error: err.message })
    return res
      .status(httpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Server Error...' })
  }
}

// * Tested API
module.exports.fetch_users = async (req, res) => {
  // const role = req.user.role
  // if (role !== 'Admin') {
  //   return res
  //     .status(httpStatusCodes.BAD_REQUEST)
  //     .json({ error: 'Unauthorized. Only admin can add tenants.' })
  // }
  let response = await TENANTMODEL.find()
    .populate('user_id unit_id apartment_id')

  try {
    if (!response) {
      return res
        .status(httpStatusCodes.NOT_FOUND)
        .json({ error: 'User not found' })
    }

    return res.status(httpStatusCodes.OK).json({ response })
  } catch (err) {
    console.error({ error: err.message })
    return res
      .status(httpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Server Error...' })
  }
}

module.exports.fetch_user = async (req, res) => {
  const { user_id } = req.query
  let response = await TENANTMODEL.findOne({ user_id })
    .populate('user_id unit_id apartment_id')

  try {
    if (!response) {
      return res
        .status(httpStatusCodes.NOT_FOUND)
        .json({ error: 'User not found' })
    }

    return res.status(httpStatusCodes.OK).json({ response })
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
      return res.status(httpStatusCodes.OK).json(response)
    }

    let response = await TENANTMODEL.findOne({ user_id: user_id }).populate('user_id unit_id apartment_id')

    if (!response) {
      return res
        .status(httpStatusCodes.NOT_FOUND)
        .json({ error: 'User not found' })
    }

    return res.status(httpStatusCodes.OK).json(response)
  } catch (err) {
    console.error({ error: err.message })
    return res
      .status(httpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Server Error...' })
  }
}

// * Done checking on POSTMAN API
module.exports.update_profile = async (req, res) => {
  const { user_id } = req.query
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
    const tenant = await TENANTMODEL.findById(response._id).populate('user_id unit_id apartment_id')
    return res
      .status(httpStatusCodes.OK)
      .json({ msg: 'Information Updated Successfully!', response: tenant })
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
    const tenant = await TENANTMODEL.findOne({ user_id: user_id }).populate('user_id unit_id apartment_id')
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

    return res.status(httpStatusCodes.OK).json({
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
    const response = await USERMODEL.findByIdAndUpdate(user_id,
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
    const tenant = await TENANTMODEL.findById(response._id).populate('user_id unit_id apartment_id')
    return res
      .status(httpStatusCodes.OK)
      .json({ msg: 'Profile has been changed', response: tenant })
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
    const response = await USERMODEL.findByIdAndDelete(user_id)
    if (!response) {
      return res
        .status(httpStatusCodes.NOT_FOUND)
        .json({ error: 'User not found...' })
    }

    await cloudinary.uploader.destroy(response.profile_image.public_id)
    console.log('deleted successfully!')
    if (response.role === 'Tenant') {
      const tenant = await TENANTMODEL.findOneAndDelete({ user_id: user_id }).populate('user_id unit_id apartment_id')
      if (!tenant)
        return res
          .status(httpStatusCodes.BAD_REQUEST)
          .json({ error: 'Unable to Locate Tenant' })

      if (tenant.unit_id) {
        const unit = await UNITMODEL.findByIdAndUpdate(
          { _id: tenant.unit_id },
          { occupied: false },
        )

        if (!unit)
          return res
            .status(httpStatusCodes.BAD_REQUEST)
            .json({ error: 'Unable to locate Unit' })
      }
    }
    console.log(response)
    return res
      .status(httpStatusCodes.OK)
      .json({ msg: 'Tenant removed.', response: tenant })
  } catch (err) {
    console.error({ error: err.message })
    return res
      .status(httpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: err.message })
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
      .json({ error: err.message })
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
      .json({ error: err.message })
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
      .json({ error: err.message })
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
      .json({ error: err.message })
  }
}
