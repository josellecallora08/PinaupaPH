import { createSlice } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'
const userSlice = createSlice({
  name: 'user',
  initialState: {
    loading: false,
    error: null,
    data: null,
    single: null,
    msg: null,
  },
  reducers: {
    resetUserStatus: (state) => {
      state.msg = null
      state.error = null
    },
    fetchUserStart: (state) => {
      state.loading = true
      state.error = null
    },
    fetchUserSuccess: (state, action) => {
      state.loading = false
      state.data = action.payload
    },
    insertUserSuccess: (state, action) => {
      state.loading = false
      state.data = [...state.data, action.payload.response]
      state.msg = action.payload.msg
    },
    fetchSingleUser: (state, action) => {
      state.loading = false
      state.single = action.payload
    },
    editSingleUser: (state, action) => {
      state.loading = false
      state.single = { ...state.single, ...action.payload.response }
      state.msg = action.payload.msg
    },
    deleteUserSuccess: (state, action) => {
      state.loading = false
      state.msg = action.payload.msg
      state.data = state.data.filter(
        (user) => user._id !== action.payload.response._id,
      )
    },
    editUserSuccess: (state, action) => {
      state.loading = false
      state.data = state.data.map((user) =>
        user._id === action.payload.response._id
          ? action.payload.response
          : user,
      )
      state.single =
        state.single._id === action.payload.response._id
          ? { ...action.payload.response }
          : state.single
      state.msg = action.payload.msg
    },
    actionUserFailed: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
  },
})

export const {
  resetUserStatus,
  fetchUserStart,
  fetchUserSuccess,
  insertUserSuccess,
  fetchSingleUser,
  deleteUserSuccess,
  editSingleUser,
  editUserSuccess,
  actionUserFailed,
} = userSlice.actions

export const handleSearchUser = (filter) => async (dispatch) => {
  try {
    const token = Cookies.get('token')
    dispatch(fetchUserStart())
    const response = await fetch(
      `${import.meta.env.VITE_URL}/api/user/search?filter=${filter}`,
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
    dispatch(fetchUserSuccess(json.response))
  } catch (err) {
    dispatch(actionUserFailed(err.message))
  }
}

export const createTenant = (fields) => async (dispatch) => {
  try {
    const token = Cookies.get('token')
    const response = await fetch(`${import.meta.env.VITE_URL}/api/user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(fields),
    })

    if (!response.ok) {
      const json = await response.json()
      console.log(json.error)
      throw new Error(json.error)
    }

    const json = await response.json()
    dispatch(insertUserSuccess(json))
  } catch (err) {
    dispatch(actionUserFailed(err.message))
  }
}

export const fetchUser = (userId) => async (dispatch) => {
  try {
    dispatch(fetchUserStart())
    const token = Cookies.get('token')
    const response = await fetch(
      `${import.meta.env.VITE_URL}/api/user/tenant?user_id=${userId}`,
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
    console.log(json)
    dispatch(fetchSingleUser(json.response))
  } catch (err) {
    dispatch(actionUserFailed(err.message))
  }
}

export const fetchUsers = () => async (dispatch) => {
  try {
    const token = Cookies.get('token')
    dispatch(fetchUserStart())
    const response = await fetch(
      `${import.meta.env.VITE_URL}/api/user/tenants`,
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
    dispatch(fetchUserSuccess(json.response))
  } catch (err) {
    dispatch(actionUserFailed(err.message))
  }
}

export const editUser = (userId, credentials) => async (dispatch) => {
  try {
    const token = Cookies.get('token')
    console.log(userId)
    const response = await fetch(
      `${import.meta.env.VITE_URL}/api/user/account/update?user_id=${userId}`,
      {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-type': 'application/json',
        },
        body: JSON.stringify(credentials),
      },
    )

    if (!response.ok) {
      const json = await response.json()
      console.log(json)
      throw new Error(json.error)
    }

    const json = await response.json()
    console.log(json)
    dispatch(editSingleUser(json))
  } catch (err) {
    dispatch(actionUserFailed(err.message))
  }
}

export const editUserApartment = (userId, credentials) => async (dispatch) => {
  try {
    const token = Cookies.get('token')
    dispatch(fetchUserStart())
    const response = await fetch(
      `${import.meta.env.VITE_URL}/api/user/apartment/unit/update?user_id=${userId}`,
      {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-type': 'application/json',
        },
        body: JSON.stringify(credentials),
      },
    )

    if (!response.ok) {
      const json = await response.json()
      console.log(json)
      throw new Error(json.error)
    }

    const json = await response.json()
    console.log('asdas', json)
    dispatch(editSingleUser(json))
    // dispatch(fetchUser(userId))
  } catch (err) {
    dispatch(actionUserFailed(err.message))
  }
}

export const changeProfile =
  (userId, public_id, imageFile) => async (dispatch) => {
    try {
      const token = Cookies.get('token')

      // Create a new FormData object
      const formData = new FormData()
      formData.append('profile_image', imageFile) // Append the image file
      // Make the fetch request
      const response = await fetch(
        `${import.meta.env.VITE_URL}/api/user/profile?public_id=${public_id}`,
        {
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData, // Set the body of the request to the FormData object
        },
      )

      if (!response.ok) {
        const json = await response.json()
        throw new Error(json.error)
        // Handle error response
      }

      const json = await response.json()
      console.log(json)
      dispatch(editSingleUser(json))
    } catch (err) {
      dispatch(actionUserFailed(err.message))
    }
  }

export const deleteTenant = (userId) => async (dispatch) => {
  try {
    const token = Cookies.get('token')
    dispatch(fetchUserStart())
    const response = await fetch(
      `${import.meta.env.VITE_URL}/api/user/account/delete?user_id=${userId}`,
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
    console.log(json)
    // navigate('/tenant')
    dispatch(deleteUserSuccess(json))
  } catch (err) {
    dispatch(actionUserFailed(err.message))
  }
}

export const deleteUser = (userId, navigate) => async (dispatch) => {
  try {
    const token = Cookies.get('token')
    dispatch(fetchUserStart())
    const response = await fetch(
      `${import.meta.env.VITE_URL}/api/user/delete_tenant?user_id=${userId}`,
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
    console.log(json)
    navigate('/tenant')
    dispatch(deleteUserSuccess(json))
  } catch (err) {
    dispatch(actionUserFailed(err.message))
  }
}

export default userSlice.reducer
