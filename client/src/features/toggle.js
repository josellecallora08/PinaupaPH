import { createSlice } from "@reduxjs/toolkit";

const toggleSlice = createSlice({
    name: "menu",
    initialState: {
        sidebar: false
    },
    reducers: {
        toggleMenu: (state) => {
            state.sidebar = !state.sidebar
        }
    }
})

export const {toggleMenu} = toggleSlice.actions

export default toggleSlice.reducer