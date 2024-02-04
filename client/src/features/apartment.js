import { createSlice } from '@reduxjs/toolkit'

const apartmentSlice = createSlice({
  name: 'apartment',
  initialState: [],
  reducers: {
    // create_apartment: (state, action) => {

    // },
    edit_apartment: (state, action) => {
      const { _id } = action.payload
    },
    delete_apartment: (state, action) => {
      return state.filter((item, index) => {
        item._id !== action.payload._id
      })
    },
  },
})

export const {
  create_apartment,
  read_apartment,
  edit_apartment,
  delete_apartment,
} = apartmentSlice.actions

export default apartmentSlice.reducer
