const USERMODEL = require('../models/user')
const UNITMODEL = require('../models/unit')
const TENANTMODEL = require('../models/tenant')
const OTPMODEL = require('../models/otp')
const INVOICEMODEL = require('../models/invoice')
const httpStatusCodes = require('../constants/constants')

module.exports.fetchInvoices = async (req, res) => {
  try {
    const response = await INVOICEMODEL.find().populate({
      path: 'tenant_id',
      populate: {
        path: 'user_id unit_id', // Populate user_id and unit_id fields in TENANTMODEL
      },
    })

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

module.exports.searchInvoice = async (req, res) => {
  const { filter } = req.query
  try {
    const response = await INVOICEMODEL.aggregate([
      {
        $lookup: {
          from: 'tenants', // Assuming the collection name for tenants is 'tenants'
          localField: 'tenant_id',
          foreignField: '_id',
          as: 'tenant'
        }
      },
      {
        $unwind: '$tenant' // Since $lookup produces an array, unwind to destructure it
      },
      {
        $lookup: {
          from: 'users', // Assuming the collection name for users is 'users'
          localField: 'tenant.user_id',
          foreignField: '_id',
          as: 'tenant.user'
        }
      },
      {
        $lookup: {
          from: 'units', // Assuming the collection name for units is 'units'
          localField: 'tenant.unit_id',
          foreignField: '_id',
          as: 'tenant.unit'
        }
      },
      {
        $match: {
          $or: [
            { 'tenant.user.name': { $regex: filter, $options: 'i' } }, // Match user name
            { 'tenant.unit.unit_no': { $regex: filter, $options: 'i' } } // Match unit number
          ]
        }
      }
    ]);
    if(!response){
      return res.status(httpStatusCodes.NOT_FOUND).json({error: "No data found..."})
    }
    
   return res.status(httpStatusCodes.OK).json({response})
  } catch (err) {
    return res
      .status(httpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: err.message })
  }
}

module.exports.fetchInvoice = async (req, res) => {
  try {
    const response = await INVOICEMODEL.find().populate({
      path: 'tenant_id',
      populate: {
        path: 'user_id unit_id', // Populate user_id and unit_id fields in TENANTMODEL
      },
    })
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
  const { status } = req.body
  try {
    const response = await INVOICEMODEL.findByIdAndUpdate(invoice_id, {
      status,
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
  const { user_id } = req.query

  const current_date = new Date()
  const day = current_date.getDate()
  const month = current_date.getMonth()
  const year = current_date.getFullYear()
  try {
    const tenant = await TENANTMODEL.findOne({ user_id })
      .populate('user_id')
      .populate('unit_id')

    if (!tenant) {
      return res
        .status(httpStatusCodes.FOUND)
        .json({ error: 'Tenant not found...' })
    }

    const ref_user = user_id.toString().slice(-3)
    const ref_unit = tenant.unit_id._id.toString().slice(-5)
    const reference = `INV-${day}${month}${year}-${ref_unit}-2${ref_user}`

    const isExisting = await INVOICEMODEL.findOne({ reference })
    if (isExisting) {
      return res
        .status(httpStatusCodes.FOUND)
        .json({ error: 'Invoice exists...' })
    }
    const response = await INVOICEMODEL.create({
      tenant_id: tenant._id,
      reference: reference,
      amount: tenant.unit_id.rent,
    })
    if (!response) {
      return res
        .status(httpStatusCodes.FOUND)
        .json({ error: 'Failed to create invoice...' })
    }
    tenant.balance = tenant.balance + tenant.unit_id.rent
    console.log(tenant.balance)
    await tenant.save()
    return res.status(httpStatusCodes.OK).json({ tenant })
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

    return res.status(httpStatusCodes.OK).json({ response })
  } catch (err) {
    return res
      .status(httpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: err.message })
  }
}
