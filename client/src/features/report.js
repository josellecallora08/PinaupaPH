import { createSlice } from '@reduxjs/toolkit'

const reportSlice = createSlice({
  name: 'report',
  initialState: {
    loading: false,
    data: null,
    single: null,
    msg: null,
    error: null,
  },
  reducer: {},
})

export const generateRevenueReport = () => async (dispatch) => {}
export const generateDelinquencyReport = () => async (dispatch) => {}
export const generateGoodpayerReport = () => async (dispatch) => {}
