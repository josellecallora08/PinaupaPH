import { createSlice } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'
const userSlice = createSlice({
  name: 'user',
  initialState: {
    loading: false,
    error: null,
    data: null,
    single: null,
  },
  reducers: {
    fetchUserStart: (state) => {
      state.loading = true
      state.error = null
    },
    fetchUserSuccess: (state, action) => {
      state.loading = false
      state.data = action.payload
    },
    fetchSingleUser: (state, action) => {
      state.loading = false
      state.single = action.payload
    },
    deleteUserSuccess: (state, action) => {
      state.loading = false
      state.data = state.data.filter((user) => user._id !== action.payload)
    },
    editUserSuccess: (state, action) => {
      state.loading = false
      state.data = state.data.map((user) =>
        user._id === action.payload.response._id
          ? { ...user, ...action.payload.response }
          : user,
      )
    },
    actionUserFailed: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
  },
})

export const {
  fetchUserStart,
  fetchUserSuccess,
  fetchSingleUser,
  deleteUserSuccess,
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
    dispatch(fetchUserStart())
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
      throw new Error(json.error)
    }

    const json = await response.json()
    dispatch(fetchUsers())
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
    dispatch(actionUserFailed())
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
    dispatch(fetchUserStart())
    const response = await fetch(
      `${import.meta.env.VITE_URL}/api/user/${userId}/update_profile`,
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
      throw new Error(json.error)
    }

    const json = await response.json()
    dispatch(fetchUser(userId))
  } catch (err) {
    dispatch(actionUserFailed(err.message))
  }
}

export const editUserApartment = (userId, credentials) => async (dispatch) => {
  try {
    const token = Cookies.get('token')
    dispatch(fetchUserStart())
    const response = await fetch(
      `${import.meta.env.VITE_URL}/api/user/${userId}/update-apartment-details`,
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
      throw new Error(json.error)
    }

    // const json = await user.json()
    // dispatch(editUserSuccess(userId))
    dispatch(fetchUser(userId))
  } catch (err) {
    dispatch(actionUserFailed(err.message))
  }
}

export const deleteUser = (userId) => async (dispatch) => {
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
    // const json = await deleteUser.json()

    dispatch(fetchUsers())
  } catch (err) {
    dispatch(actionUserFailed(err.message))
  }
}

export default userSlice.reducer
