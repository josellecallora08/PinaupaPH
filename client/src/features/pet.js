import { createSlice } from '@reduxjs/toolkit'
import { base_url } from '../utils/constants'
import Cookies from 'js-cookie'

const token = Cookies.get('token')
const petSlice = createSlice({
  name: 'pet',
  initialState: {
    loading: false,
    error: null,
    data: null,
  },
  reducers: {
    fetchPetStart: (state, action) => {
      state.loading = true
      state.error = null
    },
    fetchPetSuccess: (state, action) => {
      state.loading = false
      state.data = action.payload
    },
    editPetSuccess: (state, action) => {
      state.loading = false
      state.data = state.data.map((pet) =>
        pet._id === action.payload
          ? { ...pet, ...action.payload.response }
          : pet,
      )
    },
    deletePetSuccess: (state, action) => {
      state.loading = false
      state.data = state.data.filter((pet) => pet._id !== action.payload)
    },
    actionPetFailed: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
  },
})

export const {
  fetchPetStart,
  fetchPetSuccess,
  editPetSuccess,
  deletePetSuccess,
  actionPetFailed,
} = petSlice.actions

export const fetchPets = () => async (dispatch) => {
  try {
    dispatch(fetchPetStart())
    const response = await fetch(`${base_url}/pet`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    if (!response.ok) throw new Error('Unable to fetch Pets')

    const json = await response.json()
    dispatch(fetchPetSuccess(json))
  } catch (err) {
    console.log('Unable to fetch all pets')
    dispatch(actionPetFailed(err.message))
  }
}

export const fetchPet = (pet_id) => async (dispatch) => {
  try {
    dispatch(fetchPetStart())
    const response = await fetch(`${base_url}/pet/${pet_id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    if (!response.ok) throw new Error('Unable to fetch Pet')

    const json = await response.json()
    dispatch(fetchPetSuccess(json))
  } catch (err) {
    console.log('Unable to fetch pet')
    dispatch(actionPetFailed(err.message))
  }
}

export const createPet = (fields) => async (dispatch) => {
  try {
    dispatch(fetchPetStart())
    const response = await fetch(`${base_url}/create_pet`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(fields),
    })
    if (!response.ok) throw new Error('Unable to create Pet')

    const json = await response.json()
    dispatch(fetchPetSuccess(json))
  } catch (err) {
    console.log('Unable to create pet')
    dispatch(actionPetFailed(err.message))
  }
}

export const editPet = (pet_id, fields) => async (dispatch) => {
  try {
    dispatch(fetchPetStart())
    const response = await fetch(`${base_url}/update_pet/${pet_id}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(fields),
    })
    if (!response.ok) throw new Error('Unable to create Pet')

    const json = await response.json()
    dispatch(editPetSuccess(json))
  } catch (err) {
    console.log('Unable to update pet')
    dispatch(actionPetFailed(err.message))
  }
}

export const deletePet = (pet_id) => async (dispatch) => {
  try {
    dispatch(fetchPetStart())
    const response = await fetch(`${base_url}/delete_pet/${pet_id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
    if (!response.ok) throw new Error('Unable to delete Pet')

    const json = await response.json()
    dispatch(deletePetSuccess(json))
  } catch (err) {
    console.log('Unable to delete pet')
    dispatch(actionPetFailed(err.message))
  }
}

export default petSlice.reducer
