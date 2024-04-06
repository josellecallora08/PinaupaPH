import { createSlice } from '@reduxjs/toolkit'
import { base_url } from '../utils/constants'
import Cookies from 'js-cookie'
const token = Cookies.get('token')
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
      state.user = action.payload
    },
    loginFailed: (state, action) => {
      state.loading = false
      state.isAuthenticated = false
      state.error = action.payload
      state.user = null
      state.token = null
    },
    logout: (state) => {
      state.loading = false
      state.isAuthenticated = false
      state.user = null
      state.token = null
    },
  },
})

export const { loginStart, loginSuccess, loginFailed, logout } =
  authSlice.actions

export const isLoggedin = () => async (dispatch) => {
  try {
    const token = Cookies.get('token') // Fetch token dynamically
    if (!token) {
      throw new Error('Token not found')
    }

    const response = await fetch(`${base_url}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    if (!response.ok) {
      throw new Error('User not found')
    }

    const data = await response.json()
    dispatch(loginSuccess(data))
  } catch (err) {
    dispatch(loginFailed(err.message))
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

    // Dispatch isLoggedin action after successful login to update user data
  } catch (err) {
    dispatch(loginFailed(err.message))
  }
}

export const isLogout = (navigate) => async (dispatch) => {
  try {
    const token = Cookies.get('token')
    if (token) {
      Cookies.remove('token')
    }
    dispatch(logout())
    navigate('/')
  } catch (err) {
    console.log('User not logged in.')
  }
}

export default authSlice.reducer
