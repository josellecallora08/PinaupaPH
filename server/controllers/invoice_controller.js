const USERMODEL = require('../models/user')
const UNITMODEL = require('../models/unit')
const TENANTMODEL = require('../models/tenant')
const OTPMODEL = require('../models/otp')
const INVOICEMODEL = require('../models/invoice')
const cron = require('node-cron')
const httpStatusCodes = require('../constants/constants')


module.exports.fetchInvoice = async (req, res) => {
  try {
    const response = await INVOICEMODEL.find().populate('user_id').populate('unit_id')
    if (!response) {
      return res.status(httpStatusCodes.NOT_FOUND).json({ error: "Failed fetching the invoices." })
    }

    return res.status(httpStatusCodes.OK).json({ response })
  } catch (err) {
    return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message })
  }
}

module.exports.editInvoice = async (req, res) => {
  const { invoice_id } = req.query
  try {

  } catch (err) {
    return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message })
  }
}

module.exports.manualInvoice = async (req, res) => {
  const { user_id } = req.params
  try {

  } catch (err) {
    return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message })
  }
}

module.exports.deleteInvoice = async (req, res) => {
  const { invoice_id } = req.query
  try {

  } catch (err) {
    return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message })
  }
}