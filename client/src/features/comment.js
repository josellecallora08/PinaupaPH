import { createSlice } from "@reduxjs/toolkit";

const commentSlice = createSlice({
    name:'comment',
    initialState:{
        loading: false,
        error: false,
        data: null
    },
    reducers:{}
})

export  const {} = commentSlice.actions

export default commentSlice.reducer