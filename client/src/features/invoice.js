import { createSlice } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'
import { redirect } from 'react-router-dom'

const invoiceSlice = createSlice({
  name: 'invoice',
  initialState: {
    loading: false,
    error: null,
    data: null,
    single: null,
    msg: null,
  },
  reducers: {
    fetchStart: (state, action) => {
      state.loading = true
      state.error = null
      state.msg = null
    },
    resetInvoiceStatus: (state) => {
      state.msg = null
      state.error = null
    },
    fetchInvoicesSuccess: (state, action) => {
      state.loading = false
      state.data = action.payload
    },
    editInvoicesSuccess: (state, action) => {
      state.data = state.data.map((item) =>
        item?._id === action.payload.response._id
          ? action.payload
          : item,
      )
      state.msg = action.payload.msg
    },
    fetchInvoiceSuccess: (state, action) => {
      state.loading = false
      state.single = action.payload.response
      state.msg = action.payload.msg
    },
    deleteInvoiceSuccess: (state, action) => {
      state.data = state.data.filter(
        (item) => item?.pdf?.reference !== action.payload.pdf.reference,
      )
      state.msg = action.payload?.msg
    },
    fetchFailed: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    generateSuccess: (state, action) => {
      state.loading = false
      state.msg = action.payload
    },
  },
})

export const {
  fetchStart,
  fetchInvoicesSuccess,
  fetchInvoiceSuccess,
  editInvoicesSuccess,
  fetchFailed,
  deleteInvoiceSuccess,

  generateSuccess,
  resetInvoiceStatus
} = invoiceSlice.actions

export const tenantInvoice = () => async (dispatch) => {
  try {
    dispatch(fetchStart())
    const token = Cookies.get('token')
    const response = await fetch(`${import.meta.env.VITE_URL}/api/invoice/`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    if (!response.ok) {
      const json = await response.json()
      console.log(json)
      throw new Error(json.error)
    }

    const json = await response.json()
    dispatch(fetchInvoiceSuccess(json))
  } catch (err) {
    dispatch(fetchFailed(err.message))
  }
}

export const generateInvoice = (invoice_id) => async (dispatch) => {
  try {
    const token = Cookies.get('token')
    const response = await fetch(
      `${import.meta.env.VITE_URL}/api/invoice/generate?invoice_id=${invoice_id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    if (!response.ok) {
      const json = await response.json()
      dispatch(fetchFailed(json.error))
      throw new Error('Failed to download the invoice')
    }

    const blob = await response.blob()
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', 'invoice.pdf')
    document.body.appendChild(link)
    link.click()
    link.remove()
    dispatch(actionSuccess('Success'))
  } catch (err) {
    dispatch(fetchFailed(err.message))
  }
}

export const searchInvoice = (filter) => async (dispatch) => {
  try {
    dispatch(fetchStart())
    const token = Cookies.get('token')
    const response = await fetch(
      `${import.meta.env.VITE_URL}/api/invoice/search?filter=${filter}`,
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
      const json = await response.json()
      throw new Error(json.error)
    }

    const json = await response.json()
    console.log(json)
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
    dispatch(fetchInvoicesSuccess(json.response))
  } catch (err) {
    dispatch(fetchFailed(err.message))
  }
}
export const fetchInvoice = (invoice_id) => async (dispatch) => {
  try {
    dispatch(fetchStart())
    const token = Cookies.get('token')
    const response = await fetch(
      `${import.meta.env.VITE_URL}/api/invoice/list/v1?invoice_id=${invoice_id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    if (!response.ok) {
      const json = await response.json()
      dispatch(fetchFailed(json.error))
      throw new Error(json.error)
    }
    const json = await response.json()
    dispatch(fetchInvoiceSuccess(json))
  } catch (err) {
    dispatch(fetchFailed(err.message))
  }
}
export const editInvoices = (id, status) => async (dispatch) => {
  try {
    dispatch(fetchStart())
    const token = Cookies.get('token')
    const response = await fetch(
      `${import.meta.env.VITE_URL}/api/invoice/update?invoice_id=${id}&status=${status}`,
      {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    if (!response.ok) {
      const error = await response.json()
      console.log(error.error)
      throw new Error(error)
    }
    const json = await response.json()
    console.log(json)
    dispatch(editInvoicesSuccess(json))
  } catch (err) {
    dispatch(fetchFailed(err.message))
  }
}
export const deleteInvoices = (id) => async (dispatch) => {
  try {
    dispatch(fetchStart())
    const token = Cookies.get('token')
    const response = await fetch(
      `${import.meta.env.VITE_URL}/api/invoice/delete?invoice_id=${id}`,
      {
        method: 'DELETE',
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
    dispatch(deleteInvoiceSuccess(json))
  } catch (err) {
    dispatch(fetchFailed(err.message))
  }
}

export default invoiceSlice.reducer
