import { createSlice } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'
import { redirect } from 'react-router-dom'

const documentSlice = createSlice({
  name: 'docs',
  initialState: {
    loading: false,
    error: null,
    data: null,
    msg: null
  },
  reducers: {
    startLoading: (state) => {
      state.loading = true
      state.error = null
    },
    generateSuccess: (state, action) => {
      state.loading = false
      state.msg = action.payload
    },
    fetchDocumentSuccess: (state, action) => {
      state.loading = false
      state.data = action.payload
    },
    insertDocumentSuccess: (state, action) => {
      state.loading= false
      state.data = [...state.data, ...action.payload.response]
      state.msg = action.payload.msg
    },
    editDocumentSuccess: (state, action) => {
      state.loading = false
      state.data = state.data.filter((docs) => docs._id !== action.payload)
    },
    deleteDocumentSuccess: (state, action) => {
      state.loading = false
      state.data = state.data.map((docs) =>
        docs._id === action.payload ? { ...docs, ...actions.payload } : docs,
      )
    },
    actionDocumentFailed: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
  },
})

export const {
  startLoading,
  fetchDocumentSuccess,
  editDocumentSuccess,
  insertDocumentSuccess,
  deleteDocumentSuccess,
  actionDocumentFailed,
  generateSuccess
} = documentSlice.actions

// ? Tested 
export const generateDocument =
  (contract_id) => async (dispatch) => {
    try {
      const token = Cookies.get('token')
      const response = await fetch(`${import.meta.env.VITE_URL}/api/documents/generate?contract_id=${contract_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
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
    dispatch(generateSuccess("Contract Generated"))
    } catch (err) {
      dispatch(actionDocumentFailed(err.message))
    }
  }
  
// ? Tested 
export const createDocument = (user_id) => async (dispatch) => {
  try {
    const token = Cookies.get('token')
    dispatch(startLoading())
    const response = await fetch(`${import.meta.env.VITE_URL}api/documents/create?user_id=${user_id}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(fields),
    })
    if (!response.ok) {
      const json = await response.json()
      throw new Error(json.error)
    }
    const json = await response.json()

    // dispatch(generateDocument(fields.unit_id, json.unit_no, json.name))
    dispatch(insertDocumentSuccess(json))
  } catch (err) {
    dispatch(actionDocumentFailed(err.message))
  }
}

export const searchContract = (filter) => async (dispatch) => {
  try {
    const token = Cookies.get('token')
    dispatch(startLoading())
    const response = await fetch(`${import.meta.env.VITE_URL}api/documents/search?filter=${filter}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    if (!response.ok) {
      const json = await response.json()
      throw new Error(json.error)
    }
    const json = await response.json()
    dispatch(fetchDocumentSuccess(json))
  } catch (err) {
    dispatch(actionDocumentFailed(err.message))
  }
}

export const fetchDocuments = () => async (dispatch) => {
  try {
    const token = Cookies.get('token')
    dispatch(startLoading())
    const response = await fetch(`${import.meta.env.VITE_URL}api/documents/list`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    if (!response.ok) {
      const json = await response.json()
      throw new Error(json.error)
    }
    const json = await response.json()
    dispatch(fetchDocumentSuccess(json))
  } catch (err) {
    dispatch(actionDocumentFailed(err.message))
  }
}

export const fetchDocument = (contract_id) => async (dispatch) => {
  try {
    const token = Cookies.get('token')
    dispatch(startLoading())
    const response = await fetch(`${import.meta.env.VITE_URL}api/documents/list/v1?contract_id=${contract_id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    if (!response.ok) {
      const json = await response.json()
      throw new Error(json.error)
    }
    const json = await response.json()
    dispatch(fetchDocumentSuccess(json))
  } catch (err) {
    dispatch(actionDocumentFailed(err.message))
  }
}

export const editDocument = (contract_id) => async (dispatch) => {
  try {
    const token = Cookies.get('token')
    dispatch(startLoading())
    const response = await fetch(`${import.meta.env.VITE_URL}api/documents/update?contract_id=${contract_id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    if (!response.ok) {
      const json = await response.json()
      throw new Error(json.error)
    }
    const json = await response.json()
    dispatch(fetchDocumentSuccess(json))
  } catch (err) {
    dispatch(actionDocumentFailed(err.message))
  }
}

export const deleteDocument = (contract_id) => async (dispatch) => {
  try {
    const token = Cookies.get('token')
    dispatch(startLoading())
    const response = await fetch(`${import.meta.env.VITE_URL}api/documents/delete?contract_id=${contract_id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    if (!response.ok) {
      const json = await response.json()
      throw new Error(json.error)
    }
    const json = await response.json()
    dispatch(deleteDocumentSuccess(json))
  } catch (err) {
    dispatch(actionDocumentFailed(err.message))
  }
}

export default documentSlice.reducer
