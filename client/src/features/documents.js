import { createSlice } from '@reduxjs/toolkit'
import { document_url } from '../utils/constants'
import Cookies from 'js-cookie'
const token = Cookies.get('token')
const documentSlice = createSlice({
  name: 'docs',
  initialState: {
    loading: false,
    error: null,
    data: null
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
      state.data = state.data.filter(docs => docs._id !== action.payload)
    },
    deleteDocumentSuccess: (state, action) => {
      state.loading = false
      state.data = state.data.map(docs => docs._id === action.payload ? {...docs, ...actions.payload} : docs)
    },
    actionDocumentFailed: (state,action) => {
      state.loading = false
      state.error = action.payload
    }
  },
})

export const {startLoading, fetchDocumentSuccess, editDocumentSuccess, deleteDocumentSuccess, actionDocumentFailed} = documentSlice.actions

export const generateDocument = (unitId, unitNo, unitName) => async(dispatch) => {
  try{
    const pdf = await fetch(`${document_url}/${unitId}/fetch_contract`,{
      headers:{
        Authorization: `Bearer ${token}`
      }
    })
    if(!pdf.ok){
      throw new Error(`Failed to fetch contract. Status: ${pdfResponse.status}`);
    }
    const pdfBlob = await pdf.blob();
    saveAs(pdfBlob, `UNIT_${unitNo}_${unitName}_Contract Agreement.pdf`);
  }
  catch(err){
    dispatch(actionDocumentFailed(err.message))
  }
}

export const createDocument = (fields) => async(dispatch) => {
  try{
    dispatch(startLoading())
    const docs = await fetch(`${document_url}/generate_contract`, {
      method: "POST",
      headers:{
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(fields)
    })
    if(!docs.ok){
      throw new Error("Failed to create document")
    }
    const json = await docs.json()

    await generateDocument(fields.unit_id, json.unit_no, json.name)
    dispatch(fetchDocumentSuccess(json))
  }catch(err){
    dispatch(actionDocumentFailed(err.message))
  }
}

export const fetchDocuments = () => async(dispatch) => {
  try{

  }catch(err){

  }
}

export const fetchDocument = () => async(dispatch) => {
  try{

  }catch(err){
    
  }
}

export const editDocument = () => async(dispatch) => {
  try{

  }catch(err){

  }
}

export const deleteDocument = () => async(dispatch) => {
  try{

  }catch(err){

  }
}

export default documentSlice.reducer
