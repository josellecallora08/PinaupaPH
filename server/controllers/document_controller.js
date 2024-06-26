const httpStatusCodes = require('../constants/constants')
const TENANTMODEL = require('../models/tenant')
const CONTRACTMODEL = require('../models/contract')
const pdf = require('html-pdf')
const cloudinary = require('cloudinary').v2
// const pdf_template = require('../template/contract')
const nodemailer = require('nodemailer')
const axios = require('axios')
const path = require('path')
const ejs = require('ejs')

module.exports.uploadRequirements = async (req, res) => {
  try {
    const { user_id } = req.query;
    let fileNames = req.body.fileNames; // Handle single or multiple filenames

    // Normalize fileNames to an array
    if (typeof fileNames === 'string') {
      fileNames = [fileNames];
    } else if (Array.isArray(fileNames)) {
      fileNames = fileNames;
    } else {
      fileNames = []; // Default to empty array if neither
    }

    const requirements = req.files; // Files parsed by multer

    if (!requirements || requirements.length === 0) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({ error: 'No files uploaded' });
    }

    if (!fileNames || fileNames.length !== requirements.length) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({ error: 'File names count should match files count' });
    }

    const uploadResults = [];

    for (let i = 0; i < requirements.length; i++) {
      const file = requirements[i];
      const fileName = fileNames[i];

      const bufferBase64 = file.buffer.toString('base64');
      const bufferString = `data:${file.mimetype};base64,${bufferBase64}`;
      const result = await cloudinary.uploader.upload(bufferString, {
        resource_type: 'auto',
        public_id: fileName,
        folder: `PinaupaPH/Requirements/${user_id}`
      });

      uploadResults.push({
        url: result.secure_url,
        public_id: result.public_id,
        name: fileName
      });
    }

    const tenant = await TENANTMODEL.findOne({ user_id }).populate('user_id unit_id apartment_id');
    tenant.documents.push(...uploadResults);
    await tenant.save();

    

    res.status(httpStatusCodes.OK).json({ msg: 'Documents uploaded successfully', response: uploadResults });
  } catch (err) {
    res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Failed to upload documents', err });
  }
};

module.exports.fetchRequirements = async (req, res) => {
  try {
    const { user_id } = req.query;

    const tenant = await TENANTMODEL.findOne({ user_id }).populate('user_id unit_id apartment_id');
    
    res.status(httpStatusCodes.OK).json({ response: tenant.documents });
  } catch (err) {
    res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Failed to upload documents', err });
  }
};



