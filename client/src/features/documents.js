import { createSlice } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'

const documentSlice = createSlice({
  name: 'docs',
  initialState: {
    loading: false,
    error: null,
    data: null,
    msg: null,
    single: null,
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
    fetchDocumentsSuccess: (state, action) => {
      state.loading = false
      state.data = action.payload.response
    },
    fetchDocumentSuccess: (state, action) => {
      state.loading = false
      state.single = action.payload.response
    },
    insertDocumentSuccess: (state, action) => {
      return {
        ...state,
        loading: false,
        data: [...state.data, action.payload.response],
        msg: action.payload.msg,
      }
    },
    editDocumentSuccess: (state, action) => {
      state.loading = false
      state.msg = action.payload.msg
      state.data = state.data.map((docs) =>
        docs._id === action.payload.response._id
          ? { ...docs, ...action.payload.response }
          : docs,
      )
    },
    deleteDocumentSuccess: (state, action) => {
      state.loading = false
      state.msg = action.payload.msg
      state.data = state.data.filter(
        (user) => user._id !== action.payload.response._id,
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
  fetchDocumentsSuccess,
  fetchDocumentSuccess,
  editDocumentSuccess,
  insertDocumentSuccess,
  deleteDocumentSuccess,
  actionDocumentFailed,
  generateSuccess,
} = documentSlice.actions

// ? Tested
export const generateDocument = (contract_id) => async (dispatch) => {
  try {
    const token = Cookies.get('token')
    const response = await fetch(
      `${import.meta.env.VITE_URL}/api/document/generate?contract_id=${contract_id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    if (!response.ok) {
      const json = await response.json()
      dispatch(fetchFailed(json.error))
      throw new Error('Failed to download the invoice')
    }
    const blob = await response.blob()
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', 'Lease Agreement.pdf')
    document.body.appendChild(link)
    link.click()
    link.remove()
    dispatch(generateSuccess('Contract Generated'))
  } catch (err) {
    dispatch(actionDocumentFailed(err.message))
  }
}

// ? Tested
export const createDocument = (user_id) => async (dispatch) => {
  try {
    const token = Cookies.get('token')
    dispatch(startLoading())
    const response = await fetch(
      `${import.meta.env.VITE_URL}/api/document/create?user_id=${user_id}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    )

    if (!response.ok) {
      const json = await response.json()
      console.log(json)
      throw new Error(json.error)
    }
    const json = await response.json()
    console.log(json)
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
    const response = await fetch(
      `${import.meta.env.VITE_URL}/api/document/search?filter=${filter}`,
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
    dispatch(fetchDocumentsSuccess(json))
  } catch (err) {
    dispatch(actionDocumentFailed(err.message))
  }
}

export const fetchDocuments = () => async (dispatch) => {
  try {
    const token = Cookies.get('token')
    dispatch(startLoading())
    const response = await fetch(
      `${import.meta.env.VITE_URL}/api/document/list`,
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
    dispatch(fetchDocumentsSuccess(json))
  } catch (err) {
    dispatch(actionDocumentFailed(err.message))
  }
}

export const fetchDocument = (contract_id) => async (dispatch) => {
  try {
    const token = Cookies.get('token')
    dispatch(startLoading())
    const response = await fetch(
      `${import.meta.env.VITE_URL}/api/document/list/v1?contract_id=${contract_id}`,
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
    dispatch(fetchDocumentSuccess(json))
  } catch (err) {
    dispatch(actionDocumentFailed(err.message))
  }
}

export const editDocument = (contract_id) => async (dispatch) => {
  try {
    const token = Cookies.get('token')
    dispatch(startLoading())
    const response = await fetch(
      `${import.meta.env.VITE_URL}/api/documents/update?contract_id=${contract_id}`,
      {
        method: 'PATCH',
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
    dispatch(fetchDocumentSuccess(json))
  } catch (err) {
    dispatch(actionDocumentFailed(err.message))
  }
}

export const deleteDocument = (contract_id) => async (dispatch) => {
  try {
    const token = Cookies.get('token')
    dispatch(startLoading())
    const response = await fetch(
      `${import.meta.env.VITE_URL}/api/document/delete?contract_id=${contract_id}`,
      {
        method: 'DELETE',
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
    console.log('docs delete', json)
    dispatch(deleteDocumentSuccess(json))
  } catch (err) {
    dispatch(actionDocumentFailed(err.message))
  }
}

export default documentSlice.reducer
