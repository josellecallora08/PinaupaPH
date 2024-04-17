import { createSlice } from '@reduxjs/toolkit'

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

export const createPaymentIntent = (userId) => async (dispatch) => {
  /* fields {
        amount: 6000,
        payment_method: atome, card, dob, paymaya, billease, gcash, grabpay,
    }
    */
  try {
    const token = Cookies.get('token')
    dispatch(startLoading())
    const response = await fetch(
      `${import.meta.env.VITE_URL}/api/payment/create_intent?user_id=${userId}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      },
    )
    if (!response.ok) {
      const json = await response.json()
      throw new Error(json.error)
    }
    const json = await response.json()
    dispatch(fetchKeySuccess(json))
  } catch (err) {
    dispatch(actionFailed(err.message))
  }
}

export const createPayment =
  (fields, intentId, clientId) => async (dispatch) => {
    try {
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
                },
                type: `${fields.payment_method}`,
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
                payment_method: `${json.data.id}`,
                client_key: `${clientId}`,
                return_url: `${import.meta.env.VITE_RETURN_URL}`,
              },
            },
          }),
        },
      )
      if (!post_payment.ok) {
        const json = await post_payment.json()
        throw new Error(json.error)
      }
      const data = await post_payment.json()
      console.log(data)
      window.open(data.data.attributes.next_action.redirect.url)
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
