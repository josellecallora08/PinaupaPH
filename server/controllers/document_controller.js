const httpStatusCodes = require('../constants/constants')
const TENANTMODEL = require('../models/tenant')
const USERMODEL = require('../models/user')
const CONTRACTMODEL = require('../models/contract')
const UNITMODEL = require('../models/unit')
const path = require('path')
const pdf = require('html-pdf')
const fs = require('fs').promises
const cloudinary = require('cloudinary').v2;
const pdf_template = require('../template/contract')

module.exports.fetchContracts = async (req, res) => {
  try {
    const response = await CONTRACTMODEL.find({}).populate({
      path: 'tenant_id',
      populate: {
        path: 'user_id unit_id'
      }
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

module.exports.fetchContract = async (req, res) => {
  const { tenant_id } = req.query
  try {
    const response = await CONTRACTMODEL.findOne({ tenant_id }).populate({
      path: 'tenant_id',
      populate: {
        path: 'user_id unit_id'
      }
    })

    if (!response) {
      return res
        .status(httpStatusCodes.NOT_FOUND)
        .json({ error: `Failed to fetch invoice of ${response.tenant_id.user_id.name}.` })
    }

    return res.status(httpStatusCodes.OK).json({ response })
  } catch (err) {
    return res
      .status(httpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: err.message })
  }
}


module.exports.searchContract = async (req, res) => {
  try {
    const { filter } = req.query
    const response = await CONTRACTMODEL.find({
      $or: [
        { 'tenant_id.user_id.name': { $regex: filter, $options: 'i' } }, // Search by name
        { 'tenant_id.unit_id.unit_no': { $regex: filter, $options: 'i' } }, // Search by unit number
      ],
    }).populate({
      path: 'tenant_id',
      populate: {
        path: 'user_id unit_id'
      }
    })

    if (!response) {
      return res
        .status(httpStatusCodes.NOT_FOUND)
        .json({ error: 'No Data Found...' })
    }

    return res.status(httpStatusCodes.OK).json({ response })
  } catch (err) {
    return res
      .status(httpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: err.message })
  }
}

module.exports.createContract = async (req, res) => {
  const { user_id } = req.query
  const { from_date, to_date } = req.body
  const current_date = new Date()
  const day = current_date.getDate()
  const month = current_date.getMonth()
  const year = current_date.getFullYear()

  try {
    const response = await TENANTMODEL.findOne({ user_id }).populate('user_id').populate('unit_id')

    if (!response) {
      return res
        .status(httpStatusCodes.NOT_FOUND)
        .json({ error: 'Tenant Not found' })
    }
    const file = `Lease_Agreement_${response.unit_id.unit_no}-${response.user_id.name}-${month}${day}${year}`
    const filePath = path.join(
      __dirname,
      '../documents/contracts',
      `${file}.pdf`,
    )

    const details = {
      name: response?.user_id.name,
      deposit: response?.deposit,
      advance: response?.advance,
      unit_no: response?.unit_id.unit_no,
      rent: response?.unit_id.rent,
      from_date: from_date,
      to_date: to_date,
    }
    const pdfBuffer = await new Promise((resolve, reject) => {
      pdf.create(pdf_template(details), {}).toFile(filePath, (err, result) => {
        if (err) reject(err)
        else resolve(result)
      })
    })

    const cloudinaryResponse = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            resource_type: 'raw', // Specify resource type as 'raw' for PDF
            folder: 'PinaupaPH/Contracts', // Folder in Cloudinary where PDF will be stored
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

    const contractResponse = await CONTRACTMODEL.create({
      tenant_id: response?._id,
      unit_id: response?.unit_id._id,
      advance: response?.advance,
      from_date,
      to_date,
    })
    if (!contractResponse)
      return res
        .status(httpStatusCodes.NOT_FOUND)
        .json({ error: 'Contract Not found' })

    return res.status(httpStatusCodes.CREATED).json({
      msg: 'Successfully Created Contract!',
    })
  } catch (err) {
    console.error({ error: err.message })
    return res
      .status(httpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: err.message })
  }
}

// Generate of PDF is still on the progress
module.exports.generatePdf = async (req, res) => {
  try {
    const { user_id, unit_id } = req.params

    const user_response = await USERMODEL.findById(user_id)
    if (!user_response)
      return res
        .status(httpStatusCodes.NOT_FOUND)
        .json({ error: 'User Not found' })

    const unit_response = await UNITMODEL.findById(unit_id)
    if (!unit_response)
      return res
        .status(httpStatusCodes.NOT_FOUND)
        .json({ error: 'Unit Not found' })

    const filePath = path.join(
      __dirname,
      '../documents/contracts',
      `Lease_Agreement_${unit_response.unit_no}-${user_response.name}.pdf`,
    )

    res.setHeader(
      'Content-Disposition',
      `attachment; filename="Lease_Agreement_${unit_response.unit_no}-${user_response.name}.pdf"`,
    )
    res.setHeader('Content-Type', 'application/pdf')

    res.sendFile(filePath, (err) => {
      if (err) {
        console.error(err)
        res.status(500).send('Error sending PDF')
      }
    })
  } catch (err) {
    console.error({ error: err.message })
    return res
      .status(httpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Server Error' })
  }
}
module.exports.editContract = async (req, res) => {
  const { contract_id } = req.query
  const { witness, witness2 } = req.body
  const details = {}

  if (!advance == '') {
    details.advance = advance
  }
  if (!witness == '') {
    details.from_date = witness
  }
  if (!witness2 == '') {
    details.to_date = witness2
  }

  try {
    const response = await CONTRACTMODEL.findByIdAndUpdate(
      { _id: contract_id },
      details,
    )
    if (!response)
      return res
        .status(httpStatusCodes.BAD_REQUEST)
        .json({ error: 'Unable to update contract' })

    await this.generate_contract()

    return res.status(httpStatusCodes.OK).json({ msg: 'Updated contract' })
  } catch (err) {
    console.error({ error: err.message })
    return res
      .status(httpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Server Error' })
  }
}

module.exports.deleteContract = async (req, res) => {
  try {
    const { contract_id } = req.query
    const response = await CONTRACTMODEL.findByIdAndDelete({ _id: contract_id })
    if (!response)
      return res
        .status(httpStatusCodes.NOT_FOUND)
        .json({ error: 'Failed to delete contract1' })

    const user_response = await TENANTMODEL.findOne({
      user_id: response.user_id,
    })
    if (!user_response)
      return res
        .status(httpStatusCodes.NOT_FOUND)
        .json({ error: 'Failed to delete contract2' })

    const unit_response = await UNITMODEL.findById({ _id: response.unit_id })
    if (!unit_response)
      return res
        .status(httpStatusCodes.NOT_FOUND)
        .json({ error: 'Unit not found' })

    const pdf_file_path = `documents/contracts/Lease_Agreement_${unit_response.unit_no}-${user_response.user_id}.pdf`
    await fs.unlink(pdf_file_path)
    return res.status(httpStatusCodes.OK).json({ msg: 'Contract Deleted' })
  } catch (err) {
    console.error({ error: err.message })
    return res
      .status(httpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Server Error' })
  }
}
