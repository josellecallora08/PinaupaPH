import { createSlice } from "@reduxjs/toolkit";
import Cookies from 'js-cookie'

const invoiceSlice = createSlice({
    name: 'invoice',
    initialState: {
        loading: false,
        error: null,
        data: null,
        single: null
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
        }
    }
})

export const { fetchStart, fetchInvoicesSuccess, fetchInvoiceSuccess, fetchFailed } = invoiceSlice.actions

export const fetchInvoices = () => async (dispatch) => {
    try {
        dispatch(fetchStart())
        const token = Cookies.get('token')
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