import { createSlice } from '@reduxjs/toolkit'
import { base_url } from '../utils/constants'
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    loading: false,
    isAuthenticated: false,
    token: null,
    user: null,
    error: null,
  },
  reducers: {
    loginStart: (state, action) => {
      state.loading = true
      state.error = null
    },
    loginSuccess: (state, action) => {
      state.loading = false
      state.isAuthenticated = true
      state.token = action.payload.token
      state.user = action.payload.response
    },
    loginFailed: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    logout: (state) => {
      state.loading = false
      state.isAuthenticated = false
      state.user = null
    },
  },
})

export const { loginStart, loginSuccess, loginFailed, logout } =
  authSlice.actions

export const isLoggedin = (navigate, token, userId) => async (dispatch) => {
  if (token) {
    const response = await fetch(`${base_url}/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    const data = await response.json()
    dispatch(loginSuccess(data))
    navigate('/dashboard')
  }
}

export const isLogin = (credentials, navigate) => async (dispatch) => {
  try {
    dispatch(loginStart())
    const response = await fetch(`${base_url}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
      credentials: 'include',
    })
    if (!response.ok) {
      throw new Error('Login Failed.')
    }

    const data = await response.json()
    dispatch(loginSuccess(data))
    navigate('/dashboard')
  } catch (err) {
    dispatch(loginFailed(err.message))
  }
}

export default authSlice.reducer
