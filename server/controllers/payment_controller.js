const USERMODEL = require('../models/user')
const httpStatusCodes = require('../constants/constants')

module.exports.create_intent = async (req, res) => {
  const { user_id } = req.query
  try {
    const tenant = await TENANTMODEL.findOne({ user_id })
      .populate('user_id')
      .populate('unit_id')
    if(!tenant){
      return res.status(httpStatusCodes.NOT_FOUND).json({error: "Failed to create payment, user not found..."})
    }
    const url = 'https://api.paymongo.com/v1/payment_intents'
    const options = {
      method: 'POST',
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
              'atome',
              'card',
              'dob',
              'paymaya',
              'billease',
              'gcash',
              'grab_pay',
            ],
            payment_method_options: { card: { request_three_d_secure: 'any' } },
            currency: 'PHP',
            capture_type: 'automatic',
            statement_descriptor: 'Apartment Rental Fee',
            description: 'Monthly Rent',
          },
        },
      }),
    }

    const response = await fetch(url, options)
    if (!response)
      return res
        .status(httpStatusCodes.BAD_REQUEST)
        .json({ error: 'Endpoint Problem' })

    const data = await response.json()

    return res.status(httpStatusCodes.OK).json(data)
  } catch (err) {
    console.error({ error: err.message })
    return res
      .status(httpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Server Error' })
  }
}

module.exports.payment_method = async (req, res) => {
  const { method } = req.body
  try{
    const user_response = await USERMODEL.findById({_id: user_id})
    const url = 'https://api.paymongo.com/v1/payment_methods';
    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
        authorization: `Basic ${Buffer.from(process.env.PAYMONGO_PUBLIC_KEY).toString('base64')}`
      },
      body: JSON.stringify({
        data: {
          attributes: {
            details: {
              card_number: `${card_number}`,
              exp_month: `${exp_month}`,
              exp_year: `${exp_year}`,
              cvc: `${cvc}`
            },
            billing: {
              name: `${user_response.name}`,
              email: `${user_response.email}`,
              phone: `${user_response.mobile_no}`
            },
            type: `${payment_method}`
          }
        }
      })
    };

    const response = await fetch(url, options)
    if(!response) return res.status(httpStatusCodes.BAD_REQUEST).json({error: "Endpoint Problem"})
    const data = await response.json()

    return res.status(httpStatusCodes.ACCEPTED).json({data})
  }
  catch(err){
    console.error({ error: err.message });
    return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Server Error' });
  }
}

// FOR WITH UI
module.exports.checkout = async (req, res) => {
  const { user_id } = req.query
  try {
    const url = 'https://api.paymongo.com/v1/checkout_sessions'
    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
        authorization: `Basic ${Buffer.from(process.env.PAYMONGO_SECRET_KEY).toString('base64')}`,
      },
      body: JSON.stringify({
        data: {
          attributes: {
            send_email_receipt: true,
            show_description: true,
            show_line_items: true,
            cancel_url: `${process.env.CLIENT_URL}`,
            description: 'Apartment Rental Fee',
            line_items: [
              {
                currency: 'PHP',
                amount: 600000,
                description: 'Rent',
                name: 'Rent Fee',
                quantity: 1,
              },
            ],
            success_url: 'http://localhost:5173/dashboard',
            payment_method_types: [
              'gcash',
              'paymaya',
              'grab_pay',
              'dob',
              'card',
              'billease',
              'dob_ubp',
            ],
          },
        },
      }),
    }

    const response = await fetch(url, options)
    const json = await response.json()

    // Handle the JSON response (e.g., log specific details)
    console.log('Payment Method Response:', json)

    // Send a response to the client if needed
    res.status(httpStatusCodes.OK).json(json)
  } catch (err) {
    console.error({ error: err.message })
    return res
      .status(httpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Server Error' })
  }
}
