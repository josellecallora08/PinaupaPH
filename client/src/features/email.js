import { createSlice } from "@reduxjs/toolkit";
import Cookies from 'js-cookie'

const emailSlice = createSlice({
    name: 'email',
    initialState: {
        loading: false,
        error: null,
        data: null,
        msg: null
    },
    reducers: {
        fetchStart: (state, action) => {
            state.loading = true
            state.error = null
            state.msg = null
        },
        sendEmailSuccess: (state, action) => {
            state.loading = true
            state.msg = action.payload
            state.error = null
        },
        sendEmailFailed: (state, action) => {
            state.loading = true
            state.error = action.payload
            state.msg = null
        }
    }
})

export const { fetchStart, sendEmailSuccess, sendEmailFailed } = emailSlice.actions

export const sendEmail = (fields) => async (dispatch) => {
    try {
        const token = Cookies.get('token')
        dispatch(fetchStart())
        const response = await fetch(`${import.meta.env.VITE_URL}/api/report/send-email`, {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(fields)
        })

        if(!response.ok){
            const json = await response.json()
            throw new Error(json.error)
        }
        const json = await response.json()
        dispatch(sendEmailSuccess(json.msg))
    } catch (err) {
        dispatch(sendEmailFailed(err.message))
    }
}