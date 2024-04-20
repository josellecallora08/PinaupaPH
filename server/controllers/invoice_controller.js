const USERMODEL = require('../models/user')
const UNITMODEL = require('../models/unit')
const TENANTMODEL = require('../models/tenant')
const OTPMODEL = require('../models/otp')
const INVOICEMODEL = require('../models/invoice')
const httpStatusCodes = require('../constants/constants')
const pdf_template = require('../template/invoice')
const path = require('path')
const pdf = require('html-pdf')
const fs = require('fs').promises
const cloudinary = require('cloudinary').v2 // Import Cloudinary SDK
module.exports.generateInvoice = async (req, res) => {
  const { invoice_id } = req.query;
  try {
    // Fetch the invoice details from the database
    const invoice = await INVOICEMODEL.findById(invoice_id);
    if (!invoice) {
      return res.status(httpStatusCodes.NOT_FOUND).json({ error: 'Invoice not found' });
    }

    // Retrieve the public ID of the invoice PDF from the invoice details
    const { cloudinary_public_id } = invoice;

    // Fetch the file from Cloudinary
    const cloudinaryUrl = cloudinary.url(cloudinary_public_id, { resource_type: 'raw' });

    // Set response headers for file download
    res.setHeader('Content-Disposition', `attachment; filename="invoice.pdf"`);
    res.setHeader('Content-Type', 'application/pdf');

    // Redirect the client to the Cloudinary URL for download
    return res.redirect(cloudinaryUrl);
  } catch (err) {
    console.error({ error: err.message });
    return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Server Error' });
  }
};


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
    const ref_unit = tenant.unit_id.unit_no
    const reference = `INV-${day}${month}${year}-${ref_unit}-${ref_user}`

    const existingInvoice = await cloudinary.search
      .expression(`public_id:${reference}`)
      .execute()

    if (existingInvoice.total_count > 0) {
      return res
        .status(httpStatusCodes.FOUND)
        .json({ error: 'Invoice already exists in Cloudinary.' })
    }

    const isExisting = await INVOICEMODEL.findOne({ reference })
    if (isExisting) {
      return res
        .status(httpStatusCodes.FOUND)
        .json({ error: 'Invoice exists...' })
    }

    const details = {
      name: tenant?.user_id.name,
      unit_no: tenant?.unit_id.unit_no,
      balance: tenant?.user_id.balance,
      due: tenant?.user_id.monthly_due,
      createdAt: tenant?.createdAt,
    }

    // Generate PDF in memory
    const pdfBuffer = await new Promise((resolve, reject) => {
      pdf.create(pdf_template(details), {}).toBuffer((err, buffer) => {
        if (err) reject(err)
        else resolve(buffer)
      })
    })

    // Upload PDF to Cloudinary
    const cloudinaryResponse = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            resource_type: 'raw',
            format: 'pdf', // Specify resource type as 'raw' for PDF
            public_id: reference, // Public ID in Cloudinary
            folder: 'PinaupaPH/Invoices', // Folder in Cloudinary where PDF will be stored
            overwrite: false, // Do not overwrite if file with the same name exists
          },
          (error, result) => {
            if (error) reject(error)
            else resolve(result)
          },
        )
        .end(pdfBuffer)
    })

    if (!cloudinaryResponse || !cloudinaryResponse.public_id) {
      return res
        .status(httpStatusCodes.CONFLICT)
        .json({ error: 'Failed to upload PDF to Cloudinary...' })
    }

    console.log(cloudinaryResponse.public_id)
    const response = await INVOICEMODEL.create({
      tenant_id: tenant._id,
      reference: reference,
      amount: tenant.unit_id.rent,
      cloudinary_public_id: cloudinaryResponse.public_id, // Save public ID from Cloudinary
    })

    if (!response) {
      return res
        .status(httpStatusCodes.FOUND)
        .json({ error: 'Failed to create invoice...' })
    }

    // Update tenant's balance
    tenant.balance += tenant.unit_id.rent
    await tenant.save()

    return res.status(httpStatusCodes.CREATED).json({
      message: 'Created Invoice and Successfully saved to Database',
    })
  } catch (err) {
    return res
      .status(httpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: err.message })
  }
}

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
          as: 'tenant',
        },
      },
      {
        $unwind: '$tenant', // Since $lookup produces an array, unwind to destructure it
      },
      {
        $lookup: {
          from: 'users', // Assuming the collection name for users is 'users'
          localField: 'tenant.user_id',
          foreignField: '_id',
          as: 'tenant.user',
        },
      },
      {
        $lookup: {
          from: 'units', // Assuming the collection name for units is 'units'
          localField: 'tenant.unit_id',
          foreignField: '_id',
          as: 'tenant.unit',
        },
      },
      {
        $match: {
          $or: [
            { 'tenant.user.name': { $regex: filter, $options: 'i' } }, // Match user name
            { 'tenant.unit.unit_no': { $regex: filter, $options: 'i' } }, // Match unit number
          ],
        },
      },
    ])
    if (!response) {
      return res
        .status(httpStatusCodes.NOT_FOUND)
        .json({ error: 'No data found...' })
    }

    return res.status(httpStatusCodes.OK).json({ response })
  } catch (err) {
    return res
      .status(httpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: err.message })
  }
}

module.exports.fetchInvoice = async (req, res) => {
  const { invoice_id } = req.query
  try {
    const response = await INVOICEMODEL.findById(invoice_id).populate({
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
    console.log(response)
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
