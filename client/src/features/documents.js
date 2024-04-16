import { createSlice } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'
import { saveAs } from 'file-saver';

const documentSlice = createSlice({
  name: 'docs',
  initialState: {
    loading: false,
    error: null,
    data: null,
  },
  reducers: {
    startLoading: (state) => {
      state.loading = true
      state.error = null
    },
    fetchDocumentSuccess: (state, action) => {
      state.loading = false
      state.data = action.payload
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
  deleteDocumentSuccess,
  actionDocumentFailed,
} = documentSlice.actions

// ? Tested 
export const generateDocument =
  (userId, unitId, fields,unitNo, userName) => async (dispatch) => {
    try {
      const token = Cookies.get('token')
      const pdf = await fetch(`${import.meta.env.VITE_URL}/api/documents/${unitId}/${userId}/fetch_contract`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if (!pdf.ok) {
        throw new Error(
          `Failed to fetch contract. Status: ${pdfResponse.status}`,
        )
      }
      const pdfBlob = await pdf.blob()
      saveAs(pdfBlob, `UNIT_${unitNo}_${userName}_Contract Agreement.pdf`)

    } catch (err) {
      dispatch(actionDocumentFailed(err.message))
    }
  }
  
// ? Tested 
export const createDocument = (userId, unitId, fields) => async (dispatch) => {
  try {
    const token = Cookies.get('token')
    dispatch(startLoading())
    const docs = await fetch(`${import.meta.env.VITE_URL}api/documents/${unitId}/${userId}/generate_contract`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(fields),
    })
    if (!docs.ok) {
      throw new Error('Failed to create document')
    }
    const json = await docs.json()

    dispatch(generateDocument(fields.unit_id, json.unit_no, json.name))
    dispatch(fetchDocumentSuccess(json))
  } catch (err) {
    dispatch(actionDocumentFailed(err.message))
  }
}

export const fetchDocuments = () => async (dispatch) => {
  try {
  } catch (err) {}
}

export const fetchDocument = () => async (dispatch) => {
  try {
  } catch (err) {}
}

export const editDocument = () => async (dispatch) => {
  try {
  } catch (err) {}
}

export const deleteDocument = () => async (dispatch) => {
  try {
  } catch (err) {}
}

export default documentSlice.reducer
