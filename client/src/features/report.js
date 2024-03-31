import { createSlice } from "@reduxjs/toolkit";

const reportSlice = createSlice({
    name: 'report',
    initialState: {
        loading: false,
        error: null,
        data: null
    },
    reducers:{}
})

export const {} = reportSlice.actions

export default reportSlice.reducer