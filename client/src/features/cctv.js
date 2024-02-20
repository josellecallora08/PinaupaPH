import { createSlice } from '@reduxjs/toolkit'
import { cctv_url } from '../utils/constants'
import Cookies from 'js-cookie'

const token = Cookies.get('token')
const cctvSlice = createSlice({
  name: 'cctv',
  initialState: {
    loading: false,
    error: null,
    data: null,
  },
  reducers: {
    startLoading: (state) => {
      state.loading = true
      state.error = null
    },
    fetchCCTVSuccess: (state, action) => {
      state.loading = false
      state.data = action.payload
    },
    editCCTVSuccess: (state, action) => {
      state.loading = false
      state.data = state.data.filter((item) => item._id !== action.payload)
    },
    deleteCCTVSuccess: (state, action) => {
      state.loading = false
      state.data = state.data.map((item) =>
        item._id === action.payload ? { ...item, ...action.payload } : item,
      )
    },
    actionCCTVFailed: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
  },
})

export const {
  startLoading,
  fetchCCTVSuccess,
  editCCTVSuccess,
  deleteCCTVSuccess,
  actionCCTVFailed,
} = cctvSlice.actions

export const createCCTV = (field, apartmentId) => async (dispatch) => {
  try {
    dispatch(startLoading())
    const cctv = await fetch(`${cctv_url}/${apartmentId}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(field),
    })
    if (!cctv.ok) {
      throw new Error('Failed to add CCTV...')
    }
    const json = await cctv.json()
    dispatch(fetchCCTVSuccess(json))
  } catch (err) {
    dispatch(actionCCTVFailed(err.message))
  }
}

export const fetchCCTVs = () => async (dispatch) => {
  try {
    dispatch(startLoading())
    const cctv = await fetch(`${cctv_url}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    if (!cctv.ok) {
      throw new Error('Failed to add CCTV...')
    }
    const json = await cctv.json()
    dispatch(fetchCCTVSuccess(json))
  } catch (err) {
    dispatch(actionCCTVFailed(err.message))
  }
}

export const fetchCCTV = (cctvId) => async (dispatch) => {
  try {
    dispatch(startLoading())
    const cctv = await fetch(`${cctv_url}/${cctvId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    if (!cctv.ok) {
      throw new Error('Failed to add CCTV...')
    }
    const json = await cctv.json()
    dispatch(fetchCCTVSuccess(json))
  } catch (err) {
    dispatch(actionCCTVFailed(err.message))
  }
}

export const editCCTV = (fields, cctvId) => async (dispatch) => {
  try {
    dispatch(startLoading())
    const cctv = await fetch(`${cctv_url}/${cctvId}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(fields),
    })
    if (!cctv.ok) {
      throw new Error('Failed to add CCTV...')
    }
    // const json = await cctv.json()
    dispatch(editCCTVSuccess(cctvId))
  } catch (err) {
    dispatch(actionCCTVFailed(err.message))
  }
}

export const deleteCCTV = (apartmentId, cctvId) => async (dispatch) => {
  try {
    dispatch(startLoading())
    const cctv = await fetch(
      `${cctv_url}/${apartmentId}/delete_cctv/${cctvId}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    if (!cctv.ok) {
      throw new Error('Failed to add CCTV...')
    }
    // const json = await cctv.json()
    dispatch(deleteCCTVSuccess(cctvId))
  } catch (err) {
    dispatch(actionCCTVFailed(err.message))
  }
}

export default cctvSlice.reducer
