import { createSlice } from '@reduxjs/toolkit'

const menuSlice = createSlice({
  name: 'toggle',
  initialState: {
    sidebar: false,
    profile: false,
    doc_dropdown: false
  },
  reducers: {
    toggleSidebar: (state) => {
      state.sidebar = !state.sidebar
      if(state.doc_dropdown == true){
        state.doc_dropdown = !state.doc_dropdown
      }
    },
    toggleProfile: (state) => {
      state.profile = !state.profile
    },
    toggleCloseProfile :(state) => {
      state.profile = false
    },
    toggleDocs: (state) => {
      state.doc_dropdown = !state.doc_dropdown
      if(state.sidebar == false){
        state.sidebar = !state.sidebar
      }
    }
  },
})

export const { toggleSidebar,toggleCloseProfile, toggleProfile, toggleDocs } = menuSlice.actions

export default menuSlice.reducer
