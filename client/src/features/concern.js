import { createSlice } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'
import { io } from 'socket.io-client'

const concernSlice = createSlice({
  name: 'concern',
  initialState: {
    loading: false,
    error: null,
    data: null,
    single: null,
    msg: null,
  },
  reducers: {
    resetConcernStatus: (state) => {
      state.error = null
      state.msg = null
    },
    fetchConcernStart: (state) => {
      state.loading = true
      state.error = null
      state.msg = null
    },
    insertConcernSuccess: (state, action) => {
      state.loading = false
      state.data = [...state.data, action.payload.response]
      state.msg = action.payload.msg
    },
    fetchConcernsSuccess: (state, action) => {
      state.loading = false
      state.data = action.payload
    },
    fetchConcernSuccess: (state, action) => {
      state.loading = false
      state.single = action.payload
    },
    fetchConcernFailed: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    deleteConcernSuccess: (state, action) => {
      state.loading = false
      state.data = state.data.filter(
        (item) => item._id !== action.payload.response._id,
      )
      state.msg = action.payload.msg
    },
    resolveConcernSuccess: (state, action) => {
      state.loading = false
      state.single = { ...state.single, ...action.payload.response }
      state.msg = action.payload.msg
    },
    editConcernSuccess: (state, action) => {
      state.loading = false
      state.data = state.data.map((item) =>
        item._id === action.payload.response._id
          ? action.payload.response
          : item,
      )
      state.msg = action.payload.msg
    },
  },
})

export const {
  resetConcernStatus,
  fetchConcernStart,
  fetchConcernsSuccess,
  fetchConcernSuccess,
  insertConcernSuccess,
  fetchConcernFailed,
  resolveConcernSuccess,
  deleteConcernSuccess,
  editConcernSuccess,
} = concernSlice.actions

export const searchConcern = (filter) => async (dispatch) => {
  try {
    const token = Cookies.get('token')
    dispatch(fetchConcernStart())
    const response = await fetch(
      `${import.meta.env.VITE_URL}/api/concern/search?filter=${filter}`,
      {
        method: 'GET',
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
    dispatch(fetchConcernsSuccess(json.response))
  } catch (err) {
    console.log(err.message)
    dispatch(fetchConcernFailed(err.message))
  }
}
export const createConcern =
  (user_id, title, description, attached_image, type) => async (dispatch) => {
    try {
      const token = Cookies.get('token')
      dispatch(fetchConcernStart())
      const formData = new FormData()

      // Append each image to the form data
      attached_image.forEach((image, index) => {
        formData.append(`attached_image`, image) // No need to use an array index here
      })

      formData.append('title', title)
      formData.append('description', description)
      formData.append('type', type)

      const response = await fetch(
        `${import.meta.env.VITE_URL}/api/concern/create?user_id=${user_id}`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        },
      )

      if (!response.ok) {
        const json = await response.json()
        console.log(json)
        throw new Error(json.error)
      }
      const json = await response.json()
      console.log(json)
      dispatch(insertConcernSuccess(json))
    } catch (err) {
      console.log(err.message)
      dispatch(fetchConcernFailed(err.message))
    }
  }

export const fetchConcerns = () => async (dispatch) => {
  try {
    const token = Cookies.get('token')
    dispatch(fetchConcernStart())

    const response = await fetch(
      `${import.meta.env.VITE_URL}/api/concern/list`,
      {
        method: 'GET',
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
    dispatch(fetchConcernsSuccess(json.response))
  } catch (err) {
    console.log(err.message)
    dispatch(fetchConcernFailed(err.message))
  }
}
export const fetchConcern = (concern_id) => async (dispatch) => {
  try {
    dispatch(fetchConcernStart())
    const token = Cookies.get('token')
    const response = await fetch(
      `${import.meta.env.VITE_URL}/api/concern/list/v1?concern_id=${concern_id}`,
      {
        method: 'GET',
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

    dispatch(fetchConcernSuccess(json.response))
  } catch (err) {
    console.log(err.message)
    dispatch(fetchConcernFailed(err.message))
  }
}
export const resolveConcern = (concern_id) => async (dispatch) => {
  try {
    const token = Cookies.get('token')
    dispatch(fetchConcernStart())
    const response = await fetch(
      `${import.meta.env.VITE_URL}/api/concern/update/v1?concern_id=${concern_id}&status=true`,
      {
        method: 'PATCH',
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
    dispatch(resolveConcernSuccess(json))
  } catch (err) {
    console.log(err.message)
    dispatch(fetchConcernFailed(err.message))
  }
}

export const editConcern = (concern_id, fields) => async (dispatch) => {
  try {
    const token = Cookies.get('token')
    dispatch(fetchConcernStart())
    const response = await fetch(
      `${import.meta.env.VITE_URL}/api/concern/update?concern_id=${concern_id}`,
      {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(fields)
      },
    )
    if (!response.ok) {
      const json = await response.json()
      throw new Error(json.error)
    }
    const json = await response.json()
    dispatch(editConcernSuccess(json))
  } catch (err) {
    console.log(err.message)
    dispatch(fetchConcernFailed(err.message))
  }
}
export const deleteConcern = (concern_id, navigate) => async (dispatch) => {
  try {
    dispatch(fetchConcernStart())
    const token = Cookies.get('token')
    const response = await fetch(
      `${import.meta.env.VITE_URL}/api/concern/v1?concern_id=${concern_id}`,
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
    dispatch(deleteConcernSuccess(json))
    navigate('/concern&issue')
  } catch (err) {
    console.log(err.message)
    dispatch(fetchConcernFailed(err.message))
  }
}
export default concernSlice.reducer
