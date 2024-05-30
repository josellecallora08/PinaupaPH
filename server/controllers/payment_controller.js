const USERMODEL = require('../models/user')
const TENANTMODEL = require('../models/tenant')
const INVOICEMODEL = require('../models/invoice')
const httpStatusCodes = require('../constants/constants')
const NOTIFMODEL = require('../models/notification')
const pdf = require('html-pdf')
const cloudinary = require('cloudinary').v2
const pdf_template = require('../template/invoice')
const nodemailer = require('nodemailer')
const axios = require('axios')
module.exports.madePayment = async (req, res) => {
  const { invoice_id, status } = req.query

  try {
    let invoiceUpdate = { status }
    if (status === 'succeeded') {
      invoiceUpdate = { ...invoiceUpdate, isPaid: true, datePaid: Date.now() }
    }

    let response = await INVOICEMODEL.findByIdAndUpdate(
      invoice_id,
      invoiceUpdate, { new: true }
    ).populate({
      path: 'tenant_id',
      populate: 'user_id unit_id apartment_id',
    })

    if (!response) {
      return res
        .status(httpStatusCodes.BAD_REQUEST)
        .json({ error: 'Unable to update invoice...' })
    }

    const pdfBuffer = await new Promise((resolve, reject) => {
      pdf
        .create(pdf_template({ response }), {
          childProcessOptions: { env: { OPENSSL_CONF: '/dev/null' } },
        })
        .toBuffer((err, buffer) => {
          if (err) reject(err)
          else resolve(buffer)
        })
    })

    const cloudinaryResponse = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            public_id: response.pdf.public_id,
            resource_type: 'raw',
            format: 'pdf',
            // folder: 'PinaupaPH/Invoices',
            overwrite: true,
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

    if (status === 'succeeded') {
      const tenant = await TENANTMODEL.findByIdAndUpdate(
        response.tenant_id._id,
        { $inc: { balance: -response.payment.amountPaid } }, // Atomic decrement
        { new: true },
      )

      if (!tenant) {
        return res
          .status(httpStatusCodes.BAD_REQUEST)
          .json({ error: 'Unable to update tenant balance...' })
      }

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.GOOGLE_EMAIL,
          pass: process.env.GOOGLE_PASSWORD,
        },
      })

      const downloadPdfFromCloudinary = async () => {
        const response = await axios.get(cloudinaryResponse.secure_url, {
          responseType: 'stream',
        })
        return response.data
      }

      const mailOptions = {
        from: 'pinaupaph@gmail.com',
        to: response.tenant_id.user_id.email,
        subject: `Invoice for ${response.tenant_id.unit_id.unit_no}!`,
        html: `
          <html>
          <body>
            <p>Hi, ${response.tenant_id.user_id.name},</p>
            <p>Thank you for paying your rent.</p>
            <p>This is to inform you that an invoice has been sent your way for your <strong>Unit ${response.tenant_id.unit_id.unit_no}</strong>.</p>
            <p>Here's what you need to know:</p>
            <ul>
              <li>Invoice Number: <strong>${response.pdf.reference}</strong></li>
              <li>Invoice Date: <strong>${new Date(response.createdAt).toDateString()}</strong></li>
              <li>Due Date: <strong>${new Date(response.tenant_id.monthly_due).toDateString()}</strong></li>
              <li>Total Amount: <strong>${response.payment.amountPaid.toLocaleString('en-PH', { style: 'currency', currency: 'PHP' })}</strong></li>
              <li>Previous Balance: <strong>${(response.tenant_id.balance - response.payment.amountPaid).toLocaleString('en-PH', { style: 'currency', currency: 'PHP' })}</strong></li>
            </ul>
            <p>Attached to this email, you will find the invoice file for your reference and records.</p>
            <p>If you have any questions or concerns regarding this invoice, please feel free to reach out to me.</p>
            <p>Thank you for your prompt attention to this matter.</p>
            <p>Best regards,</p>
            <strong>Wendell C. Ibias</strong>
            <strong>Apartment Owner</strong>
            <strong>09993541054</strong>
          </body>
          </html>`,
        attachments: [
          {
            filename: 'invoice.pdf',
            content: await downloadPdfFromCloudinary(),
          },
        ],
      }

      const adminMailOptions = {
        from: 'pinaupaph@gmail.com',
        to: 'pinaupaph@gmail.com',
        subject: `Payment received for Unit ${response.tenant_id.unit_id.unit_no}`,
        html: `
          <html>
          <body>
            <p>Hi Admin,</p>
            <p>The tenant for Unit ${response.tenant_id.unit_id.unit_no} has successfully made a payment.</p>
            <p>Here's what you need to know:</p>
            <ul>
              <li>Tenant Name: <strong>${response.tenant_id.user_id.name}</strong></li>
              <li>Invoice Number: <strong>${response.pdf.reference}</strong></li>
              <li>Invoice Date: <strong>${new Date(response.createdAt).toDateString()}</strong></li>
              <li>Due Date: <strong>${new Date(response.tenant_id.monthly_due).toDateString()}</strong></li>
              <li>Total Amount: <strong>${response.payment.amountPaid.toLocaleString('en-PH', { style: 'currency', currency: 'PHP' })}</strong></li>
              <li>Previous Balance: <strong>${(response.tenant_id.balance - response.payment.amountPaid).toLocaleString('en-PH', { style: 'currency', currency: 'PHP' })}</strong></li>
            </ul>
            <p>The invoice file is attached for your reference and records.</p>
            <p>Best regards,</p>
            <strong>Pinaupa PH</strong>
          </body>
          </html>`,
        attachments: [
          {
            filename: 'invoice.pdf',
            content: await downloadPdfFromCloudinary(),
          },
        ],
      }

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          // console.log('Error:', error)
        } else {
          // console.log('Email sent:', info.response)
        }
      })

      transporter.sendMail(adminMailOptions, (error, info) => {
        if (error) {
          // console.log('Error:', error)
        } else {
          // console.log('Email sent to admin:', info.response)
        }
      })

      const admin = await USERMODEL.findOne({ role: 'Admin' })
      if (!admin) {
        return res
          .status(httpStatusCodes.BAD_REQUEST)
          .json({ error: 'Invoice cannot be updated.' })
      }

      if (status === 'succeeded') {
        const sendNotif = await NOTIFMODEL.create({
          sender_id: response.tenant_id.user_id._id,
          receiver_id: admin._id,
          title: 'Rental Fee',
          description: 'Rental Payment has been paid.',
          type: 'Payment',
        })

        if (!sendNotif) {
          return res
            .status(httpStatusCodes.BAD_REQUEST)
            .json({ error: 'Cannot send Notification' })
        }
      }
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

