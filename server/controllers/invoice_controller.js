const TENANTMODEL = require('../models/tenant')
const INVOICEMODEL = require('../models/invoice')
const httpStatusCodes = require('../constants/constants')
const pdf_template = require('../template/invoice')
const pdf = require('html-pdf')
const fs = require('fs').promises
const cloudinary = require('cloudinary').v2 // Import Cloudinary SDK
module.exports.generateInvoice = async (req, res) => {
  const { invoice_id } = req.query
  try {
    const invoice = await INVOICEMODEL.findById(invoice_id)
    if (!invoice) {
      return res
        .status(httpStatusCodes.NOT_FOUND)
        .json({ error: 'Invoice not found' })
    }

    // Retrieve the public ID of the invoice PDF from the invoice details
    const { public_id } = invoice.pdf
    console.log(public_id)

    // Fetch the file from Cloudinary
    const cloudinaryUrl = cloudinary.url(public_id, {
      resource_type: 'raw',
    })
    console.log(cloudinaryUrl)
    // Fetch the PDF content from Cloudinary
    const response = await fetch(cloudinaryUrl)
    if (!response.ok) {
      return res
        .status(httpStatusCodes.NOT_FOUND)
        .json({ error: 'Failed to fetch PDF from Cloudinary' })
    }

    // Set response headers for file download
    res.setHeader('Content-Disposition', `attachment; filename="invoice.pdf"`)
    res.setHeader('Content-Type', 'application/pdf')

    // Convert the response body to an ArrayBuffer
    const arrayBuffer = await response.arrayBuffer()

    // Convert the ArrayBuffer to a Buffer
    const pdfBuffer = Buffer.from(arrayBuffer)

    // Send the PDF buffer in the response
    res.send(pdfBuffer)
  } catch (err) {
    console.error({ error: err.message })
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
      .populate('user_id unit_id apartment_id')

    if (!tenant) {
      return res
        .status(httpStatusCodes.FOUND)
        .json({ error: 'Tenant not found...' })
    }

    const ref_user = user_id.toString().slice(-3)
    const ref_unit = tenant.unit_id.unit_no
    const reference = `INV${day}${month}${year}${ref_unit}${ref_user}`

    const existingInvoice = await cloudinary.search
      .expression(`public_id:${reference}`)
      .execute()

    if (existingInvoice.total_count > 0) {
      return res
        .status(httpStatusCodes.FOUND)
        .json({ error: 'Invoice already exists in Cloudinary.' })
    }

    const isExisting = await INVOICEMODEL.findOne({
      'pdf.reference': reference,
    })
    if (isExisting) {
      return res
        .status(httpStatusCodes.FOUND)
        .json({ error: 'Invoice exists...' })
    }

    const details = {
      pdf: {
        reference: reference,
      },
      status: false,
      tenant_id: {
        user_id: {
          username: tenant?.user_id.username,
          name: tenant?.user_id.name,
          email: tenant?.user_id.email,
          mobile_no: tenant?.user_id.mobile_no
        },
        unit_id: {
          unit_no: tenant?.unit_id.unit_no,
          rent: tenant?.unit_id.rent
        },
        apartment_id: {
          name: tenant?.apartment_id.name,
          address: tenant?.apartment_id.address,
          barangay: tenant?.apartment_id.barangay,
          province: tenant?.apartment_id.province,
          image: {
            apartment_image_url: tenant?.apartment_id.image.apartment_image_url,
            apartment_public_id: tenant?.apartment_id.image.apartment_public_id
          }
        },
        balance: tenant?.balance,
        monthly_due: tenant?.monthly_due
      },
      createdAt: Date.now()
    }

    // Generate PDF in memory
    const pdfBuffer = await new Promise((resolve, reject) => {
      pdf.create(pdf_template({ response: details }), {
        childProcessOptions: {
          env: {
            OPENSSL_CONF: '/dev/null'
          }
        }
      }).toBuffer((err, buffer) => {
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
            folder: 'PinaupaPH/Invoices', // Folder in Cloudinary where PDF will be stored
            overwrite: true, // Do not overwrite if file with the same name exists
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
    console.log(cloudinaryResponse)
    console.log(cloudinaryResponse.public_id)

    const intent = await fetch(`${process.env.PAYMONGO_CREATE_INTENT}`, {
      method: "POST",
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        authorization: `Basic ${Buffer.from(process.env.PAYMONGO_SECRET_KEY).toString('base64')}`,
      },
      body: JSON.stringify({
        data: {
          attributes: {
            amount: tenant.unit_id.rent,
            payment_method_allowed: [
              'paymaya',
              'gcash',
              'grab_pay',
            ],
            payment_method_options: { card: { request_three_d_secure: 'any' } },
            currency: 'PHP',
            capture_type: 'automatic',
            statement_descriptor: 'Rental Fee',
            description: 'Monthly Rent',
          },
        },
      })
    })
    if (!intent) {
      return res
        .status(httpStatusCodes.NOT_FOUND)
        .json({ error: 'Failed to create payment intent.' })
    }
    const json = await intent.json()
    const response = await INVOICEMODEL.create({
      tenant_id: tenant._id,
      'pdf.public_id': cloudinaryResponse.public_id,
      'pdf.pdf_url': cloudinaryResponse.secure_url,
      'pdf.reference': reference,
      'intent.clientKey': json.data.attributes.client_key,
      'intent.paymentIntent': json.data.id,
      amount: tenant.unit_id.rent,
    })

    if (!response) {
      return res
        .status(httpStatusCodes.NOT_FOUND)
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
          from: 'tenants',
          localField: 'tenant_id',
          foreignField: '_id',
          as: 'tenant',
        },
      },
      {
        $unwind: '$tenant',
      },
      {
        $lookup: {
          from: 'users',
          localField: 'tenant.user_id',
          foreignField: '_id',
          as: 'user',
        },
      },
      {
        $unwind: '$user',
      },
      {
        $lookup: {
          from: 'units',
          localField: 'tenant.unit_id',
          foreignField: '_id',
          as: 'unit',
        },
      },
      {
        $unwind: '$unit',
      },
      {
        $match: {
          $or: [
            { 'user.name': { $regex: filter, $options: 'i' } },
            { 'unit.unit_no': { $regex: filter, $options: 'i' } },
          ],
        },
      },
      {
        $project: {
          tenant_id: {
            user_id: '$user',
            unit_id: '$unit',
            deposit: '$tenant.deposit',
            advance: '$tenant.advance',
            balance: '$tenant.balance',
            monthly_due: '$tenant.monthly_due',
            payment: '$tenant.payment',
            household: '$tenant.household',
            pet: '$tenant.pet',
            createdAt: '$tenant.createdAt',
            updatedAt: '$tenant.updatedAt',
          },
          amount: 1,
          pdf: 1,
          status: 1,
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
        path: 'user_id unit_id apartment_id', 
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
  const { invoice_id, status } = req.query
  try {
    const response = await INVOICEMODEL.findByIdAndUpdate(invoice_id, {
      status,
    }).populate({
      path: 'tenant_id',
      populate: {
        path: 'user_id unit_id apartment_id'
      }
    })
    if (!response) {
      return res
        .status(httpStatusCodes.BAD_REQUEST)
        .json({ error: 'Unable to update invoice...' })
    }

    const pdfBuffer = await new Promise((resolve, reject) => {
      pdf.create(pdf_template(response), {
        childProcessOptions: {
          env: {
            OPENSSL_CONF: '/dev/null'
          }
        }
      }).toBuffer((err, buffer) => {
        if (err) reject(err)
        else resolve(buffer)
      })
    })
    console.log(response.pdf.public_id)
    const cloudinaryResponse = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            public_id: response.pdf.public_id,
            resource_type: 'raw',
            format: 'pdf', // Specify resource type as 'raw' for PDF
            // folder: 'PinaupaPH/Invoices', // Folder in Cloudinary where PDF will be stored
            overwrite: true, // Do not overwrite if file with the same name exists
          },
          (error, result) => {
            if (error) reject(error)
            else resolve(result)
          },
        )
        .end(pdfBuffer)
    })
    console.log(cloudinaryResponse)
    console.log(cloudinaryResponse.public_id)
    if (!cloudinaryResponse || !cloudinaryResponse.public_id) {
      return res
        .status(httpStatusCodes.CONFLICT)
        .json({ error: 'Failed to upload PDF to Cloudinary...' })
    }

    return res
      .status(httpStatusCodes.OK)
      .json({ msg: 'Invoice has been updated.', response })
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

    const tenant = await TENANTMODEL.findById(response.tenant_id)
    if (!tenant) {
      return res
        .status(httpStatusCodes.NOT_FOUND)
        .json({ error: 'Failed to delete invoice...' })
    }

    tenant.balance -= response.amount

    await tenant.save()
    const pdfPublicId = response.pdf.public_id

    await cloudinary.uploader
      .destroy(`${pdfPublicId}`, { resource_type: 'raw' })
      .then((result) => console.log(result))
    return res
      .status(httpStatusCodes.OK)
      .json({ msg: 'Invoice has been deleted.', response })
  } catch (err) {
    return res
      .status(httpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: err.message })
  }
}


