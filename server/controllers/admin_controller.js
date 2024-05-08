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

module.exports.createAdminAccount = async (req, res) => {
  try {
    const mainRole = req.user.role
    if (mainRole !== 'Superadmin') {
      return res
        .status(httpStatusCodes.UNAUTHORIZED)
        .json({ error: 'Only super admin can create apartment owners' })
    }
    const { name, password, username, email, role } = req.body
    if (name === '')
      return res
        .status(httpStatusCodes.BAD_REQUEST)
        .json({ error: 'Please fill all the blanks' })
    if (password === '') {
    }

    if (username === '' && (await USERMODEL.findOne({ username })))
      return res
        .status(httpStatusCodes.BAD_REQUEST)
        .json({ error: 'Username is either existing or empty.' })
    if (email === '' && (await USERMODEL.findOne({ email })))
      return res
        .status(httpStatusCodes.BAD_REQUEST)
        .json({ error: 'Email is either existing or empty.' })
    if (role === '')
      return res.status(httpStatusCodes.BAD_REQUEST).json({ error: '' })

    const salt = await bcrypt.genSalt(10)
    const hashed = await bcrypt.hash(password, salt)
    if(!hashed){
        return res.status(httpStatusCodes.BAD_REQUEST).json({error: "Failed to  hash password"})
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
        .json({ error: 'Failed to upload profile image.' })
    }

    const response = await USERMODEL.create({
      name,
      username,
      email,
      password: hashed,
      'profile_image.image_url': imageUpload.secure_url,
      'profile_image.public_id': imageUpload.public_id,
    })
    if (!response) {
      return res
        .status(httpStatusCodes.BAD_REQUEST)
        .json({ error: 'Failed to create admin' })
    }

    return res.status(httpStatusCodes.OK).json({ response })
  } catch (err) {
    console.error({ error: err.message })
    return res
      .status(httpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: err.message })
  }
}

module.exports.fetchAdminAccount = async (req, res) => {
  try {
    const { role } = req.user
    if (role !== 'Superadmin') {
      return res
        .status(httpStatusCodes.UNAUTHORIZED)
        .json({ error: 'Only super admin can create apartment owners' })
    }

    const response = await USERMODEL.find({})
    if (!response) {
      return res
        .status(httpStatusCodes.BAD_REQUEST)
        .json({ error: 'Failed to fetch admin' })
    }

    return res.status(httpStatusCodes.OK).json({ response })
  } catch (err) {
    console.error({ error: err.message })
    return res
      .status(httpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: err.message })
  }
}
module.exports.updateAdminAccount = async (req, res) => {
  try {
    const { role } = req.user
    const { user_id } = req.query
    if (role !== 'Superadmin') {
      return res
        .status(httpStatusCodes.UNAUTHORIZED)
        .json({ error: 'Only super admin can create apartment owners' })
    }
    const { name, password, username, email, birthday, mobile_no } = req.body
    if (name === '')
      return res
        .status(httpStatusCodes.BAD_REQUEST)
        .json({ error: 'Please fill all the blanks' })
    if (password !== '') {
      details.password = hashed
    }
    if (username === '' && (await USERMODEL.findOne({ username })))
      return res
        .status(httpStatusCodes.BAD_REQUEST)
        .json({ error: 'Username is either existing or empty.' })
    if (email === '' && (await USERMODEL.findOne({ email })))
      return res
        .status(httpStatusCodes.BAD_REQUEST)
        .json({ error: 'Email is either existing or empty.' })
    if (birthday === '')
      return res
        .status(httpStatusCodes.BAD_REQUEST)
        .json({ error: 'Failed to upload profile image.' })
    if (mobile_no === '' && (await USERMODEL.findOne({ mobile_no })))
      return res
        .status(httpStatusCodes.BAD_REQUEST)
        .json({ error: 'Mobile Number is either existing or empty.' })

    const response = await USERMODEL.findByIdAndUpdate(user_id, {
      name,
      username,
      email,
      password: hashed,
      birthday,
      mobile_no,
    })
    if (!response) {
      return res
        .status(httpStatusCodes.BAD_REQUEST)
        .json({ error: 'Failed to create admin' })
    }

    return res.status(httpStatusCodes.OK).json({ response })
  } catch (err) {
    console.error({ error: err.message })
    return res
      .status(httpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: err.message })
  }
}
module.exports.deleteAdminAccount = async (req, res) => {
  try {
    const { role } = req.user
    const { user_id } = req.query
    if (role !== 'Superadmin') {
      return res
        .status(httpStatusCodes.UNAUTHORIZED)
        .json({ error: 'Only super admin can create apartment owners' })
    }

    const response = await USERMODEL.findByIdAndDelete(user_id)
    if (!response) {
      return res
        .status(httpStatusCodes.BAD_REQUEST)
        .json({ error: 'Failed to create admin' })
    }

    return res.status(httpStatusCodes.OK).json({ response })
  } catch (err) {
    console.error({ error: err.message })
    return res
      .status(httpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: err.message })
  }
}
