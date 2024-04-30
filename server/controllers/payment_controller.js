const USERMODEL = require('../models/user')
const TENANTMODEL = require('../models/tenant')
const INVOICEMODEL = require('../models/invoice')
const httpStatusCodes = require('../constants/constants')
const NOTIFMODEL = require('../models/notification')
// module.exports.createIntent = async (req, res) => {
//   const { user_id } = req.query
//   try {
//     const tenant = await TENANTMODEL.findOne({ user_id })
//       .populate('user_id unit_id')
//     if (!tenant) {
//       return res.status(httpStatusCodes.NOT_FOUND).json({ error: "Failed to create payment, user not found..." })
//     }
//     const url = 'https://api.paymongo.com/v1/payment_intents'
//     const options = {
//       method: 'POST',
//       headers: {
//         accept: 'application/json',
//         'content-type': 'application/json',
//         authorization: `Basic ${Buffer.from(process.env.PAYMONGO_SECRET_KEY).toString('base64')}`,
//       },
//       body: JSON.stringify({
//         data: {
//           attributes: {
//             amount: tenant.unit_id.rent,
//             payment_method_allowed: [
//               // 'atome',
//               // 'card',
//               // 'dob',
//               'paymaya',
//               // 'billease',
//               'gcash',
//               'grab_pay',
//             ],
//             payment_method_options: { card: { request_three_d_secure: 'any' } },
//             currency: 'PHP',
//             capture_type: 'automatic',
//             statement_descriptor: 'Apartment Rental Fee',
//             description: 'Monthly Rent',
//           },
//         },
//       }),
//     }

//     const response = await fetch(url, options)
//     if (!response)
//       return res
//         .status(httpStatusCodes.BAD_REQUEST)
//         .json({ error: 'Endpoint Problem' })

//     const data = await response.json()

//     return res.status(httpStatusCodes.OK).json(data)
//   } catch (err) {
//     console.error({ error: err.message })
//     return res
//       .status(httpStatusCodes.INTERNAL_SERVER_ERROR)
//       .json({ error: 'Server Error' })
//   }
// }

module.exports.createPayment = async (req, res) => {
  try {
    const { method, method_id } = req.query
    const user_id = req.user.id
    const user = await TENANTMODEL.findOne({ user_id })
    if (!user) {
      return res
        .status(httpStatusCodes.BAD_REQUEST)
        .json({ error: "Tenant not found." })
    }
    const response = await INVOICEMODEL.findByIdAndUpdate(user._id, {
      'payment.method_id': method_id,
      'payment.method': method
    })
    if (!response) {
      return res
        .status(httpStatusCodes.BAD_REQUEST)
        .json({ error: "Invoice cannot be updated." })
    }

    const sendNotif = await NOTIFMODEL.create({
      sender_id: user_id,
      type: "Payment",
      payment_id: response._id
    })
    if (!sendNotif) {
      return res
        .status(httpStatusCodes.BAD_REQUEST)
        .json({ error: "Cannot send Notification" })
    }
    return res.status(httpStatusCodes.OK).json({ msg: "Payment Method and ID are saved.", response })
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
