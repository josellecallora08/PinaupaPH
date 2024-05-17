import { createSlice } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'
const dashboardSlice = createSlice({
  name: 'dash',
  initialState: {
    loading: false,
    totalpaid: null,
    goodpayer: null,
    occupancy: null,
    reports: null,
    error: null,
    chart: null,
  },
  reducers: {
    fetchRateStart: (state) => {
      state.loading = true
    },
    fetchTotalPaymentSuccess: (state, action) => {
      state.loading = false
      state.totalpaid = action.payload
    },
    fetchTotalPayerSuccess: (state, action) => {
      state.loading = false
      state.goodpayer = action.payload
    },
    fetchRevenueSuccess: (state, action) => {
      state.loading = false
      state.chart = action.payload
    },
    fetchTotalOReportsSuccess: (state, action) => {
      state.loading = false
      state.reports = action.payload
    },
    fetchTotalOccupancySuccess: (state, action) => {
      state.loading = false
      state.occupancy = action.payload
    },
    fetchFailed: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
  },
})
export const {
  fetchRateStart,
  fetchTotalOccupancySuccess,
  fetchTotalPayerSuccess,
  fetchTotalPaymentSuccess,
  fetchTotalOReportsSuccess,
  fetchRevenueSuccess,
  fetchFailed,
} = dashboardSlice.actions

export const fetchTotalPaid = (year) => async (dispatch) => {
  try {
    dispatch(fetchRateStart())
    const token = Cookies.get('token')
    const response = await fetch(
      `${import.meta.env.VITE_URL}/api/dashboard/totalpaid?year=${year}`,
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
    console.log(json)
    dispatch(fetchTotalPaymentSuccess(json))
  } catch (err) {
    dispatch(fetchFailed())
  }
}
export const fetchRevenue = (month, year) => async (dispatch) => {
  try {
    dispatch(fetchRateStart())
    const token = Cookies.get('token')
    const response = await fetch(
      `${import.meta.env.VITE_URL}/api/dashboard/chart?month=${month}&year=${year}`,
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
    console.log(json.response)
    dispatch(fetchRevenueSuccess(json.response))
  } catch (err) {
    dispatch(fetchFailed())
  }
}
export const fetchTotalPayer = (year) => async (dispatch) => {
  try {
    dispatch(fetchRateStart())
    const token = Cookies.get('token')
    const response = await fetch(
      `${import.meta.env.VITE_URL}/api/dashboard/deliquency?year=${year}`,
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
    dispatch(fetchTotalPayerSuccess(json))
  } catch (err) {
    dispatch(fetchFailed())
  }
}
export const fetchTotalOccupancy = (month, year) => async (dispatch) => {
  try {
    dispatch(fetchRateStart())
    const token = Cookies.get('token')
    const response = await fetch(
      `${import.meta.env.VITE_URL}/api/dashboard/occupancyrate?month=${month}&year=${year}`,
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
    dispatch(fetchTotalOccupancySuccess(json))
  } catch (err) {
    dispatch(fetchFailed())
  }
}

export const fetchReports = () => async (dispatch) => {
  try {
    dispatch(fetchRateStart())
    const token = Cookies.get('token')
    const response = await fetch(
      `${import.meta.env.VITE_URL}/api/dashboard/reports`,
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
    dispatch(fetchTotalOReportsSuccess(json))
  } catch (err) {
    dispatch(fetchFailed())
  }
}

export default dashboardSlice.reducer
