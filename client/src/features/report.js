import { createSlice } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'
const reportSlice = createSlice({
  name: 'report',
  initialState: {
    loading: false,
    error: null,
    data: null,
    single: null,
  },
  reducers: {
    fetchReportStart: (state) => {
      state.loading = true
      state.error = null
    },
    fetchReportsSuccess: (state, action) => {
      state.loading = false
      state.data = action.payload
    },
    fetchReportSuccess: (state, action) => {
      state.loading = false
      state.single = action.payload
    },
    fetchReportFailed: (state, action) => {
      state.loading = false
      state.error = action.paylaod
    },
  },
})

export const {
  fetchReportStart,
  fetchReportsSuccess,
  fetchReportSuccess,
  fetchReportFailed,
} = reportSlice.actions

export const createReport = (user_id, fields) => async (dispatch) => {
  try {
    const token = Cookies.get('token')
    dispatch(fetchReportStart())
    const response = await fetch(`${import.meta.env.VITE_URL}/api/report/${user_id}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(fields),
    })

    if (!response.ok) {
      const json = await response.json()
      throw new Error(json.error)
    }

    dispatch(fetchReports())
  } catch (err) {
    console.log(err.message)
    dispatch(fetchReportFailed(err.message))
  }
}

export const fetchReports = () => async (dispatch) => {
  try {
    const token = Cookies.get('token')
    dispatch(fetchReportStart())
    const response = await fetch(`${import.meta.env.VITE_URL}/api/report/`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    if (!response.ok) {
      const json = await response.json()
      throw new Error(json.error)
    }
    const json = await response.json()
    console.log(json.reports)
    dispatch(fetchReportsSuccess(json.reports))
  } catch (err) {
    console.log(err.message)
    dispatch(fetchReportFailed(err.message))
  }
}
export const fetchReport = (report_id) => async (dispatch) => {
  try {
    dispatch(fetchReportStart())
    const token = Cookies.get('token')
    const response = await fetch(`${import.meta.env.VITE_URL}/api/report/v1?report_id=${report_id}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if (!response.ok) {
        const json = await response.json()
        throw new Error(json.error)
      }
      const json = await response.json()
      console.log(json.report)
      dispatch(fetchReportSuccess(json.report))
  } catch (err) {
    console.log(err.message)
    dispatch(fetchReportFailed(err.message))
  }
}

export const editReport = (report_id, fields) => async (dispatch) => {
  try {
    const token = Cookies.get('token')
    dispatch(fetchReportStart())
    const response = await fetch(`${import.meta.env.VITE_URL}/api/report/v1?report_id=${report_id}`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if (!response.ok) {
        const json = await response.json()
        throw new Error(json.error)
      }
      const json = await response.json()
      dispatch(fetchReports())
  } catch (err) {
    console.log(err.message)
    dispatch(fetchReportFailed(err.message))
  }
}
export const deleteReport = () => async (dispatch) => {
  try {
    dispatch(fetchReportStart())
    const token = Cookies.get('token')
    const response = await fetch(`${import.meta.env.VITE_URL}/api/report/v1?report_id=${report_id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if (!response.ok) {
        const json = await response.json()
        throw new Error(json.error)
      }
      const json = await response.json()
      dispatch(fetchReports())
  } catch (err) {
    console.log(err.message)
    dispatch(fetchReportFailed(err.message))
  }
}
export default reportSlice.reducer
