import { createSlice } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'

const announcementSlice = createSlice({
    name: 'announcement',
    initialState: {
        loading: false,
        error: null,
        msg: null,
        data: null,
        single: null
    },
    reducers: {
        fetchAnnouncementStart: (state, action) => {
            state.loading = true
            state.error = null
            state.msg = null
        },
        fetchAnnouncementsSuccess: (state, action) => {
            state.loading = false
            state.data = action.payload
        },
        fetchAnnouncementSuccess: (state, action) => {
            state.loading = false
            state.single = action.payload.response
            state.msg = action.payload.msg
        },
        insertAnnouncementSuccess: (state, action) => {
            state.loading = false
            state.data = [...state.data, action.payload.response]
            state.msg = action.payload.msg
        },
        editAnnouncementSuccess: (state, action) => {
            state.loading = false
            state.data = state.data.map((val, key) =>
                val._id === action.payload.response._id ? action.payload.response : val
            )
            state.msg = action.payload.msg
        },
        deleteAnnouncementSuccess: (state, action) => {
            state.loading = false
            state.data = state.data.filter((item) => item._id !== action.payload.response._id)
            state.msg = action.payload.msg
        },
        fetchAnnouncementFailed: (state, action) => {
            state.loading = false
            state.msg = null
            state.error = action.payload
        }
    }
})

export const { fetchAnnouncementStart, fetchAnnouncementsSuccess, insertAnnouncementSuccess, fetchAnnouncementSuccess, editAnnouncementSuccess, deleteAnnouncementSuccess, fetchAnnouncementFailed } = announcementSlice.actions

export const searchAnnouncement = (filter) => async (dispatch) => {
    try {
        dispatch(fetchAnnouncementStart())
        const token = Cookies.get('token')
        const response = await fetch(`${import.meta.env.VITE_URL}/api/announcement/search?filter=${filter}`, {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
        if (!response.ok) {
            const json = await response.json()
            throw new Error(json.error)
        }

        const json = await response.json()
        dispatch(fetchAnnouncementsSuccess(json.response))
    } catch (err) {
        dispatch(fetchAnnouncementFailed(err.message))
    }
}

export const createAnnouncement = (fields) => async (dispatch) => {
    try {
        dispatch(fetchAnnouncementStart())
        const token = Cookies.get('token')
        const response = await fetch(`${import.meta.env.VITE_URL}/api/announcement/`, {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(fields)
        })
        if (!response.ok) {
            const json = await response.json()
            console.log(json)
            throw new Error(json.error)
        }

        const json = await response.json()
        dispatch(insertAnnouncementSuccess(json))
    } catch (err) {
        console.log(err.message)
        dispatch(fetchAnnouncementFailed(err.message))
    }
}

export const recentAnnouncement = () => async (dispatch) => {
    try {
        dispatch(fetchAnnouncementStart())
        const token = Cookies.get('token')
        const response = await fetch(`${import.meta.env.VITE_URL}/api/announcement/recent`, {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
        if (!response.ok) {
            const json = await response.json()
            console.log(json)
            throw new Error(json.error)
        }
        const json = await response.json()
        console.log(json)
        dispatch(fetchAnnouncementSuccess(json))
    } catch (err) {
        dispatch(fetchAnnouncementFailed(err.message))
    }
}
export const fetchAnnouncements = () => async (dispatch) => {
    try {
        dispatch(fetchAnnouncementStart())
        const token = Cookies.get('token')
        const response = await fetch(`${import.meta.env.VITE_URL}/api/announcement/list`, {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
        if (!response.ok) {
            const json = await response.json()
            console.log(json)
            throw new Error(json.error)
        }
        const json = await response.json()
        dispatch(fetchAnnouncementsSuccess(json.response))
    } catch (err) {
        dispatch(fetchAnnouncementFailed(err.message))
    }
}

export const fetchAnnouncement = (announcement_id) => async (dispatch) => {
    try {
        dispatch(fetchAnnouncementStart())
        const token = Cookies.get('token')
        const response = await fetch(`${import.meta.env.VITE_URL}/api/announcement/list/v1?announcement_id=${announcement_id}`, {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
        if (!response.ok) {
            const json = await response.json()
            throw new Error(json.error)
        }

        const json = await response.json()
        dispatch(fetchAnnouncementSuccess(json))
    } catch (err) {
        dispatch(fetchAnnouncementFailed(err.message))
    }
}

export const editAnnouncement = (fields, announcement_id) => async (dispatch) => {
    try {
        dispatch(fetchAnnouncementStart())
        const token = Cookies.get('token')
        const response = await fetch(`${import.meta.env.VITE_URL}/api/announcement/edit?announcement_id=${announcement_id}`, {
            method: "PATCH",
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(fields)
        })
        if (!response.ok) {
            const json = await response.json()
            throw new Error(json.error)
        }

        const json = await response.json()
        console.log(json)
        dispatch(editAnnouncementSuccess(json))
    } catch (err) {
        dispatch(fetchAnnouncementFailed(err.message))
    }
}

export const deleteAnnouncement = (announcement_id) => async (dispatch) => {
    try {
        dispatch(fetchAnnouncementStart())
        const token = Cookies.get('token')
        const response = await fetch(`${import.meta.env.VITE_URL}/api/announcement/delete?announcement_id=${announcement_id}`, {
            method: "DELETE",
            headers: {
                'Authorization': `Bearer ${token}`
            },
        })
        if (!response.ok) {
            const json = await response.json()
            throw new Error(json.error)
        }

        const json = await response.json()
        dispatch(deleteAnnouncementSuccess(json))
    } catch (err) {
        dispatch(fetchAnnouncementFailed(err.message))
    }
}


export default announcementSlice.reducer