const USERMODEL = require('../models/user')
const TENANTMODEL = require('../models/tenant')
const INVOICEMODEL = require('../models/invoice')
const httpStatusCodes = require('../constants/constants')
const NOTIFMODEL = require('../models/notification')

module.exports.madePayment = async (req, res) => {
  const { invoice_id, status } = req.query
  try {
    const response = await INVOICEMODEL.findByIdAndUpdate(invoice_id, {
      status,
      isPaid: true
    }).populate({
      path: 'tenant_id',
      populate: {
        path: 'user_id unit_id apartment_id',
      },
    })
    if (!response) {
      return res
        .status(httpStatusCodes.BAD_REQUEST)
        .json({ error: 'Unable to update invoice...' })
    }

    const pdfBuffer = await new Promise((resolve, reject) => {
      pdf
        .create(pdf_template(response), {
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
    const admin = await USERMODEL.findOne({ role: "Admin" })
    if (!admin) {
      return res
        .status(httpStatusCodes.BAD_REQUEST)
        .json({ error: 'Invoice cannot be updated.' })
    }
       const sendNotif = await NOTIFMODEL.create({
      sender_id: response.user_id._id,
      receiver_id: admin._id,
      title: 'Rental Fee',
      description: 'Rental Payment has been paid.',
      type: 'Payment'
    })
    if (!sendNotif) {
      return res
        .status(httpStatusCodes.BAD_REQUEST)
        .json({ error: 'Cannot send Notification' })
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
    const { method, method_id } = req.query
    const user_id = req.user.id
    console.log(user_id)
    const user = await TENANTMODEL.findOne({ user_id })
    if (!user) {
      return res
        .status(httpStatusCodes.BAD_REQUEST)
        .json({ error: 'Tenant not found.' })
    }
    const response = await INVOICEMODEL.findOneAndUpdate(
      { tenant_id: user._id },
      {
        'payment.method_id': method_id,
        'payment.method': method,
      },
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




// FOR WITH UI
// module.exports.checkout = async (req, res) => {
//   const { user_id } = req.query
//   try {
//     const url = 'https://api.paymongo.com/v1/checkout_sessions'
//     const options = {
//       method: 'POST',
//       headers: {
//         accept: 'application/json',
//         'Content-Type': 'application/json',
//         authorization: `Basic ${Buffer.from(process.env.PAYMONGO_SECRET_KEY).toString('base64')}`,
//       },
//       body: JSON.stringify({
//         data: {
//           attributes: {
//             send_email_receipt: true,
//             show_description: true,
//             show_line_items: true,
//             cancel_url: `${process.env.CLIENT_URL}`,
//             description: 'Apartment Rental Fee',
//             line_items: [
//               {
//                 currency: 'PHP',
//                 amount: 600000,
//                 description: 'Rent',
//                 name: 'Rent Fee',
//                 quantity: 1,
//               },
//             ],
//             success_url: 'http://localhost:5173/dashboard',
//             payment_method_types: [
//               'gcash',
//               'paymaya',
//               'grab_pay',
//               'dob',
//               'card',
//               'billease',
//               'dob_ubp',
//             ],
//           },
//         },
//       }),
//     }

//     const response = await fetch(url, options)
//     const json = await response.json()

//     // Handle the JSON response (e.g., log specific details)
//     console.log('Payment Method Response:', json)

//     // Send a response to the client if needed
//     res.status(httpStatusCodes.OK).json(json)
//   } catch (err) {
//     console.error({ error: err.message })
//     return res
//       .status(httpStatusCodes.INTERNAL_SERVER_ERROR)
//       .json({ error: 'Server Error' })
//   }
// }
