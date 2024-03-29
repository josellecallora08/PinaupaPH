import { createSlice } from '@reduxjs/toolkit'
import { payment_url } from '../utils/constants'

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

export const createPaymentIntent = (userId, fields) => async (dispatch) => {
  /* fields {
        amount: 6000,
        payment_method: atome, card, dob, paymaya, billease, gcash, grabpay,
    }
    */
  try {
    dispatch(startLoading())
    const method = await fetch(`${payment_url}/create_intent/${userId}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(fields),
    })
    if (!method.ok) {
      throw new Error('Failed to create intent...')
    }
    const json = await method.json()
    dispatch(fetchKeySuccess(json))
  } catch (err) {
    dispatch(actionFailed(err.message))
  }
}

export const createPayment =
  (fields, intentId, clientId) => async (dispatch) => {
    try {
      const payment = await fetch(
        `https://api.paymongo.com/v1/payment_methods`,
        {
          method: 'POST',
          headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Basic c2tfdGVzdF9OOU1lc2lmczdMcTM1a0NzbXRZN3RuTlA6`,
          },
          body: JSON.stringify({
            data: {
              attributes: {
                billing: {
                  name: `${fields.name}`,
                  email: `${fields.email}`,
                  phone: `${fields.phone}`,
                },
                type: `${fields.payment_method}`,
              },
            },
          }),
        },
      )
      if (!payment.ok) {
        throw new Error('Failed to create payment')
      }
      const json = await payment.json()

      const post_payment = await fetch(
        `https://api.paymongo.com/v1/payment_intents/${intentId}/attach`,
        {
          method: 'POST',
          headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Basic c2tfdGVzdF9OOU1lc2lmczdMcTM1a0NzbXRZN3RuTlA6`,
          },
          body: JSON.stringify({
            data: {
              attributes: {
                payment_method: `${json.data.id}`,
                client_key: `${clientId}`,
                return_url: 'http://localhost:5173/dashboard',
              },
            },
          }),
        },
      )
      if (!post_payment.ok) {
        throw new Error('Failed to complete payment...')
      }
      const data = await post_payment.json()
      console.log(data)
      window.open(json1.data.attributes.next_action.redirect.url)
    } catch (err) {
      dispatch(actionFailed())
    }
  }

// const handleCheckout = async() => {
//     try{
//       const response = await fetch(`${payment_url}/checkout`, {
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