module.exports.fetchContracts = async (req, res) => {
  try {
    const response = await CONTRACTMODEL.find({}).populate({
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
          pdf: 1,
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
    const reference = `Lease_Agreement_${response.unit_id.unit_no}-${response.user_id.name}` //-${month}${day}${year}
    const existingInvoice = await cloudinary.search
      .expression(`public_id:${reference}`)
      .execute()

    if (existingInvoice.total_count > 0) {
      return res
        .status(httpStatusCodes.FOUND)
        .json({ error: 'Agreement already exists in Cloudinary.' })
    }
    const isExisting = await CONTRACTMODEL.findOne({
      'pdf.reference': reference,
    })
    if (isExisting) {
      return res
        .status(httpStatusCodes.FOUND)
        .json({ error: 'Agreement exists...' })
    }

    const templatePath = path.join(
      __dirname,
      '../template',
      'lease_agreement_template.ejs',
    )
    const htmlContent = await ejs.renderFile(templatePath, { response })

    pdf
      .create(htmlContent, {
        childProcessOptions: {
          env: {
            OPENSSL_CONF: '/dev/null',
          },
        },
      })
      .toBuffer(async (err, buffer) => {
        if (err) {
          return res
            .status(httpStatusCodes.INTERNAL_SERVER_ERROR)
            .json({ error: 'Failed to generate PDF' })
        }

        // // Set the response headers to download the PDF
        // res.setHeader('Content-Type', 'application/pdf')
        // res.setHeader(
        //   'Content-Disposition',
        //   'attachment; filename=delinquency_report.pdf',
        // )

        // // Send the PDF buffer as the response
        // res.send(buffer)

        const cloudinaryResponse = await new Promise((resolve, reject) => {
          cloudinary.uploader
            .upload_stream(
              {
                resource_type: 'raw',
                format: 'pdf', // Specify resource type as 'raw' for PDF
                folder: 'PinaupaPH/Contracts', // Folder in Cloudinary where PDF will be stored
                overwrite: true,
                // transformation: [{ width: 612, height: 1008, crop: 'fit' }], // Do not overwrite if file with the same name exists
              },
              (error, result) => {
                if (error) reject(error)
                else resolve(result)
              },
            )
            .end(buffer)
        })

        if (!cloudinaryResponse || !cloudinaryResponse.public_id) {
          return res
            .status(httpStatusCodes.CONFLICT)
            .json({ error: 'Failed to upload PDF to Cloudinary...' })
        }

        const downloadPdfFromCloudinary = async () => {
          const response = await axios.get(cloudinaryResponse.secure_url, {
            responseType: 'stream',
          })
          return response.data
        }

        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.GOOGLE_EMAIL,
            pass: process.env.GOOGLE_PASSWORD,
          },
        })
        const mailOptions = {
          from: 'pinaupaph@gmail.com',
          to: response.user_id.email,
          subject: `Lease Agreement for ${response.user_id.name}`,
          html: `
          <!DOCTYPE html>
          <html>
          <head>
              <title>Contract Agreement</title>
              <style>
                  body {
                      font-family: Arial, sans-serif;
                      background-color: #f4f4f4;
                      padding: 20px;
                  }
                  .container {
                      background-color: #ffffff;
                      padding: 20px;
                      border-radius: 5px;
                      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                  }
                  .header {
                      text-align: center;
                      margin-bottom: 20px;
                  }
                  .content {
                      font-size: 16px;
                      line-height: 1.5;
                  }
                  .footer {
                      text-align: center;
                      margin-top: 20px;
                      font-size: 12px;
                      color: #888888;
                  }
              </style>
          </head>
          <body>
              <div class="container">
                  <div class="header">
                      <h1>Contract Agreement</h1>
                  </div>
                  <div class="content">
                      <p>Dear ${response?.user_id?.name},</p>
                      <p>Please find attached your contract agreement.</p>
                  </div>
                  <div class="footer">
                      <p>&copy; 2024 PinaupaPH. All rights reserved.</p>
                  </div>
              </div>
          </body>
          </html>
      `,
          attachments: [
            {
              filename: 'Contract.pdf',
              content: await downloadPdfFromCloudinary(),
            },
          ],
        }

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log('Error:', error)
          } else {
            console.log('Email sent:', info.response)
          }
        })

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

        const contract = await CONTRACTMODEL.findById(
          contractResponse._id,
        ).populate({
          path: 'tenant_id',
          populate: 'user_id unit_id apartment_id',
        })

        return res.status(httpStatusCodes.CREATED).json({
          msg: 'Successfully Created Contract!',
          response: contract,
        })
      })
    //   const pdfBuffer = await new Promise((resolve, reject) => {
    //     pdf
    // .create(htmlContent, {
    //   childProcessOptions: {
    //     env: {
    //       OPENSSL_CONF: '/dev/null',
    //     },
    //   },
    // })
    //       .toBuffer((err, buffer) => {
    //         if (err) reject(err)
    //         else resolve(buffer)
    //       })
    //   })


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
    if (!contract) {
      const user = await TENANTMODEL.findOne({ user_id: contract_id })
      if (!user) {
        return res
          .status(httpStatusCodes.NOT_FOUND)
          .json({ error: 'User not found' })
      }
      console.log(user)
      contract = await CONTRACTMODEL.findOne({ tenant_id: user._id })
      if (!contract) {
        return res
          .status(httpStatusCodes.NOT_FOUND)
          .json({ error: 'User not found' })
      }
    }

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
