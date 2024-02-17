import { createSlice } from '@reduxjs/toolkit'

const apartmentSlice = createSlice({
  name: 'apartment',
  initialState: {
    loading: false,
    error: null,
    data: null
  },
  reducers: {
    apartmentStart: (state) => {
      state.loading = true
      state.error = null
    },
    fetchApartmentSuccess: (state, action) => {
      state.loading = false
      state.data = action.payload
    },
    editApartmentSuccess: (state, action) => {
      state.loading = false
      state.data = state.data.map(item => item._id === action.payload._id ? {...item, ...action.payload} : item)
    },
    deleteApartmentSuccess: (state, action) => {
      state.loading = false
      state.data = state.data.filter((item) => item._id !== action.payload._id)
    },
    actionApartmentFailed: (state, action) => {
      state.loading = false
      state.error = action.payload
    }
  },
})

export const { apartmentStart, fetchApartmentSuccess, editApartmentSuccess, deleteApartmentSuccess, actionApartmentFailed } = apartmentSlice.actions

export const createApartment = () => async(dispatch) => {
  try{

  }catch(err){

  }
}

export const fetchApartments = () => async(dispatch) => {
  try{

  }catch(err){

  }
}

export const fetchApartment = () => async(dispatch) => {
  try{

  }catch(err){
    
  }
}

export const editApartment = () => async(dispatch) => {
  try{

  }catch(err){

  }
}

export const deleteApartment = () => async(dispatch) => {
  try{

  }catch(err){

  }
}

export default apartmentSlice.reducer
