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
    single: null,
  },
  reducers: {
    fetchPetStart: (state, action) => {
      state.loading = true
      state.error = null
    },
    fetchPetsSuccess: (state, action) => {
      state.loading = false
      state.data = action.payload
    },
    fetchPetSuccess: (state, action) => {
      state.loading = false
      state.single = action.payload
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
  fetchPetsSuccess,
  editPetSuccess,
  deletePetSuccess,
  actionPetFailed,
} = petSlice.actions

export const fetchPets = (user_id) => async (dispatch) => {
  try {
    const token = Cookies.get('token')
    dispatch(fetchPetStart())
    const response = await fetch(`${base_url}/${user_id}/fetch/pets`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    if (!response.ok) {
      const json = await response.json()
      throw new Error(json.error)
    }

    const json = await response.json()
    dispatch(fetchPetsSuccess(json.response))
  } catch (err) {
    console.log('Unable to fetch all pets')
    dispatch(actionPetFailed(err.message))
  }
}

export const fetchPet = (user_id, pet_id) => async (dispatch) => {
  try {
    const token = Cookies.get('token')

    dispatch(fetchPetStart())
    const response = await fetch(
      `${import.meta.env.VITE_URL}/api/user/${user_id}/pet/v1?pet_id=${pet_id}`,
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
    dispatch(fetchPetSuccess(json))
  } catch (err) {
    console.log('Unable to fetch pet')
    dispatch(actionPetFailed(err.message))
  }
}

export const createPet = (user_id, fields) => async (dispatch) => {
  try {
    const token = Cookies.get('token')

    dispatch(fetchPetStart())
    const response = await fetch(`${import.meta.env.VITE_URL}/api/user/${user_id}/create_pet`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(fields),
    })
    if (!response.ok) {
      const json = await response.json()
      throw new Error(json.error)
    }

    const json = await response.json()
    dispatch(fetchPetsSuccess(json))
  } catch (err) {
    console.log('Unable to create pet')
    dispatch(actionPetFailed(err.message))
  }
}

export const editPet = (user_id, pet_id, fields) => async (dispatch) => {
  try {
    const token = Cookies.get('token')

    dispatch(fetchPetStart())
    const response = await fetch(
      `${import.meta.env.VITE_URL}/api/user/${user_id}/update_pet?pet_id=${pet_id}`,
      {
        method: 'PATCH',
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
    dispatch(editPetSuccess(json))
  } catch (err) {
    console.log('Unable to update pet')
    dispatch(actionPetFailed(err.message))
  }
}

export const deletePet = (pet_id) => async (dispatch) => {
  try {
    const token = Cookies.get('token')

    dispatch(fetchPetStart())
    const response = await fetch(`${base_url}/api/user/delete_pet/${pet_id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
    if (!response.ok) {
      const json = await response.json()
      throw new Error(json.error)
    }

    const json = await response.json()
    dispatch(deletePetSuccess(json))
  } catch (err) {
    console.log('Unable to delete pet')
    dispatch(actionPetFailed(err.message))
  }
}

export default petSlice.reducer
