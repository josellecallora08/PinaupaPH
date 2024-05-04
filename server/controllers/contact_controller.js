const nodemailer = require('nodemailer')
const httpStatusCodes = require('../constants/constants')
const USERMODEL = require('../models/user')
const TENANTMODEL = require('../models/tenant')

module.exports.sendMail = async (req, res) => {
  try {
    const { name, email, message } = req.body
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GOOGLE_EMAIL,
        pass: process.env.GOOGLE_PASSWORD,
      },
    })

    await transporter.sendMail({
      from: email,
      to: process.env.GOOGLE_EMAIL,
      subject: `Contact Us - ${name} - Concern`,
      text: message
    })
    
    return res
      .status(httpStatusCodes.OK)
      .json({ msg: `Concern has been sent...` })
  } catch (err) {
    console.error('Error in forgot password:', err)
    res
      .status(httpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: err.message })
  }
}
