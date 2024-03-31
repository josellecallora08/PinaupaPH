import {createSlice} from '@reduxjs/toolkit'

const householdSlice = createSlice({
    name:'household',
    initialState:{
        loading: false,
        error: null,
        data: null
    },
    reducers:{}
})

export const {} = householdSlice.actions

export default householdSlice.reducer