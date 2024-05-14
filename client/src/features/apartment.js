import { createSlice } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'
const apartmentSlice = createSlice({
  name: 'apartment',
  initialState: {
    loading: false,
    error: null,
    data: null,
    single: null,
    msg: null,
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
    insertApartmentSuccess: (state, action) => {
      state.loading = false
      state.data = [...state.data, action.payload.response]
      state.msg = action.payload.msg
    },
    fetchSingleApartmentSuccess: (state, action) => {
      state.loading = false
      state.single = action.payload
    },
    editApartmentSuccess: (state, action) => {
      state.loading = false
      state.data = state.data.map((item) =>
        item._id === action.payload.response._id
          ? action.payload.response
          : item,
      )
      state.single =
        state.single._id === action.payload.response._id
          ? { ...action.payload.response }
          : state.single
      state.msg = action.payload.msg
    },
    deleteApartmentSuccess: (state, action) => {
      state.loading = false
      state.data = state.data.filter((item) => item._id !== action.payload._id)
      state.msg = action.payload.msg
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
  insertApartmentSuccess,
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
    dispatch(fetchApartmentSuccess(json))
  } catch (err) {
    dispatch(actionApartmentFailed(err.message))
  }
}

export const createApartment = (fields) => async (dispatch) => {
  if (
    fields.name === '' ||
    fields.address === '' ||
    fields.provice === '' ||
    fields.barangay === ''
  ) {
    throw new Error('Please fill all the inputs.')
  }
  try {
    const token = Cookies.get('token')
    const response = await fetch(
      `${import.meta.env.VITE_URL}/api/apartment/create_apartment`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-type': 'application/json',
        },
        body: JSON.stringify(fields),
      },
    )

    if (!response.ok) {
      const json = await response.json()
      throw new Error(json.error)
    }
    const json = await response.json()
    console.log(json)
    dispatch(insertApartmentSuccess(json))
  } catch (err) {
    dispatch(actionApartmentFailed(err.message))
  }
}

export const fetchApartments = () => async (dispatch) => {
  try {
    dispatch(apartmentStart())
    const token = Cookies.get('token')
    const response = await fetch(
      `${import.meta.env.VITE_URL}/api/apartment/building/list`,
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
      `${import.meta.env.VITE_URL}/api/apartment/building/list/v1?apartment_id=${apartmentId}`,
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
      `${import.meta.env.VITE_URL}/api/apartment/update?apartment_id=${apartmentId}`,
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
      const json = await response.json()
      console.log(json)
      throw new Error(json.error)
    }
    const json = await response.json()
    console.log(json)
    dispatch(editApartmentSuccess(json))
  } catch (err) {
    dispatch(actionApartmentFailed(err.message))
  }
}

export const deleteApartment = (apartment_id) => async (dispatch) => {
  try {
    const token = Cookies.get('token')
    const response = await fetch(
      `${import.meta.env.VITE_URL}/api/apartment/${apartment_id}`,
      {
        method: 'DELETE',
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
    dispatch(deleteApartmentSuccess(json))
  } catch (err) {
    dispatch(actionApartmentFailed(err.message))
  }
}

export default apartmentSlice.reducer