module.exports.totalPaid = async(req,res) => {
  try {
    const response = await INVOICEMODEL.find().populate('user_id unit_id apartment_id')
    const totalPayment = response.reduce((acc,sum) => {
      return acc = acc + sum.amount
    }, 0)
    console.log(totalPayment)

    return res
    .status(httpStatusCodes.OK)
    .json({ totalPayment })
  } catch (err) {
    return res
    .status(httpStatusCodes.INTERNAL_SERVER_ERROR)
    .json({ error: err.message })
  }
}

module.exports.deliquencyRate = async(req,res) => {
  try {
    const response = await INVOICEMODEL.find().populate('user_id unit_id apartment_id')
    const totalDeliquency = response.reduce((acc,sum) => {
      return acc = acc + sum.amount
    }, 0)
    console.log(totalDeliquency)
  } catch (err) {
    return res
    .status(httpStatusCodes.INTERNAL_SERVER_ERROR)
    .json({ error: err.message })
  }
}

module.exports.renewalRate = async(req,res) => {
  try {
    const response = await INVOICEMODEL.find().populate('user_id unit_id apartment_id')
    const totalPayment = response.reduce((acc,sum) => {
      return acc = acc + sum.amount
    }, 0)
    console.log(totalPaid)
  } catch (err) {
    return res
    .status(httpStatusCodes.INTERNAL_SERVER_ERROR)
    .json({ error: err.message })
  }
}

module.exports.occupancyRate = async(req,res) => {
  try {
    const response = await INVOICEMODEL.find().populate('user_id unit_id apartment_id')
    const totalPayment = response.reduce((acc,sum) => {
      return acc = acc + sum.amount
    }, 0)
    console.log(totalPaid)
  } catch (err) {
    return res
    .status(httpStatusCodes.INTERNAL_SERVER_ERROR)
    .json({ error: err.message })
  }
}