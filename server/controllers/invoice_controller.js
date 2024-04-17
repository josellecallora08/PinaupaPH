const USERMODEL = require('../models/user')
const UNITMODEL = require('../models/unit')
const TENANTMODEL = require('../models/tenant')
const OTPMODEL = require('../models/otp')
const INVOICEMODEL = require('../models/invoice')
const cron = require('node-cron')
const httpStatusCodes = require('../constants/constants')

module.exports.fetchInvoices = async (req, res) => {
  try {
    const response = await INVOICEMODEL.find()
      .populate('user_id')
      .populate('unit_id')
    if (!response) {
      return res
        .status(httpStatusCodes.NOT_FOUND)
        .json({ error: 'Failed fetching the invoices.' })
    }

    return res.status(httpStatusCodes.OK).json({ response })
  } catch (err) {
    return res
      .status(httpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: err.message })
  }
}

module.exports.fetchInvoice = async (req, res) => {
  try {
    const response = await INVOICEMODEL.find()
      .populate('user_id')
      .populate('unit_id')
    if (!response) {
      return res
        .status(httpStatusCodes.NOT_FOUND)
        .json({ error: 'Failed fetching the invoices.' })
    }

    return res.status(httpStatusCodes.OK).json({ response })
  } catch (err) {
    return res
      .status(httpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: err.message })
  }
}

module.exports.editInvoice = async (req, res) => {
  const { invoice_id } = req.query
  const details = {}
  try {
    const response = await INVOICEMODEL.findByIdAndUpdate(invoice_id, {
      details,
    })
    if (!response) {
      return res
        .status(httpStatusCodes.BAD_REQUEST)
        .json({ error: 'Unable to update invoice...' })
    }
  } catch (err) {
    return res
      .status(httpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: err.message })
  }
}

module.exports.createInvoice = async (req, res) => {
  const { user_id, unit_id } = req.query
  const ref_user = user_id.toString().slice(-3)
  const ref_unit = unit_id.toString()
  const current_date = new Date()
  const day = current_date.getDate()
  const month = current_date.getMonth()
  const year = current_date.getFullYear()
  const reference = `INV-${day}${month}${year}${ref_unit}${ref_user}`
  try {
    const isExisting = await INVOICEMODEL.findOne({ reference })
    if (isExisting) {
      return res
        .status(httpStatusCodes.FOUND)
        .json({ error: 'Invoice exists...' })
    }
    const tenant = await TENANTMODEL.findOne({ user_id })
      .populate('user_id')
      .populate('unit_id')

    if(!tenant){
      return res
        .status(httpStatusCodes.FOUND)
        .json({ error: 'Tenant not found...' })
    }
    const response = await INVOICEMODEL.create({
      user_id: user_id,
      unit_id: unit_id,
      reference: reference,
      amount: tenant.unit_id.rent
    })
    if (!response) {
      return res
        .status(httpStatusCodes.FOUND)
        .json({ error: 'Failed to create invoice...' })
    }
    tenant.balance = tenant.balance + tenant.unit_id.rent
    await tenant.save()
    return res.status(httpStatusCodes.OK).json({tenant})
  } catch (err) {
    return res
      .status(httpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: err.message })
  }
}

module.exports.deleteInvoice = async (req, res) => {
  const { invoice_id } = req.query
  try {
    const response = await INVOICEMODEL.findByIdAndDelete(invoice_id)
    if (!response) {
      return res
        .status(httpStatusCodes.NOT_FOUND)
        .json({ error: 'Failed to delete invoice...' })
    }
    
    return res.status(httpStatusCodes.OK).json({response})
  } catch (err) {
    return res
      .status(httpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: err.message })
  }
}
