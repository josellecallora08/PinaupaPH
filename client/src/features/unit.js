import { createSlice } from '@reduxjs/toolkit'
import {  base_url } from '../utils/constants'
import Cookies from 'js-cookie'
const token = Cookies.get('token')
const unitSlice = createSlice({
  name: 'unit',
  initialState: {
    loading: false,
    error: null,
    data: null,
    single: null,
  },
  reducers: {
    startUnit: (state) => {
      state.loading = true
      state.error = null
    },
    fetchUnitSuccess: (state, action) => {
      state.loading = false
      state.data = action.payload
    },
    fetchSingleUnitSuccess: (state, action) => {
      state.loading = false
      state.single = action.payload
    },
    editUnitSuccess: (state, action) => {
      state.loading = false
      state.data = state.data.filter((unit) => unit._id !== action.payload)
    },
    deleteUnitSuccess: (state, action) => {
      state.loading = false
      state.data = state.data.map((unit) =>
        unit._id === action.payload ? { ...unit, ...action.payload } : unit,
      )
    },
    actionUnitFailed: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
  },
})

export const {
  startUnit,
  fetchUnitSuccess,
  editUnitSuccess,
  deleteUnitSuccess,
  actionUnitFailed,
} = unitSlice.actions

export const createUnit = (fields, apartmentId) => async (dispatch) => {
  try {
    dispatch(startUnit())
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
    dispatch(fetchUnits())
  } catch (err) {
    dispatch(actionUnitFailed(err.message))
  }
}

export const fetchUnits = () => async (dispatch) => {
  try {
    dispatch(startUnit())
    const response = await fetch(`${import.meta.env.VITE_URL}/api/apartment/units`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
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
      `${import.meta.env.VITE_URL}/api/apartment/${apartment_id}/units/`,
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
    dispatch(fetchUnitSuccess(json.units))
  } catch (err) {
    dispatch(actionUnitFailed(err.message))
  }
}

export const editUnit = (apartmentId, unitId) => async (dispatch) => {
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
    // const json = await response.json()
    dispatch(fetchUnits())
  } catch (err) {
    dispatch(actionUnitFailed(err.message))
  }
}

export const deleteUnit = (apartmentId, unitId) => async (dispatch) => {
  try {
    dispatch(startUnit())
    const response = await fetch(
      `${import.meta.env.VITE_URL}/api/apartment/${apartmentId}/delete_apartment_unit/${unitId}`,
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
    dispatch(fetchUnits())
  } catch (err) {
    dispatch(actionUnitFailed(err.message))
  }
}

export default unitSlice.reducer
