const TENANTMODEL = require('../models/tenant')
const USERMODEL = require('../models/user')
const UNITMODEL = require('../models/unit')
const PAYMENTMODEL = require('../models/payment')
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
  const role = req.user.role
  if (role !== 'Admin') {
    return res
      .status(httpStatusCodes.BAD_REQUEST)
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
  } = req.body
  const details = {}
  if (name !== '') details.name = name
  if (username !== '') details.username = username
  if (email !== '') details.email = email
  if (password !== '') {
    const salt = await bcrypt.genSalt(10)
    const hashed = await bcrypt.hash(password, salt)
    if (!hashed)
      return res
        .status(httpStatusCodes.BAD_REQUEST)
        .json({ error: 'Error hashing the password.' })

    details.password = hashed
  }
  if (mobile_no !== '') details.mobile_no = mobile_no
  if (birthday !== '') details.birthday = birthday
  if (occupancy !== '') details.monthly_due = occupancy
  try {
    if (await USERMODEL.findOne({ username }))
      return res
        .status(httpStatusCodes.BAD_REQUEST)
        .json({ error: 'Username already exists' })
    if (await USERMODEL.findOne({ email }))
      return res
        .status(httpStatusCodes.BAD_REQUEST)
        .json({ error: 'Email already exists' })
    if (await USERMODEL.findOne({ mobile_no }))
      return res
        .status(httpStatusCodes.BAD_REQUEST)
        .json({ error: 'Mobile Number already exists.' })

    const unit_status = await UNITMODEL.findById(unit_id)
    if (unit_status.occupied === true)
      return res
        .status(httpStatusCodes.BAD_REQUEST)
        .json({ error: 'Unit is Occupied.' })

    let response = await USERMODEL.create(details)
    console.log(response)
    if (!response) {
      console.log('dito wuahaha')
      return res
        .status(httpStatusCodes.BAD_REQUEST)
        .json({ error: 'Unsuccessful registration. Please try again later.' })
    }

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
        .json({ error: 'Failed to upload profile.' })
    }

    response.profile_image.image_url = imageUpload.secure_url
    response.profile_image.public_id = imageUpload.public_id

    if (response.role === 'Tenant') {
      const tenant = await TENANTMODEL.create({
        user_id: response._id,
        unit_id: unit_id,
        deposit,
      })
      if (!tenant)
        return res.status(httpStatusCodes.BAD_REQUEST).json({
          error: 'Failed to create Tenant Data. Please try again later.',
        })
    }

    await response.save()
    const unit = await UNITMODEL.findByIdAndUpdate(
      { _id: unit_id },
      { occupied: true },
    )
    if (!unit)
      return res.status(httpStatusCodes.BAD_REQUEST).json({
        error: 'Failed to update occupancy status at Unit Collection.',
      })

    // const token = createToken(response._id, response.username, response.role)
    // res.cookie('token', token, { maxAge: 900000 })

    return res
      .status(httpStatusCodes.OK)
      .json({ msg: 'Created Account successfully!', response })
  } catch (err) {
    console.error({ error: err })
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
        .json({ error: 'Invalid Credentials (tewmp - Password)' })

    const token = createToken(response._id, response.username, response.role)

    // res.cookie('token', token, { maxAge: 900000 })
    res.setHeader('Set-Cookie', `token=${token}; Path=/; HttpOnly; Max-Age=900000`);

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

    search = search.map((item) => ({
      _id: item._id,
      // image: item.user[0].profile_image,
      name: item.user.name,
      monthly_due: new Date(item.monthly_due).toDateString(),
      unit_no: item.unit.unit_no,
    }))

    return res.status(httpStatusCodes.FOUND).json(search)
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

    user = user.map((item) => ({
      _id: item.user_id._id,
      image: item.user_id.profile_image.image_url,
      image_id: item.user_id.profile_image.public_id,
      name: item.user_id.name,
      username: item.user_id.username,
      email: item.user_id.email,
      birthday: item.user_id.birthday,
      phone: item.user_id.mobile_no,
      role: item.user_id.role,
      unit_id: item.unit_id._id,
      unit_no: item.unit_id.unit_no,
      rent: item.unit_id.rent,
      deposit: item.deposit,
      advance: item.advance,
      balance: item.balance,
      monthly_due:
        item.monthly_due !== null
          ? new Date(item.monthly_due).toDateString()
          : null,
    }))

    return res.status(httpStatusCodes.OK).json(user)
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

    user = {
      id: user.user_id._id,
      image: user.user_id.profile_image.image_url,
      image_id: user.user_id.profile_image.public_id,
      birthday: user.user_id.birthday,
      name: user.user_id.name,
      username: user.user_id.username,
      email: user.user_id.email,
      phone: user.user_id.mobile_no,
      role: user.user_id.role,
      unit_no: user.unit_id.unit_no,
      rent: user.unit_id.rent,
      deposit: user.deposit,
      advance: user.advance,
      balance: user.balance,
      monthly_due:
        user.monthly_due !== null
          ? new Date(user.monthly_due).toDateString()
          : null,
    }

    return res.status(httpStatusCodes.OK).json(user)
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

    user = {
      id: user.user_id._id,
      image: user.user_id.profile_image.image_url,
      image_id: user.user_id.profile_image.public_id,
      name: user.user_id.name,
      username: user.user_id.username,
      email: user.user_id.email,
      phone: user.user_id.mobile_no,
      role: user.user_id.role,
      unit_no: user.unit_id.unit_no,
      rent: user.unit_id.rent,
      deposit: user.deposit,
      advance: user.advance,
      balance: user.balance,
      monthly_due:
        user.monthly_due !== null
          ? new Date(user.monthly_due).toDateString()
          : null,
    }

    return res.status(httpStatusCodes.OK).json(user)
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
    new_password,
    password,
    mobile_no,
    birthday,
    unit_id,
    deposit,
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

    if (password && new_password) {
      if (bcrypt.compareSync(password, response.password)) {
        const hashed = await bcrypt.hash(new_password, salt)
        if (!hashed)
          return res
            .status(httpStatusCodes.BAD_REQUEST)
            .json({ error: 'Error hashing the password.' })

        response.password = hashed
      }
    }

    await response.save()

    return res
      .status(httpStatusCodes.CREATED)
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
    const { unit_id, deposit } = req.body

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
      return res
        .status(httpStatusCodes.NOT_FOUND)
        .json({ error: 'Current unit not found' })
    }

    // Update the status of the current unit to false
    currentUnit.occupied = false
    await currentUnit.save()

    // Update tenant information with the new unit
    if (unit_id) {
      tenant.unit_id = unit_id
      console.log('15')
    }
    if (deposit) {
      tenant.deposit = deposit
    }
    await tenant.save()

    // Update the status of the new unit to true or occupied
    if (unit_id) {
      const newUnit = await UNITMODEL.findById(unit_id)
      if (!newUnit) {
        return res
          .status(httpStatusCodes.NOT_FOUND)
          .json({ error: 'New unit not found' })
      }
      newUnit.occupied = true // Assuming "true" means occupied
      await newUnit.save()
      console.log('1')
    }

    return res
      .status(httpStatusCodes.OK)
      .json({ message: 'Tenant information updated successfully' })
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
      console.log('aos2idjaosidj')
      return res
        .status(httpStatusCodes.BAD_REQUEST)
        .json({ error: `${pin} not found` })
    }
    if (response.attempts <= 0) {
      console.log('aosidjaosidj')
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
      console.log('aosidjaoisdjs')
      console.log(password)
      console.log(confirmpassword)

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
