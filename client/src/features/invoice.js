import { createSlice } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'

const invoiceSlice = createSlice({
  name: 'invoice',
  initialState: {
    loading: false,
    error: null,
    data: null,
    single: null,
  },
  reducers: {
    fetchStart: (state, action) => {
      state.loading = true
      state.error = null
    },
    fetchInvoicesSuccess: (state, action) => {
      state.loading = false
      state.data = action.payload
    },
    fetchInvoiceSuccess: (state, action) => {
      state.loading = false
      state.single = action.payload
    },
    fetchFailed: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
  },
})

export const {
  fetchStart,
  fetchInvoicesSuccess,
  fetchInvoiceSuccess,
  fetchFailed,
} = invoiceSlice.actions
export const searchInvoice = (filter) => async (dispatch) => {
  try {
    dispatch(fetchStart())
    const token = Cookies.get('token')
    const response = await fetch(
      `${import.meta.env.VITE_URL}/api/invoice?filter=${filter}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    )
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error)
    }

    const json = await response.json()
    console.log(json.response)
    dispatch(fetchInvoicesSuccess(json.response))
  } catch (err) {
    dispatch(fetchFailed(err.message))
  }
}
export const createInvoice = (user_id) => async (dispatch) => {
  try {
    dispatch(fetchStart())
    const token = Cookies.get('token')
    const response = await fetch(
      `${import.meta.env.VITE_URL}/api/invoice/create?user_id=${user_id}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    )
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error)
    }

    const json = await response.json()
    dispatch(fetchInvoices())
  } catch (err) {
    dispatch(fetchFailed(err.message))
  }
}
export const fetchInvoices = () => async (dispatch) => {
  try {
    dispatch(fetchStart())
    const token = Cookies.get('token')
    const response = await fetch(
      `${import.meta.env.VITE_URL}/api/invoice/list`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error)
    }

    const json = await response.json()
    console.log(json)
    dispatch(fetchInvoicesSuccess(json.response))
  } catch (err) {
    dispatch(fetchFailed(err.message))
  }
}
export const fetchInvoice = () => async (dispatch) => {
  try {
    dispatch(fetchStart())
    const token = Cookies.get('token')
  } catch (err) {
    dispatch(fetchFailed(err.message))
  }
}
export const editInvoices = () => async (dispatch) => {
  try {
    dispatch(fetchStart())
    const token = Cookies.get('token')
  } catch (err) {
    dispatch(fetchFailed(err.message))
  }
}
export const deleteInvoices = () => async (dispatch) => {
  try {
    dispatch(fetchStart())
    const token = Cookies.get('token')
  } catch (err) {
    dispatch(fetchFailed(err.message))
  }
}

export default invoiceSlice.reducer
