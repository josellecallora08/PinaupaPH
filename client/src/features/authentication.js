import { createSlice } from '@reduxjs/toolkit'
import { base_url } from '../utils/constants'
import Cookies from 'js-cookie'
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
    generateToken: (state, action) => {
      state.token = action.payload
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
    const token = Cookies.get('token') 
    if (!token) {
      return
    }

    const response = await fetch(`${import.meta.env.VITE_URL}/api/user/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    if (!response.ok) {
      const json = await response.json()
      throw new Error(json.error)
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
    if(credentials.username === '' || credentials.password === ''){
      throw new Error("Inputs cannot be empty")
    }
    const response = await fetch(`${import.meta.env.VITE_URL}/api/user/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
      credentials: 'include',
    })
    if (!response.ok) {
      const json = await response.json()
      throw new Error(json.error)
    }

    const data = await response.json()
    Cookies.set('token', data.token )
    dispatch(isLoggedin())
    navigate('/dashboard')
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