module.exports.createPayment = async (req, res) => {
  try {
    const { method, method_id, invoice_id } = req.query
    const response = await INVOICEMODEL.findByIdAndUpdate(
      invoice_id,
      {
        $set: {
          'payment.method_id': method_id,
          'payment.method': method,
        },
      },
      { new: true }, // This option returns the updated document
    )

    if (!response) {
      return res
        .status(httpStatusCodes.BAD_REQUEST)
        .json({ error: 'Invoice cannot be updated.' })
    }

    return res
      .status(httpStatusCodes.OK)
      .json({ msg: 'Payment Method and ID are saved.', response })
  } catch (err) {
    return res
      .status(httpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: err.message })
  }
}

module.exports.createIntent = async (req, res) => {
  try {
    const { invoice_id } = req.query;
    const { amount } = req.body;
    const invoice = await INVOICEMODEL.findById(invoice_id);

    if (!invoice) {
      return res
        .status(httpStatusCodes.NOT_FOUND)
        .json({ error: 'Invoice not found.' });
    }

    const response = await fetch(`${process.env.PAYMONGO_CREATE_INTENT}`, {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        authorization: `Basic ${Buffer.from(process.env.PAYMONGO_SECRET_KEY).toString('base64')}`,
      },
      body: JSON.stringify({
        data: {
          attributes: {
            amount: amount * 100,
            payment_method_allowed: ['paymaya', 'gcash', 'grab_pay'],
            payment_method_options: { card: { request_three_d_secure: 'any' } },
            currency: 'PHP',
            capture_type: 'automatic',
            statement_descriptor: 'Rental Fee',
            description: 'Monthly Rent',
          },
        },
      }),
    });

    if (!response.ok) {
      return res
        .status(httpStatusCodes.NOT_FOUND)
        .json({ error: 'Failed to create payment intent.' });
    }

    const json = await response.json();
    const user = await INVOICEMODEL.findById(invoice_id).populate({
      path: 'tenant_id',
      populate: 'user_id unit_id apartment_id',
    });

    const newAmountPaid = (invoice.payment.amountPaid || 0) + amount;

    let responseInvoice = await INVOICEMODEL.findByIdAndUpdate(
      invoice_id,
      {
        'intent.clientKey': json.data.attributes.client_key,
        'intent.paymentIntent': json.data.id,
        'payment.amountPaid': newAmountPaid,
        'payment.unpaidBalance': user.tenant_id.balance - newAmountPaid,
      },
      { new: true }
    ).populate({
      path: 'tenant_id',
      populate: 'user_id unit_id apartment_id',
    });

    if (!responseInvoice) {
      return res
        .status(httpStatusCodes.BAD_REQUEST)
        .json({ error: 'Invoice cannot be updated.' });
    }

    return res
      .status(httpStatusCodes.OK)
      .json({ msg: 'Created intent...', response: responseInvoice });
  } catch (err) {
    return res
      .status(httpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: err.message });
  }
};
