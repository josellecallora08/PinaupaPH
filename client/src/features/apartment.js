import { createSlice } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'
const apartmentSlice = createSlice({
  name: 'apartment',
  initialState: {
    loading: false,
    error: null,
    data: null,
    single: null,
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
    fetchSingleApartmentSuccess: (state, action) => {
      state.loading = false
      state.single = action.payload
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
  fetchSingleApartmentSuccess,
  editApartmentSuccess,
  deleteApartmentSuccess,
  actionApartmentFailed,
} = apartmentSlice.actions

export const handleSearchApartment = (filter) => async (dispatch) => {
  try {
    const token = Cookies.get('token')
    dispatch(apartmentStart())
    const response = await fetch(
      `${import.meta.env.VITE_URL}/api/apartment/search?filter=${filter}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )

    if (!response.ok) {
      const json = await response.json()
      throw new Error(json.error)
    }
    const json = await response.json()
    console.log(json)
    dispatch(fetchApartmentSuccess(json))
  } catch (err) {
    dispatch(actionApartmentFailed(err.message))
  }
}

export const createApartment = (fields) => async (dispatch) => {
  try {
    dispatch(apartmentStart())
    const token = Cookies.get('token')
    const response = await fetch(`${import.meta.env.VITE_URL}/api/apartment/create_apartment`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-type': 'application/json',
      },
      body: JSON.stringify(fields),
    })

    if (!response.ok) {
      const json = await response.json()
      throw new Error(json.error)
    }
    const json = await response.json()
    dispatch(fetchApartments())
  } catch (err) {
    dispatch(actionApartmentFailed(err.message))
  }
}

export const fetchApartments = () => async (dispatch) => {
  try {
    dispatch(apartmentStart())
    const token = Cookies.get('token')
    const response = await fetch(`${import.meta.env.VITE_URL}/api/apartment/building`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      const json = await response.json()
      throw new Error(json.error)
    }
    const json = await response.json()
    console.log(json)
    dispatch(fetchApartmentSuccess(json))
  } catch (err) {
    dispatch(actionApartmentFailed(err.message))
  }
}

export const fetchApartment = (apartmentId) => async (dispatch) => {
  try {
    const token = Cookies.get('token')
    dispatch(apartmentStart())
    const response = await fetch(
      `${import.meta.env.VITE_URL}/api/apartment/building/${apartmentId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )

    if (!response.ok) {
      const json = await response.json()
      throw new Error(json.error)
    }
    const json = await response.json()
    dispatch(fetchSingleApartmentSuccess(json))
  } catch (err) {
    dispatch(actionApartmentFailed(err.message))
  }
}

export const editApartment = (fields, apartmentId) => async (dispatch) => {
  try {
    dispatch(apartmentStart())
    const token = Cookies.get('tokens')
    const response = await fetch(
      `${import.meta.env.VITE_URL}/api/apartment/${apartmentId}/edit_apartment`,
      {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(fields),
      },
    )

    if (!response.ok) {
      const json = await response.json()
      throw new Error(json.error)
    }
    const json = await response.json()
    dispatch(fetchApartments())
  } catch (err) {
    dispatch(actionApartmentFailed(err.message))
  }
}

export const deleteApartment = (apartment_id) => async (dispatch) => {
  try {
    dispatch(apartmentStart())
    const token = Cookies.get('token')
    const response = await fetch(`${import.meta.env.VITE_URL}/api/apartment/${apartment_id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    if (!response.ok) {
      const json = await response.json()
      throw new Error(json.error)
    }
    dispatch(fetchApartments())
  } catch (err) {
    dispatch(actionApartmentFailed(err.message))
  }
}

export default apartmentSlice.reducer
