import { createSlice } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'
const reportSlice = createSlice({
  name: 'report',
  initialState: {
    loading: false,
    data: null,
    single: null,
    msg: null,
    error: null,
  },
  reducers: {
    reportStart: (state) => {
      state.loading = true
      state.error = null
      state.msg = null
    },
    generateReportSuccess: (state, action) => {
      state.loading = false
      state.msg = action.payload
    },
    generateReportFailed: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    fetchReportSuccess: (state, action) => {
      state.loading = false
      state.data = action.payload.response
    },
  },
})
export const {
  reportStart,
  generateReportSuccess,
  generateReportFailed,
  fetchReportSuccess,
} = reportSlice.actions

export const fetchRevenueReport = (date) => async (dispatch) => {
  try {
    dispatch(reportStart())
    const token = Cookies.get('token')
    const response = await fetch(
      `${import.meta.env.VITE_URL}/api/report/revenue/list?from=${date.from}&to=${date.to}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    if (!response.ok) {
      const json = await response.json()
      throw new Error(json.error)
    }
    const json = await response.json()
    dispatch(fetchReportSuccess(json))
  } catch (err) {
    dispatch(generateReportFailed(err.message))
  }
}

export const fetchDelinquencyReport = (date) => async (dispatch) => {
  try {
    dispatch(reportStart())
    const token = Cookies.get('token')
    const response = await fetch(
      `${import.meta.env.VITE_URL}/api/report/delinquency/list?from=${date.from}&to=${date.to}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    if (!response.ok) {
      const json = await response.json()
      throw new Error(json.error)
    }
    const json = await response.json()
    dispatch(fetchReportSuccess(json))
  } catch (err) {
    dispatch(generateReportFailed(err.message))
  }
}
export const fetchGoodpayerReport = (date) => async (dispatch) => {
  try {
    dispatch(reportStart())
    const token = Cookies.get('token')
    const response = await fetch(
      `${import.meta.env.VITE_URL}/api/report/goodpayer/list?from=${date.from}&to=${date.to}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    if (!response.ok) {
      const json = await response.json()
      throw new Error(json.error)
    }
    const json = await response.json()
    dispatch(fetchReportSuccess(json))
  } catch (err) {
    dispatch(generateReportFailed(err.message))
  }
}

export const generateRevenueReport = (date) => async (dispatch) => {
  try {
    dispatch(reportStart())
    const token = Cookies.get('token')
    const response = await fetch(
      `${import.meta.env.VITE_URL}/api/report/revenue?from=${date.from}&to=${date.to}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    if (!response.ok) {
      const json = await response.json()
      throw new Error(json.error)
    }
    dispatch(generateReportSuccess('Success! Generated revenue report.'))
    const blob = await response.blob()
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'revenue_report.pdf'
    document.body.appendChild(a)
    a.click()
    a.remove()
    window.URL.revokeObjectURL(url)
  } catch (err) {
    dispatch(generateReportFailed(err.message))
  }
}

export const generateDelinquencyReport = (date) => async (dispatch) => {
  try {
    dispatch(reportStart())
    const token = Cookies.get('token')
    const response = await fetch(
      `${import.meta.env.VITE_URL}/api/report/delinquency?from=${date.from}&to=${date.to}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    if (!response.ok) {
      const json = await response.json()
      throw new Error(json.error)
    }
    dispatch(generateReportSuccess('Success! Generated delinquency report.'))
    const blob = await response.blob()
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'Delinquency_report.pdf'
    document.body.appendChild(a)
    a.click()
    a.remove()
    window.URL.revokeObjectURL(url)
  } catch (err) {
    dispatch(generateReportFailed(err.message))
  }
}
export const generateGoodpayerReport = (date) => async (dispatch) => {
  try {
    dispatch(reportStart())
    const token = Cookies.get('token')
    const response = await fetch(
      `${import.meta.env.VITE_URL}/api/report/goodpayer?from=${date.from}&to=${date.to}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    if (!response.ok) {
      const json = await response.json()
      throw new Error(json.error)
    }
    dispatch(generateReportSuccess('Success! Generated good payer report.'))
    const blob = await response.blob()
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'Goodpayer_report.pdf'
    document.body.appendChild(a)
    a.click()
    a.remove()
    window.URL.revokeObjectURL(url)
  } catch (err) {
    dispatch(generateReportFailed(err.message))
  }
}

export default reportSlice.reducer
