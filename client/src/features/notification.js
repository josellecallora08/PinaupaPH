import { createSlice } from "@reduxjs/toolkit";
import Cookies from 'js-cookie'
const notifSlice = createSlice({
    name: 'notif',
    initialState: {
        loading: false,
        error: null,
        msg: null,
        data: null,
        single: null
    },
    reducers: {
        fetchNotifStart: (state, action) => {
            state.loading = true
            state.error = null
            state.msg = null
        },
        fetchNotifsSuccess: (state, action) => {
            state.loading = true
            state.data = action.payload
        },
        fetchNotifSuccess: (state, action) => {
            state.loading = true
            state.data = action.payload
        },
        editNotifSuccess: (state, action) => {
            state.loading = true
            state.data = state.data.map((notif) => notif._id === action.payload._id ? action.payload  : notif)
        },
        deleteNotifSuccess: (state, action) => {
            state.loading = true
            state.data = state.data.filter((notif) => notif._id !== action.payload._id)
        },
        fetchNotifFailed: (state, action) => {
            state.loading = true
            state.error = action.payload
        }
    }
})

export const { fetchNotifStart, fetchNotifsSuccess, fetchNotifSuccess, editNotifSuccess, deleteNotifSuccess, fetchNotifFailed } = notifSlice.actions

export const readNotification = (notif_id) => async (dispatch) => {
    try {
        const token = Cookies.get('token')
        dispatch(fetchNotifStart())
        const response = await fetch(`${import.meta.env.VITE_URL}/api/notification/update?notif_id=${notif_id}`, {
            method: "PATCH",
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        if (!response.ok) {
            const json = await response.json()
            console.log(json.error)
            throw new Error(json.error)
        }
        const json = await response.json()
        dispatch(editNotifSuccess(json.response))
    } catch (err) {
        dispatch(fetchNotifFailed(err.message))

    }
}
export const fetchNotifications = () => async (dispatch) => {
    try {
        const token = Cookies.get('token')
        dispatch(fetchNotifStart())
        const response = await fetch(`${import.meta.env.VITE_URL}/api/notification/list`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        if (!response.ok) {
            const json = await response.json()
            console.log(json.error)
            throw new Error(json.error)
        }
        const json = await response.json()
        dispatch(fetchNotifsSuccess(json.response))
    } catch (err) {
        dispatch(fetchNotifFailed(err.message))
    }
}

export const fetchNotification = () => async (dispatch) => {
    try {
        const token = Cookies.get('token')
        dispatch(fetchNotifStart())
        const response = await fetch(`${import.meta.env.VITE_URL}/api/notification/list/v1`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        if (!response.ok) {
            const json = await response.json()
            console.log(json.error)
            throw new Error(json.error)
        }
        const json = await response.json()
        dispatch(fetchNotifsSuccess(json.response))
    } catch (err) {
        dispatch(fetchNotifFailed(err.message))
    }
}

export const deleteNotification = (notif_id) => async (dispatch) => {
    try {
        const token = Cookies.get('token')
        dispatch(fetchNotifStart())
        const response = await fetch(`${import.meta.env.VITE_URL}/api/notification/delete?notif_id=${notif_id}`, {
            method: "DELETE",
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        if (!response.ok) {
            const json = await response.json()
            console.log(json.error)
            throw new Error(json.error)
        }
        const json = await response.json()
        dispatch(fetchNotifsSuccess(json.response))
    } catch (err) {
        dispatch(fetchNotifFailed(err.message))
    }
}

export default notifSlice.reducer