import { createSlice } from '@reduxjs/toolkit'
import { apartment_url } from '../utils/constants'
const apartmentSlice = createSlice({
  name: 'apartment',
  initialState: {
    loading: false,
    error: null,
    data: null,
  },
  reducers: {
    apartmentStart: (state) => {
      state.loading = true
      state.error = null
    },
    fetchApartmentSuccess: (state, action) => {
      state.loading = false
      state.data = action.payload
    },
    editApartmentSuccess: (state, action) => {
      state.loading = false
      state.data = state.data.map((item) =>
        item._id === action.payload._id ? { ...item, ...action.payload } : item,
      )
    },
    deleteApartmentSuccess: (state, action) => {
      state.loading = false
      state.data = state.data.filter((item) => item._id !== action.payload._id)
    },
    actionApartmentFailed: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
  },
})

export const {
  apartmentStart,
  fetchApartmentSuccess,
  editApartmentSuccess,
  deleteApartmentSuccess,
  actionApartmentFailed,
} = apartmentSlice.actions

export const createApartment = (fields) => async (dispatch) => {
  try {
    dispatch(apartmentStart())
    const apartment = await fetch(`${apartment_url}/create_apartment`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-type': 'application/json',
      },
      body: JSON.stringify(fields),
    })

    if (!apartment.ok) {
      throw new Error('Failed to create apartment')
    }
    const json = await apartment.json()
    dispatch(fetchApartmentSuccess(json))
  } catch (err) {
    dispatch(actionApartmentFailed(err.message))
  }
}

export const fetchApartments = () => async (dispatch) => {
  try {
    dispatch(apartmentStart())
    const apartment = await fetch(`${apartment_url}/building`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!apartment.ok) {
      throw new Error('Failed to create apartment')
    }
    const json = await apartment.json()
    dispatch(fetchApartmentSuccess(json))
  } catch (err) {
    dispatch(actionApartmentFailed(err.message))
  }
}

export const fetchApartment = (apartmentId) => async (dispatch) => {
  try {
    dispatch(apartmentStart())
    const apartment = await fetch(`${apartment_url}/building/${apartmentId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!apartment.ok) {
      throw new Error('Failed to create apartment')
    }
    const json = await apartment.json()
    dispatch(fetchApartmentSuccess(json))
  } catch (err) {
    dispatch(actionApartmentFailed(err.message))
  }
}

export const editApartment = (fields, apartmentId) => async (dispatch) => {
  try {
    dispatch(apartmentStart())
    const apartment = await fetch(
      `${apartment_url}/${apartmentId}/edit_apartment`,
      {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(fields),
      },
    )

    if (!apartment.ok) {
      throw new Error('Failed to create apartment')
    }
    const json = await apartment.json()
    dispatch(editApartmentSuccess(json))
  } catch (err) {
    dispatch(actionApartmentFailed(err.message))
  }
}

export const deleteApartment = (apartmentId) => async (dispatch) => {
  try {
    dispatch(apartmentStart())
    const apartment = await fetch(`${apartment_url}/${apartmentId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    if (!apartment.ok) {
      throw new Error('Failed to create apartment')
    }
    dispatch(deleteApartmentSuccess(apartmentId))
  } catch (err) {
    dispatch(actionApartmentFailed(err.message))
  }
}

export default apartmentSlice.reducer
