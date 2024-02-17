import { createSlice } from '@reduxjs/toolkit'

const unitSlice = createSlice({
  name: 'unit',
  initialState: {
    list: null
  },
  reducers: {
    create_unit: (state,action) => {},
    edit_unit: (state,action) => {},
    delete_unit: (state, action) => {},
  },
})

export const { create_unit, edit_unit, delete_unit } = unitSlice.actions

export const createUnit = () => async(dispatch) => {
  try{

  }catch(err){

  }
}

export const fetchUnits = () => async(dispatch) => {
  try{

  }catch(err){

  }
}

export const fetchUnit = () => async(dispatch) => {
  try{

  }catch(err){
    
  }
}

export const editUnit = () => async(dispatch) => {
  try{

  }catch(err){

  }
}

export const deleteUnit = () => async(dispatch) => {
  try{

  }catch(err){

  }
}

export default unitSlice.reducer
