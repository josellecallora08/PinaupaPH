const httpStatusCodes = require('../constants/constants')
const TENANTMODEL = require('../models/tenant')
const USERMODEL = require('../models/user')
const CONTRACTMODEL = require('../models/contract')
const UNITMODEL = require('../models/unit')
const pdf = require('html-pdf')
const cloudinary = require('cloudinary').v2
const pdf_template = require('../template/contract')

module.exports.fetchContracts = async (req, res) => {
  try {
    const response = await CONTRACTMODEL.find({}).populate({
      path: 'tenant_id',
      populate: {
        path: 'user_id unit_id',
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

module.exports.fetchContract = async (req, res) => {
  const { contract_id } = req.query
  try {
    const response = await CONTRACTMODEL.findById(contract_id).populate({
      path: 'tenant_id',
      populate: {
        path: 'user_id unit_id apartment_id',
      },
    })

    if (!response) {
      return res.status(httpStatusCodes.NOT_FOUND).json({
        error: `Failed to fetch invoice of ${response.tenant_id.user_id.name}.`,
      })
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
    const response = await CONTRACTMODEL.aggregate([
      {
        $lookup: {
          from: 'tenants',
          localField: 'tenant_id',
          foreignField: '_id',
          as: 'tenant',
        },
      },
      {
        $unwind: {
          path: '$tenant',
          preserveNullAndEmptyArrays: true,
        },
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
        $unwind: {
          path: '$user',
          preserveNullAndEmptyArrays: true,
        },
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
        $unwind: {
          path: '$unit',
          preserveNullAndEmptyArrays: true,
        },
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
          pdf:1,
          witnesses: 1,
        },
      },
    ])

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
  const current_date = new Date()
  const day = current_date.getDate()
  const month = current_date.getMonth()
  const year = current_date.getFullYear()

  try {
    const response = await TENANTMODEL.findOne({ user_id }).populate(
      'user_id unit_id apartment_id',
    )

    if (!response) {
      return res
        .status(httpStatusCodes.NOT_FOUND)
        .json({ error: 'Tenant Not found' })
    }
    const reference = `Lease_Agreement_${response.unit_id.unit_no}-${response.user_id.name}-${month}${day}${year}`
    const existingInvoice = await cloudinary.search
      .expression(`public_id:${reference}`)
      .execute()

    if (existingInvoice.total_count > 0) {
      return res
        .status(httpStatusCodes.FOUND)
        .json({ error: 'Invoice already exists in Cloudinary.' })
    }
    const isExisting = await CONTRACTMODEL.findOne({
      'pdf.reference': reference,
    })
    if (isExisting) {
      return res
        .status(httpStatusCodes.FOUND)
        .json({ error: 'Invoice exists...' })
    }
    console.log(response)
    const pdfBuffer = await new Promise((resolve, reject) => {
      pdf
        .create(pdf_template({ response }), {
          childProcessOptions: {
            env: {
              OPENSSL_CONF: '/dev/null',
            },
          },
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
            resource_type: 'raw',
            format: 'pdf', // Specify resource type as 'raw' for PDF
            folder: 'PinaupaPH/Contracts', // Folder in Cloudinary where PDF will be stored
            overwrite: true,
            transformation: [{ width: 612, height: 1008, crop: 'fit' }], // Do not overwrite if file with the same name exists
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
      'pdf.public_id': cloudinaryResponse.public_id,
      'pdf.pdf_url': cloudinaryResponse.secure_url,
      'pdf.reference': reference,
    })
    // To Follow up the Push for Witnesses

    if (!contractResponse)
      return res
        .status(httpStatusCodes.NOT_FOUND)
        .json({ error: 'Contract Not found' })

    const contract = await CONTRACTMODEL.findById(contractResponse._id).populate({
      path: 'tenant_id',
      populate: 'user_id unit_id apartment_id',
    })

    return res.status(httpStatusCodes.CREATED).json({
      msg: 'Successfully Created Contract!',
      response: contract,
    })
  } catch (err) {
    console.error({ error: err.message })
    return res
      .status(httpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: err.message })
  }
}

module.exports.generateContract = async (req, res) => {
  try {
    let { contract_id } = req.query
    console.log(req.query)
    let contract = await CONTRACTMODEL.findById(contract_id)
    if (!contract)
      {
        const user = await TENANTMODEL.findOne({user_id: contract_id})
        if(!user){
          return res.status(httpStatusCodes.NOT_FOUND).json({error: "User not found"})
        }
        console.log(user)
        contract = await CONTRACTMODEL.findOne({tenant_id:user._id})
        if(!contract){
          console.log('run')
          return res.status(httpStatusCodes.NOT_FOUND).json({error: "User not found"})
        }
      }

      console.log("Ran")
    const { public_id } = contract.pdf
    console.log(public_id)
    // Fetch the file from Cloudinary
    const cloudinaryUrl = cloudinary.url(public_id, {
      resource_type: 'raw',
    })
    const response = await fetch(cloudinaryUrl)
    if (!response.ok) {
      return res
        .status(httpStatusCodes.NOT_FOUND)
        .json({ error: 'Failed to fetch PDF from Cloudinary' })
    }
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="LeaseAgreement.pdf"`,
    )
    res.setHeader('Content-Type', 'application/pdf')

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
module.exports.editContract = async (req, res) => {
  const { contract_id } = req.query
  const { witness, witness2 } = req.body
  const information = {}

  if (!advance == '') {
    information.advance = advance
  }
  if (!witness == '') {
    information.from_date = witness
  }
  if (!witness2 == '') {
    information.to_date = witness2
  }

  try {
    const response = await CONTRACTMODEL.findById(contract_id).populate({
      path: 'tenant_id',
      populate: {
        path: 'user_id unit_id apartment_id',
      },
    })
    if (!response)
      return res
        .status(httpStatusCodes.BAD_REQUEST)
        .json({ error: 'Unable to update contract' })

    console.log(response)

    const pdfBuffer = await new Promise((resolve, reject) => {
      pdf
        .create(pdf_template({ response }), {
          childProcessOptions: {
            env: {
              OPENSSL_CONF: '/dev/null',
            },
          },
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
            format: 'pdf', // Specify resource type as 'raw' for PDF
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
    // await this.generate_contract()
    //Once edited PDF on cloudinary must be updated as well
    return res.status(httpStatusCodes.OK).json({ msg: 'Updated contract' })
  } catch (err) {
    console.error({ error: err.message })
    return res
      .status(httpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: err.message })
  }
}

module.exports.deleteContract = async (req, res) => {
  try {
    const { contract_id } = req.query
    const response = await CONTRACTMODEL.findByIdAndDelete(contract_id)
    if (!response)
      return res
        .status(httpStatusCodes.NOT_FOUND)
        .json({ error: 'Failed to delete contract1' })

    const user_response = await TENANTMODEL.findById(response.tenant_id)
    if (!user_response)
      return res
        .status(httpStatusCodes.NOT_FOUND)
        .json({ error: 'Failed to delete contract due to not found user.' })

    const pdfPublicId = response.pdf.public_id

    await cloudinary.uploader
      .destroy(`${pdfPublicId}`, { resource_type: 'raw' })
      .then((result) => console.log(result))

    return res
      .status(httpStatusCodes.OK)
      .json({ msg: 'Contract Deleted', response })
  } catch (err) {
    console.error({ error: err.message })
    return res
      .status(httpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: err.message })
  }
}
