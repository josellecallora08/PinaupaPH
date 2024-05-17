import { createSlice } from '@reduxjs/toolkit'
import { io } from 'socket.io-client'
import Cookies from 'js-cookie'
const paymentSlice = createSlice({
  name: 'payment',
  initialState: {
    loading: false,
    intentId: null,
    clientId: null,
    error: null,
  },
  reducers: {
    startLoading: (state) => {
      state.loading = true
      state.error = null
    },
    paymentSuccess: (state, action) => {
      state.loading = false
    },
    fetchKeySuccess: (state, action) => {
      state.loading = false
      state.intentId = action.payload.data.id
      state.clientId = action.payload.data.attributes.client_key
    },
    actionFailed: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
  },
})

export const { startLoading, paymentSuccess, fetchKeySuccess, actionFailed } =
  paymentSlice.actions

export const paymentStatus = (invoice_id, navigate) => async (dispatch) => {
  try {
    const token = Cookies.get('token')
    dispatch(startLoading())
    const responseIntent = await fetch(
      `${import.meta.env.VITE_URL}/api/invoice/list/v1?invoice_id=${invoice_id}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    if (!responseIntent.ok) {
      const json = await responseIntent.json()
      console.log(json)
      throw new Error(json.error)
    }
    const jsonIntent = await responseIntent.json()
    console.log(jsonIntent)
    const statusPayment = await fetch(
      `https://api.paymongo.com/v1/payment_intents/${jsonIntent.response.intent.paymentIntent}?client_key=${jsonIntent.response.intent.clienKey}`,
      {
        headers: {
          accept: 'application/json',
          authorization: `Basic ${import.meta.env.VITE_PAYMONGO_TOKEN}`,
        },
      },
    )
    if (!statusPayment.ok) {
      const json = await statusPayment.json()
      throw new Error(json)
    }

    const statusJson = await statusPayment.json()

    const updateStatus = await fetch(
      `${import.meta.env.VITE_URL}/api/payment/invoice?invoice_id=${invoice_id}&status=${statusJson.data.attributes.status}`,
      {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    if (!updateStatus.ok) {
      const json = await updateStatus.json()
      console.log(json)
      throw new Error(json)
    }

    const jsonStatus = await updateStatus.json()
    console.log(jsonStatus)
    navigate('/dashboard')
  } catch (err) {
    dispatch(actionFailed(err.message))
  }
}
export const createPaymentIntent = (invoice_id, fields) => async (dispatch) => {
  try {
    const token = Cookies.get('token')
    const socket = io(`${import.meta.env.VITE_URL}/`)
    dispatch(startLoading())
    const responseIntent = await fetch(
      `${import.meta.env.VITE_URL}/api/payment/create_intent?invoice_id=${invoice_id}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(fields),
      },
    )
    if (!responseIntent.ok) {
      const json = await responseIntent.json()
      console.log(json)
      throw new Error(json.error)
    }
    const jsonIntent = await responseIntent.json()
    const response = await fetch(
      `https://api.paymongo.com/v1/payment_methods`,
      {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Basic ${import.meta.env.VITE_PAYMONGO_TOKEN}`,
        },
        body: JSON.stringify({
          data: {
            attributes: {
              billing: {
                name: `${fields.name}`,
                email: `${fields.email}`,
                phone: `${fields.phone}`,
                // name: `joselle`,
                // email: `josellecallora08@gmail.com`,
                // phone: `09993541054`,
              },
              type: `${fields.method}`,
              // type: `gcash`,
            },
          },
        }),
      },
    )
    if (!response.ok) {
      const json = await response.json()
      console.log(`payment error: ${json.error} ${json}`)
      throw new Error(json)
    }
    const json = await response.json()
    console.log(json)

    // if(fields.payment_method === "gcash" || fields.payment_method === "paymaya" || fields.payment_method === "grabpay"){
    const isPayment = await fetch(
      `${import.meta.env.VITE_URL}/api/payment/create?method=${json?.data.attributes.type}&method_id=${json?.data.id}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    if (!isPayment.ok) {
      const json1 = await isPayment.json()
      throw new Error(json1.error)
    }

    const paymentData = await isPayment.json()
    console.log(paymentData)
    console.log(jsonIntent)
    const post_payment = await fetch(
      `https://api.paymongo.com/v1/payment_intents/${jsonIntent.response.intent.paymentIntent}/attach`,
      {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Basic ${import.meta.env.VITE_PAYMONGO_TOKEN}`,
        },
        body: JSON.stringify({
          data: {
            attributes: {
              payment_method: `${paymentData.response.payment.method_id}`,
              client_key: `${jsonIntent.response.intent.clientKey}`,
              return_url: `${import.meta.env.VITE_RETURN_URL}/verify-payment/status/${invoice_id}`,
            },
          },
        }),
      },
    )
    if (!post_payment.ok) {
      const json = await post_payment.json()
      console.log(json)
      throw new Error(json)
    }
    const data = await post_payment.json()
    console.log(data)
    socket.emit('send-payment')
    window.open(data.data.attributes.next_action.redirect.url, '_blank')
    // }

    const statusPayment = await fetch(
      `https://api.paymongo.com/v1/payment_intents/${jsonIntent.response.intent.paymentIntent}?client_key=${jsonIntent.response.intent.clienKey}`,
      {
        headers: {
          accept: 'application/json',
          authorization: `Basic ${import.meta.env.VITE_PAYMONGO_TOKEN}`,
        },
      },
    )
    if (!statusPayment.ok) {
      const json = await statusPayment.json()
      throw new Error(json)
    }

    const statusJson = await statusPayment.json()

    const updateStatus = await fetch(
      `${import.meta.env.VITE_URL}/api/payment/invoice?invoice_id=${invoice_id}&status=${statusJson.data.attributes.status}`,
      {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    if (!updateStatus.ok) {
      const json = await updateStatus.json()
      console.log(json)
      throw new Error(json)
    }

    const jsonStatus = await updateStatus.json()
    console.log(jsonStatus)
  } catch (err) {
    dispatch(actionFailed(err.message))
  }
}

export const cashPayment = () => async (dispatch) => {
  try {
    const token = Cookies.get('token')
    const socket = io(`${import.meta.env.VITE_URL}/`)
    const response = await fetch(`${import.meta.env.VITE_URL}/api/payment/cash`)
  } catch (err) {}
}

export const createPayment =
  (fields, intentId, clientKey) => async (dispatch) => {
    try {
      const token = Cookies.get('token')
      const socket = io(`${import.meta.env.VITE_URL}/`)

      const response = await fetch(
        `https://api.paymongo.com/v1/payment_methods`,
        {
          method: 'POST',
          headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Basic ${import.meta.env.VITE_PAYMONGO_TOKEN}`,
          },
          body: JSON.stringify({
            data: {
              attributes: {
                billing: {
                  name: `${fields.name}`,
                  email: `${fields.email}`,
                  phone: `${fields.phone}`,
                  // name: `joselle`,
                  // email: `josellecallora08@gmail.com`,
                  // phone: `09993541054`,
                },
                type: `${fields.payment_method}`,
                // type: `gcash`,
              },
            },
          }),
        },
      )
      if (!response.ok) {
        const json = await response.json()
        console.log(`payment error: ${json.error} ${json}`)
        throw new Error(json)
      }
      const json = await response.json()
      // {
      //   "data": {
      //     "id": "pm_hYrUUSfRGEs8ZNmG6fATWs9m",
      //     "type": "payment_method",
      //     "attributes": {
      //       "livemode": false,
      //       "type": "gcash",
      //       "billing": null,
      //       "created_at": 1713399339,
      //       "updated_at": 1713399339,
      //       "details": null,
      //       "metadata": null
      //     }
      //   }
      // }
      // if(fields.payment_method === "gcash" || fields.payment_method === "paymaya" || fields.payment_method === "grabpay"){
      const isPayment = await fetch(
        `${import.meta.env.VITE_URL}/api/payment/create?method=${json?.data.attributes.type}&method_id=${json?.data.id}`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      if (!isPayment.ok) {
        const json1 = await isPayment.json()
        throw new Error(json1.error)
      }

      const paymentData = await isPayment.json()
      console.log(paymentData)

      const post_payment = await fetch(
        `https://api.paymongo.com/v1/payment_intents/${intentId}/attach`,
        {
          method: 'POST',
          headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Basic ${import.meta.env.VITE_PAYMONGO_TOKEN}`,
          },
          body: JSON.stringify({
            data: {
              attributes: {
                payment_method: `${paymentData.response.payment.method_id}`,
                client_key: `${clientKey}`,
                return_url: `${import.meta.env.VITE_RETURN_URL}`,
              },
            },
          }),
        },
      )
      if (!post_payment.ok) {
        const json = await post_payment.json()
        throw new Error(json)
      }
      const data = await post_payment.json()
      socket.emit('send-payment')
      window.open(data.data.attributes.next_action.redirect.url)
      // }

      const statusPayment = await fetch(
        `https://api.paymongo.com/v1/payment_intents/${intentId}?client_key=${clientKey}`,
        {
          headers: {
            accept: 'application/json',
            authorization: `Basic ${import.meta.env.VITE_PAYMONGO_TOKEN}`,
          },
        },
      )
      if (!statusPayment.ok) {
        const json = await statusPayment.json()
        throw new Error(json)
      }

      const statusJson = await statusPayment.json()
      // {
      //   "data": {
      //     "id": "pi_sBd4iHuNTyFKRRtQfMHGEb4J",
      //     "type": "payment_intent",
      //     "attributes": {
      //       "amount": 5400,
      //       "capture_type": "automatic",
      //       "client_key": "pi_sBd4iHuNTyFKRRtQfMHGEb4J_client_afpJc953TtKzeGcJv7ckaaFA",
      //       "currency": "PHP",
      //       "description": "Monthly Rent",
      //       "livemode": false,
      //       "statement_descriptor": "Rental Fee",
      //       "status": "succeeded",
      //       "last_payment_error": null,
      //       "payment_method_allowed": [
      //         "gcash",
      //         "paymaya",
      //         "grab_pay"
      //       ],
      //       "payments": [
      //         {
      //           "id": "pay_bHYssLsoNEkAqQvZnrhvqomm",
      //           "type": "payment",
      //           "attributes": {
      //             "access_url": null,
      //             "amount": 5400,
      //             "balance_transaction_id": "bal_txn_k2VNrrYGasxtgtvArtEQ5pay",
      //             "billing": {
      //               "address": {
      //                 "city": null,
      //                 "country": null,
      //                 "line1": null,
      //                 "line2": null,
      //                 "postal_code": null,
      //                 "state": null
      //               },
      //               "email": "josellecallora08@gmail.com",
      //               "name": "joselle",
      //               "phone": "09993541054"
      //             },
      //             "currency": "PHP",
      //             "description": "Monthly Rent",
      //             "disputed": false,
      //             "external_reference_number": null,
      //             "fee": 135,
      //             "instant_settlement": null,
      //             "livemode": false,
      //             "net_amount": 5265,
      //             "origin": "api",
      //             "payment_intent_id": "pi_sBd4iHuNTyFKRRtQfMHGEb4J",
      //             "payout": null,
      //             "source": {
      //               "id": "src_MdR2JULkygD3yGi3xhp2ApzS",
      //               "type": "gcash"
      //             },
      //             "statement_descriptor": "Rental Fee",
      //             "status": "paid",
      //             "tax_amount": null,
      //             "metadata": null,
      //             "refunds": [],
      //             "taxes": [],
      //             "available_at": 1715158800,
      //             "created_at": 1714803737,
      //             "credited_at": 1715763600,
      //             "paid_at": 1714803737,
      //             "updated_at": 1714803737
      //           }
      //         }
      //       ],
      //       "next_action": null,
      //       "payment_method_options": null,
      //       "metadata": null,
      //       "setup_future_usage": null,
      //       "created_at": 1714735494,
      //       "updated_at": 1714803737
      //     }
      //   }
      // }
      const updateStatus = await fetch(
        `${import.meta.env.VITE_URL}/api/invoice/payment?invoice_id=${paymentData.response._id}&status=${statusJson.data.attributes.status}`,
        {
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      if (!updateStatus.ok) {
        const json = await statusPayment.json()
        throw new Error(json)
      }
    } catch (err) {
      dispatch(actionFailed())
    }
  }

export default paymentSlice.reducer
