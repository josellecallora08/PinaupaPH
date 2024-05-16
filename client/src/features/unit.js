import { createSlice } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'
const token = Cookies.get('token')
const unitSlice = createSlice({
  name: 'unit',
  initialState: {
    loading: false,
    error: null,
    data: null,
    single: null,
    msg: null,
  },
  reducers: {
    startUnit: (state) => {
      state.loading = true
      state.error = null
    },
    fetchUnitSuccess: (state, action) => {
      state.loading = false
      state.data = action.payload
      // state.msg= action.payload.msg
    },
    fetchSingleUnitSuccess: (state, action) => {
      state.loading = false
      state.single = action.payload
    },
    insertUnitSuccess: (state, action) => {
      state.loading = false
      state.data = [...state.data, action.payload.response]
      state.msg = action.payload.msg
    },
    editUnitSuccess: (state, action) => {
      state.loading = false 
      state.data = state.data.map((unit) =>
        unit._id === action.payload ? action.payload.response : unit,
      )
      state.msg = action.payload.msg
    },
    deleteUnitSuccess: (state, action) => {
      state.loading = false
      state.data = state.data.filter((unit) => unit._id !== action.payload.response._id)
      state.msg = action.payload.msg
    },
    actionUnitFailed: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
  },
})

export const {
  startUnit,
  insertUnitSuccess,
  fetchUnitSuccess,
  editUnitSuccess,
  deleteUnitSuccess,
  actionUnitFailed,
} = unitSlice.actions

export const createUnit = (fields, apartmentId) => async (dispatch) => {
  try {
    dispatch(startUnit())
    const token = Cookies.get('token')

    const response = await fetch(
      `${import.meta.env.VITE_URL}/api/apartment/${apartmentId}/create_apartment_unit`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(fields),
      },
    )

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error)
    }
    const json = await response.json()
    console.log(json)
    dispatch(fetchUnitsApartment(apartmentId))
  } catch (err) {
    dispatch(actionUnitFailed(err.message))
  }
}

export const fetchUnits = () => async (dispatch) => {
  try {
    dispatch(startUnit())
    const token = Cookies.get('token')

    const response = await fetch(
      `${import.meta.env.VITE_URL}/api/apartment/units`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error)
    }
    const json = await response.json()
    dispatch(fetchUnitSuccess(json))
  } catch (err) {
    dispatch(actionUnitFailed(err.message))
  }
}

export const fetchUnit = (apartmentId, unitId) => async (dispatch) => {
  //Fix this later on
  try {
    dispatch(startUnit())
    const response = await fetch(
      `${import.meta.env.VITE_URL}/api/apartment/${apartmentId}/units/${unitId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error)
    }
    const json = await response.json()
    dispatch(fetchUnitSuccess(json))
  } catch (err) {
    dispatch(actionUnitFailed(err.message))
  }
}

export const fetchUnitsApartment = (apartment_id) => async (dispatch) => {
  try {
    const token = Cookies.get('token')
    dispatch(startUnit())
    const response = await fetch(
      `${import.meta.env.VITE_URL}/api/apartment/${apartment_id}/units`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    if (!response.ok) {
      const error = await response.json()
      console.log(error)
      throw new Error(error.error)
    }
    const json = await response.json()
    dispatch(fetchUnitSuccess(json.units))
  } catch (err) {
    dispatch(actionUnitFailed(err.message))
  }
}

export const editUnit = (fields, apartmentId, unitId) => async (dispatch) => {
  try {
    const token = Cookies.get('token')
    dispatch(startUnit())
    const response = await fetch(
      `${import.meta.env.VITE_URL}/api/apartment/${apartmentId}/edit_apartment_unit/${unitId}`,
      {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(fields),
      },
    )
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error)
    }
    const json = await response.json()
    console.log(json)
    dispatch(fetchUnitsApartment(apartmentId))
  } catch (err) {
    dispatch(actionUnitFailed(err.message))
  }
}

export const deleteUnit = (apartmentId, unitId) => async (dispatch) => {
  try {
    const token = Cookies.get('token')
    dispatch(startUnit())
    const response = await fetch(
      `${import.meta.env.VITE_URL}/api/apartment/${apartmentId}/delete_apartment_unit?unit_id=${unitId}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error)
    }
    const json = await response.json()
    console.log(json)
    dispatch(deleteUnitSuccess(json))
  } catch (err) {
    dispatch(actionUnitFailed(err.message))
  }
}

export default unitSlice.reducer
