import { createSlice } from "@reduxjs/toolkit";
import Cookies from 'js-cookie'

const requirementSlice = createSlice({
    name: 'req',
    initialState: {
        loading: false,
        error: null,
        msg: null,
        data: null,
        single: null
    },
    reducers: {
        resetStatus: (state, action) => {
            state.msg = null
            state.error = null
        },
        startAction: (state, action) => {
            state.loading = true
            state.msg = null
            state.error = null
        },
        fetchSuccessRequirements: (state, action) => {
            state.loading = true
            state.data = action.payload
        },
        fetchSuccessRequirement: (state, action) => {
            state.loading = true
            state.single = action.payload
        },
        insertRequirement: (state, action) => {
            state.loading = true
            state.data = [...state.data, ...action.payload.response]
            state.msg = action.payload.msg
        },
        deleteRequirement: (state, action) => {
            state.loading = true
            state.data = state.data.filter(item => item.data._id !== action.payload.response._id)
            state.msg = action.payload.msg
        },
        editRequirement: (state, action) => {
            state.loading = true
            state.data = state.data.map(item => item.data._id !== action.payload.response._id ? item : action.payload.response)
            state.msg = action.payload.msg
        },
        actionFailed: (state, action) => {
            state.loading = true
            state.error = action.payload
            state.msg = null
        }
    }
})

export const { startAction, insertRequirement, fetchSuccessRequirement, fetchSuccessRequirements, resetStatus, deleteRequirement, editRequirement, actionFailed } = requirementSlice.actions


export const uploadRequirements = (user_id, requirements) => async (dispatch) => {
    try {

        const token = Cookies.get('token')
        const formData = new FormData();
        console.log(requirements)
        requirements.forEach(req => {
            formData.append('fileNames', req.name);
            formData.append('requirements', req.file);
        });


        console.log(formData)
        const response = await fetch(
            `${import.meta.env.VITE_URL}/api/document/documents?user_id=${user_id}`,
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData
            },
        )

        if (!response.ok) {
            const json = await response.json()
            console.log(json)
            throw new Error(json.error)
        }

        const json = await response.json()
        console.log(json)
        dispatch(insertRequirement(json))
    } catch (err) {
        dispatch(actionFailed(err.message))
    }
}

export const fetchRequirements = (user_id) => async (dispatch) => {
    try {
        const token = Cookies.get('token')
        const response = await fetch(`${import.meta.env.VITE_URL}/api/document/documents/list?user_id=${user_id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        if (!response.ok) {
            const json = await response.json()
            console.log(json)
            throw new Error(json.error)
        }

        const json = await response.json()
        console.log(json)
        dispatch(fetchSuccessRequirements(json.response))
    } catch (err) {
        dispatch(actionFailed(err.message))
    }
}


export default requirementSlice.reducer