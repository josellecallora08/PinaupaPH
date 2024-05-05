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

// export const createPaymentIntent = (userId) => async (dispatch) => {
//   try {
//     const token = Cookies.get('token')
//     dispatch(startLoading())
//     const response = await fetch(
//       `${import.meta.env.VITE_URL}/api/payment/create_intent?user_id=${userId}`,
//       {
//         method: 'POST',
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         },
//       },
//     )
//     if (!response.ok) {
//       const json = await response.json()
//       throw new Error(json.error)
//     }
//     const json = await response.json()
//     // {
//     //   "data": {
//     //     "id": "pi_3takubmxGRQySCz9G5jFUBgU",
//     //     "type": "payment_intent",
//     //     "attributes": {
//     //       "amount": 650000,
//     //       "capture_type": "automatic",
//     //       "client_key": "pi_3takubmxGRQySCz9G5jFUBgU_client_yrFQ4Jghx6fddAdR5mgoWq16",
//     //       "currency": "PHP",
//     //       "description": null,
//     //       "livemode": false,
//     //       "statement_descriptor": "PinaupaPH",
//     //       "status": "awaiting_payment_method",
//     //       "last_payment_error": null,
//     //       "payment_method_allowed": [
//     //         "paymaya",
//     //         "dob",
//     //         "card",
//     //         "billease",
//     //         "atome",
//     //         "grab_pay",
//     //         "gcash"
//     //       ],
//     //       "payments": [],
//     //       "next_action": null,
//     //       "payment_method_options": {
//     //         "card": {
//     //           "request_three_d_secure": "any"
//     //         }
//     //       },
//     //       "metadata": null,
//     //       "setup_future_usage": null,
//     //       "created_at": 1713399776,
//     //       "updated_at": 1713399776
//     //     }
//     //   }
//     // }
//     dispatch(fetchKeySuccess(json))
//   } catch (err) {
//     dispatch(actionFailed(err.message))
//   }
// }
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
                  // name: `${fields.name}`,
                  // email: `${fields.email}`,
                  // phone: `${fields.phone}`,
                  name: `joselle`,
                  email: `josellecallora08@gmail.com`,
                  phone: `09993541054`,
                },
                // type: `${fields.payment_method}`,
                type: `gcash`,
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
        console.log(json)
        throw new Error(json)
      }
      const data = await post_payment.json()
      console.log(data)
      socket.emit('send-payment')
      window.open(data.data.attributes.next_action.redirect.url)
      // }

      const statusPayment = await fetch(`https://api.paymongo.com/v1/payment_intents/${intentId}?client_key=${clientKey}`,{
        headers: {
          accept: 'application/json',
          authorization: `Basic ${import.meta.env.VITE_PAYMONGO_TOKEN}`
        }
      })
      if(!statusPayment.ok){
        const json = await statusPayment.json()
        throw new Error(json)
      }

      const statusJson = await statusPayment.json()
      console.log(statusJson)
      // const updateStatus = await fetch(`${import.meta.env.VITE_URL}/api/invoice/update?invoice_id=${paymentData.response._id}&status=${statusJson.}`, {
      //   method: "PATCH",
      //   headers:{
      //     Authorization: `Bearer ${token}`
      //   }
      // })
      // if(!statusJson.ok){
      //   const json = await statusPayment.json()
      //   throw new Error(json)
      // }
    } catch (err) {
      dispatch(actionFailed())
    }
  }

// const handleCheckout = async() => {
//     try{
//       const response = await fetch(`${import.meta.env.VITE_URL}/checkout`, {
//         method: 'POST',
//         headers:{
//           authorization: `Bearer ${'token'}`
//         },
//         body: JSON.stringify({
//           amount: `${'600000'}`
//         })
//       });

//       if (!response.ok) {
//         throw new Error('Unable to create payment method');
//       }

//       const data = await response.json();
//       window.open(data.data.attributes.checkout_url)
//     }
//     catch(err){
//       console.error('Error:', err.message);
//     }
//   }

export default paymentSlice.reducer
