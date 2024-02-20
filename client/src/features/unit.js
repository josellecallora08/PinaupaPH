import { createSlice } from '@reduxjs/toolkit'
import { apartment_url } from '../utils/constants'
import Cookies from 'js-cookie'
const token = Cookies.get('token')
const unitSlice = createSlice({
  name: 'unit',
  initialState: {
    loading: false,
    error: null,
    data: null,
  },
  reducers: {
    startUnit: (state) => {
      state.loading = true
      state.error = null
    },
    fetchUnitSuccess: (state, action) => {
      state.loading = false
      state.data = action.payload.units
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
    const unit = await fetch(
      `${apartment_url}/${apartmentId}/create_apartment_unit`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(fields),
      },
    )

    if (!unit.ok) {
      throw new Error('Failed to add unit...')
    }
    const json = await unit.json()
    dispatch(fetchUnitSuccess(json))
  } catch (err) {
    dispatch(actionUnitFailed(err.message))
  }
}

export const fetchUnits = (apartmentId) => async (dispatch) => {
  try {
    dispatch(startUnit())
    const unit = await fetch(`${apartment_url}/${apartmentId}/units`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    if (!unit.ok) {
      throw new Error('Failed to add unit...')
    }
    const json = await unit.json()
    dispatch(fetchUnitSuccess(json))
  } catch (err) {
    dispatch(actionUnitFailed(err.message))
  }
}

export const fetchUnit = (apartmentId, unitId) => async (dispatch) => {
  //Fix this later on
  try {
    dispatch(startUnit())
    const unit = await fetch(
      `${apartment_url}/${apartmentId}/units/${unitId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    if (!unit.ok) {
      throw new Error('Failed to add unit...')
    }
    const json = await unit.json()
    dispatch(fetchUnitSuccess(json))
  } catch (err) {
    dispatch(actionUnitFailed(err.message))
  }
}

export const editUnit = (apartmentId, unitId) => async (dispatch) => {
  try {
    dispatch(startUnit())
    const unit = await fetch(
      `${apartment_url}/${apartmentId}/edit_apartment_unit/${unitId}`,
      {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(fields),
      },
    )
    if (!unit.ok) {
      throw new Error('Failed to add unit...')
    }
    dispatch(fetchUnitSuccess(unitId))
  } catch (err) {
    dispatch(actionUnitFailed(err.message))
  }
}

export const deleteUnit = (apartmentId, unitId) => async (dispatch) => {
  try {
    dispatch(startUnit())
    const unit = await fetch(
      `${apartment_url}/${apartmentId}/delete_apartment_unit/${unitId}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    if (!unit.ok) {
      throw new Error('Failed to add unit...')
    }
    dispatch(deleteUnitSuccess(unitId))
  } catch (err) {
    dispatch(actionUnitFailed(err.message))
  }
}

export default unitSlice.reducer
