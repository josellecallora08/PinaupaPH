import { createSlice } from '@reduxjs/toolkit'

const cctvSlice = createSlice({
  name: 'cctv',
  initialState: {
    list: null
  },
  reducers: {
    createCCTV: (state, action) => {

    },
    fetchCCTV: (state, action) => {

    }
  },
})

export const createCCTV = () => async(dispatch) => {
  try{

  }catch(err){

  }
}

export const fetchCCTVs = () => async(dispatch) => {
  try{

  }catch(err){

  }
}

export const fetchCCTV = () => async(dispatch) => {
  try{

  }catch(err){
    
  }
}

export const editCCTV = () => async(dispatch) => {
  try{

  }catch(err){

  }
}

export const deleteCCTV = () => async(dispatch) => {
  try{

  }catch(err){

  }
}

export default cctvSlice.reducer
