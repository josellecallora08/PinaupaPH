import { createSlice } from "@reduxjs/toolkit";

const unitSlice = createSlice({
    name: 'unit',
    initialState: [],
    reducers: {
        create_unit: (state) => {

        },
        edit_unit: (state) => {

        },
        delete_unit: (state) => {

        }
    }
})


export const {create_unit, edit_unit, delete_unit} = unitSlice.actions
export default unitSlice.reducer