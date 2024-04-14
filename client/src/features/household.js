import { createSlice } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'
import { base_url } from '../utils/constants'
const householdSlice = createSlice({
  name: 'household',
  initialState: {
    loading: false,
    error: null,
    data: null,
    single: null,
  },
  reducers: {
    fetchHouseholdStart: (state) => {
      state.loading = true
      state.error = null
    },
    fetchHouseholdSuccess: (state, action) => {
      state.loading = false
      state.single = action.payload
    },
    fetchHouseholdsSuccess: (state, action) => {
      state.loading = false
      state.data = action.payload
    },
    fetchFailed: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
  },
})

export const {
  fetchHouseholdStart,
  fetchHouseholdSuccess,
  fetchHouseholdsSuccess,
  fetchFailed,
} = householdSlice.actions

export const createHousehold = (user_id, fields) => async (dispatch) => {
  try {
    dispatch(fetchHouseholdStart())
    const token = Cookies.get('token')
    const response = await fetch(
      `${base_url}/api/user/${user_id}/create_household`,
      {
        method: 'POST',
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
    dispatch(fetchHouseholds())
  } catch (err) {
    dispatch(fetchFailed(err.message))
  }
}

export const fetchHousehold = (user_id, household_id) => async (dispatch) => {
  try {
    dispatch(fetchHouseholdStart())
    const token = Cookies.get('token')
    const response = await fetch(
      `${base_url}/api/user/${user_id}/household/v1?household_id=${household_id}`,
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
    dispatch(fetchHouseholdSuccess(json))
  } catch (err) {
    dispatch(fetchFailed(err.message))
  }
}

export const fetchHouseholds = (user_id) => async (dispatch) => {
  try {
    dispatch(fetchHouseholdStart())
    const token = Cookies.get('token')
    const response = await fetch(`${base_url}/api/user/${user_id}/household`, {
      method: 'GET',
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
    dispatch(fetchHouseholdsSuccess(json.response))
  } catch (err) {
    dispatch(fetchFailed(err.message))
  }
}

export const editHousehold = (user_id, household_id, fields) => async (dispatch) => {
  try {
    dispatch(fetchHouseholdStart())
    const token = Cookies.get('token')
    const response = await fetch(`${import.meta.env.VITE_URL}/api/user/${user_id}/update_household?household_id=${household_id}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(fields)
    })

    if (!response.ok) {
      const json = await response.json()
      throw new Error(json.error)
    }

    const json = await response.json()
    dispatch(fetchHouseholds())
  } catch (err) {
    dispatch(fetchFailed(err.message))
  }
}

export const deleteHousehold = (user_id, household_id) => async (dispatch) => {
  try {
    dispatch(fetchHouseholdStart())
    const token = Cookies.get('token')
    const response = await fetch(`${import.meta.env.VITE_URL}/api/user/${user_id}/delete_household?household_id=${household_id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      const json = await response.json()
      throw new Error(json.error)
    }

    const json = await response.json()
    dispatch(fetchHouseholds())
  } catch (err) {
    dispatch(fetchFailed(err.message))
  }
}

export default householdSlice.reducer
