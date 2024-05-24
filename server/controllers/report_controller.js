const TENANTMODEL = require('../models/tenant')
const INVOICEMODEL = require('../models/invoice')
const nodemailer = require('nodemailer')
const httpStatusCodes = require('../constants/constants')
const pdf_template = require('../template/invoice')
const pdf = require('html-pdf')
const ejs = require('ejs')
const path = require('path')
const axios = require('axios')
const cloudinary = require('cloudinary').v2

module.exports.report_deliquency_tenants = async (req, res) => {
  try {
    const { from, to } = req.query
    const response = await INVOICEMODEL.find().populate({
      path: 'tenant_id',
      populate: 'user_id unit_id apartment_id',
    })
    if (!response) {
      return res
        .status(httpStatusCodes.BAD_REQUEST)
        .json({ error: 'Failed to provide reports deliquency tenants' })
    }
    const fromDate = new Date(from)
    const toDate = new Date(to)
    const DelayedTenants = response
      .filter((item) =>
        from && to
          ? new Date(item.due) >= fromDate &&
            new Date(item.due) <= toDate &&
            item.isPaid
          : item.isPaid,
      )
      .filter((item) => new Date(item.datePaid) > new Date(item.due))

    // Generate HTML content
    const templatePath = path.join(
      __dirname,
      '../template',
      'delinquency_report_template.ejs',
    )
    const htmlContent = await ejs.renderFile(templatePath, {
      response: DelayedTenants,
      num: DelayedTenants.length,
    })

    // Generate PDF from HTML content
    pdf.create(htmlContent).toBuffer((err, buffer) => {
      if (err) {
        return res
          .status(httpStatusCodes.INTERNAL_SERVER_ERROR)
          .json({ error: 'Failed to generate PDF' })
      }

      // Set the response headers to download the PDF
      res.setHeader('Content-Type', 'application/pdf')
      res.setHeader(
        'Content-Disposition',
        'attachment; filename=delinquency_report.pdf',
      )

      // Send the PDF buffer as the response
      res.send(buffer)
    })
  } catch (err) {
    console.log(err.message)
    return res
      .status(httpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: err.message })
  }
}
module.exports.report_goodpayer_tenants = async (req, res) => {
  try {
    const { from, to } = req.query
    const response = await INVOICEMODEL.find().populate({
      path: 'tenant_id',
      populate: 'user_id unit_id apartment_id',
    })
    if (!response) {
      return res
        .status(httpStatusCodes.BAD_REQUEST)
        .json({ error: 'Failed to provide reports deliquency tenants' })
    }
    const fromDate = new Date(from)
    const toDate = new Date(to)
    const GoodPayerTenants = response
      .filter((item) =>
        from && to
          ? new Date(item.due) >= fromDate &&
            new Date(item.due) <= toDate &&
            item.isPaid
          : item.isPaid,
      )
      .filter((item) => new Date(item.datePaid) <= new Date(item.due))
    return res.status(httpStatusCodes.OK).json({
      msg: 'Generated Report for Good Payer Tenants',
      response: GoodPayerTenants,
      num: GoodPayerTenants.length,
    })
  } catch (err) {
    console.log(err.message)
    return res
      .status(httpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: err.message })
  }
}

module.exports.report_rental_revenue = async (req, res) => {
  try {
    const { from, to } = req.query
    const response = await INVOICEMODEL.find().populate({
      path: 'tenant_id',
      populate: 'user_id unit_id apartment_id',
    })
    if (!response) {
      return res
        .status(httpStatusCodes.BAD_REQUEST)
        .json({ error: 'Failed to provide reports deliquency tenants' })
    }

    const fromDate = new Date(from)
    const toDate = new Date(to)
    const totalRevenue = response
      .filter((item) =>
        from && to
          ? new Date(item.due) >= fromDate &&
            new Date(item.due) <= toDate &&
            item.isPaid
          : item.isPaid,
      )
      .filter((item) => new Date(item.datePaid) <= new Date(item.due))

    const totalAmount = totalRevenue.reduce((acc, curr) => {
      return (acc = acc + curr.payment.amountPaid)
    }, 0)
    return res.status(httpStatusCodes.OK).json({
      msg: 'Generated Report Rental Revenue',
      response: totalRevenue,
      totalAmount,
    })
  } catch (err) {
    console.log(err.message)
    return res
      .status(httpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: err.message })
  }
}
