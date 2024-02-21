import {createSlice} from '@reduxjs/toolkit'

const menuSlice = createSlice({
    name: 'toggle',
    initialState: {
        sidebar: false,
        profile: false,
    },
    reducers: {
        toggleSidebar: (state) => {
            state.sidebar = !state.sidebar
        },
        toggleProfile: (state) => {
            state.profile = !state.profile
        }
    }
})

export const {toggleSidebar, toggleProfile} = menuSlice.actions

export default menuSlice.reducer