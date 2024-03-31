import { createSlice } from '@reduxjs/toolkit'
import { base_url } from '../utils/constants'
import Cookies from 'js-cookie'
const token = Cookies.get('token')
const userSlice = createSlice({
  name: 'user',
  initialState: {
    loading: false,
    error: null,
    data: null,
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
    deleteUserSuccess: (state, action) => {
      state.loading = false
      state.data = state.data.filter((user) => user._id !== action.payload)
    },
    editUserSuccess: (state, action) => {
      state.loading = false
      state.data = state.data.map((user) =>
        user._id === action.payload
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
  deleteUserSuccess,
  editUserSuccess,
  actionUserFailed,
} = userSlice.actions

export const createTenant = (fields) => async (dispatch) => {
  try {
    dispatch(loginStart())
    const userRegister = await fetch(`${base_url}/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(fields),
      // credentials: 'include',
    })

    if (!userRegister.ok) {
      throw new Error('Failed to register...')
    }

    const json = await userRegister.json()
    dispatch(fetchUserSuccess(json))
    // navigate('/dashboard')
  } catch (err) {
    dispatch(actionUserFailed(err.message))
  }
}

export const fetchUser = (userId) => async (dispatch) => {
  try {
    dispatch(fetchUserStart())
    const user = await fetch(`${base_url}/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!user.ok) {
      throw new Error('Failed to fetch user')
    }
    const json = await user.json()
    dispatch(fetchUserSuccess(json))
  } catch (err) {
    dispatch(actionUserFailed())
  }
}

export const fetchUsers = () => async (dispatch) => {
  try {
    dispatch(fetchUserStart())
    const user = await fetch(`${base_url}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    if (!user.ok) {
      throw new Error('Failed to fetch all user...')
    }
    const json = await user.json()
    dispatch(fetchUserSuccess(json))
  } catch (err) {
    dispatch(actionUserFailed(err.message))
  }
}

export const editUser = (userId, credentials) => async (dispatch) => {
  try {
    dispatch(fetchUserStart())
    const user = await fetch(`${base_url}/${userId}/update_profile`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-type': 'application/json',
      },
      body: JSON.stringify(credentials),
    })

    if (!user.ok) {
      throw new Error('Failed to update information...')
    }

    // const json = await user.json()
    dispatch(editUserSuccess(userId))
  } catch (err) {
    dispatch(actionUserFailed(err.message))
  }
}

export const deleteUser = (userId) => async (dispatch) => {
  try {
    dispatch(fetchUserStart())
    const deleteUser = await fetch(`${base_url}/${userId}/delete_tenant`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!deleteUser.ok) {
      throw new Error('Failed to delete tenant...')
    }
    // const json = await deleteUser.json()

    dispatch(deleteUserSuccess(userId))
  } catch (err) {
    dispatch(actionUserFailed(err.message))
  }
}

export default userSlice.reducer
