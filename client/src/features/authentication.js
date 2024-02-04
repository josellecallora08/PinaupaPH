import { createSlice } from '@reduxjs/toolkit'
import { base_url } from '../utils/constants'
import Cookies from 'js-cookie' // Make sure to import the Cookies library if you haven't

const authSlice = createSlice({
  name: 'auth',
  initialState: { isAuthenticated: false, role: null },
  reducers: {
    login_success: (state, action) => {
      const { role } = action.payload
      return { isAuthenticated: true, role }
    },
    logout: (state) => {
      return { isAuthenticated: false, role: null }
    },
  },
})

export const { login_success, logout } = authSlice.actions

export const login = (credentials, navigate) => async (dispatch) => {
  try {
    const response = await fetch(`${base_url}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    })
    if (!response.ok) {
      throw new Error('Login Failed.')
    }

    const data = await response.json()
    Cookies.set('Token', data.token, { expires: 1 })
    navigate('/dashboard')
    dispatch(login_success(data))
  } catch (error) {
    console.error('Login failed:', error)
  }
}

export const is_login = (navigate) => async (dispatch) => {
  const token = Cookies.get('Token')
  console.log('hello')
  if (token) {
    const response = await fetch(`${base_url}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-type': 'application/json',
      },
    })
    const data = await response.json()
    console.log(data.Role)
    navigate('/dashboard')
    dispatch(login_success(data))
  }
}

export default authSlice.reducer
