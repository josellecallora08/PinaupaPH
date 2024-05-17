import { createSlice } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'
const householdSlice = createSlice({
  name: 'household',
  initialState: {
    loading: false,
    error: null,
    data: null,
    single: null,
    msg: null,
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
    insertHouseholdsSuccess: (state, action) => {
      state.loading = false
      state.data = [...state.data, action.payload.response]
      state.msg = action.payload.msg
    },
    deleteHouseholdSuccess: (state, action) => {
      state.loading = false
      state.data = state.data.filter(
        (household) => household._id !== action.payload.response._id,
      )
      state.msg = action.payload.msg
    },
    editHouseholdSuccess: (state, action) => {
      state.loading = false
      state.data = state.data.map((household) =>
        household._id !== action.payload.response._id
          ? action.payload.response
          : household,
      )
      state.msg = action.payload.msg
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
  deleteHouseholdSuccess,
  editHouseholdSuccess,
  insertHouseholdsSuccess,
} = householdSlice.actions

export const createHousehold = (user_id, fields) => async (dispatch) => {
  try {
    dispatch(fetchHouseholdStart())
    const token = Cookies.get('token')
    const response = await fetch(
      `${import.meta.env.VITE_URL}/api/user/${user_id}/create_household`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(fields),
      },
    )
    if (!response.ok) {
      const json = await response.json()
      throw new Error(json.error)
    }

    const json = await response.json()
    dispatch(insertHouseholdsSuccess(json))
  } catch (err) {
    dispatch(fetchFailed(err.message))
  }
}

export const fetchHousehold = (user_id, household_id) => async (dispatch) => {
  try {
    dispatch(fetchHouseholdStart())
    const token = Cookies.get('token')
    const response = await fetch(
      `${import.meta.env.VITE_URL}/api/user/${user_id}/household/v1?household_id=${household_id}`,
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
    dispatch(fetchHouseholdSuccess(json.response))
  } catch (err) {
    dispatch(fetchFailed(err.message))
  }
}

export const fetchHouseholds = (user_id) => async (dispatch) => {
  try {
    dispatch(fetchHouseholdStart())
    const token = Cookies.get('token')
    const response = await fetch(
      `${import.meta.env.VITE_URL}/api/user/${user_id}/household`,
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
    dispatch(fetchHouseholdsSuccess(json.response))
  } catch (err) {
    dispatch(fetchFailed(err.message))
  }
}

export const editHousehold =
  (user_id, household_id, fields) => async (dispatch) => {
    try {
      dispatch(fetchHouseholdStart())
      const token = Cookies.get('token')
      const response = await fetch(
        `${import.meta.env.VITE_URL}/api/user/${user_id}/update_household?household_id=${household_id}`,
        {
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-type': 'application/json',
          },
          body: JSON.stringify(fields),
        },
      )

      if (!response.ok) {
        const json = await response.json()
        console.log('|upodate', json)
        throw new Error(json.error)
      }

      const json = await response.json()
      console.log(json)
      dispatch(fetchHouseholds(user_id))
    } catch (err) {
      dispatch(fetchFailed(err.message))
    }
  }

export const deleteHousehold = (user_id, household_id) => async (dispatch) => {
  try {
    dispatch(fetchHouseholdStart())
    const token = Cookies.get('token')
    const response = await fetch(
      `${import.meta.env.VITE_URL}/api/user/${user_id}/delete_household?household_id=${household_id}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )

    if (!response.ok) {
      const json = await response.json()
      console.log(json)
      throw new Error(json.error)
    }

    const json = await response.json()
    console.log('hh', json)
    dispatch(deleteHouseholdSuccess(json))
  } catch (err) {
    dispatch(fetchFailed(err.message))
  }
}

export default householdSlice.reducer
