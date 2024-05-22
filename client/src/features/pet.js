import { createSlice } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'

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
    insertPetSuccess: (state, action) => {
      state.loading = false
      state.data = [...state.data, action.payload.response]
      state.msg = action.payload.msg
    },
    editPetSuccess: (state, action) => {
      state.loading = false
      state.data = state.data.map((pet) =>
        pet._id === action.payload.response._id ? action.payload.response : pet,
      )
      state.msg = action.payload.msg
    },
    deletePetSuccess: (state, action) => {
      state.loading = false
      state.data = state.data.filter(
        (pet) => pet._id !== action.payload.response._id,
      )
    },
    resetPetStatus: (state) => {
      state.error = null
      state.msg = null
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
  resetPetStatus,
  deletePetSuccess,
  actionPetFailed,
} = petSlice.actions

export const fetchPets = (user_id) => async (dispatch) => {
  try {
    dispatch(fetchPetStart())
    const token = Cookies.get('token')
    const response = await fetch(
      `${import.meta.env.VITE_URL}/api/user/${user_id}/fetch/pets`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )

    if (!response.ok) {
      const json = await response.json()
      console.log('Unable to fetch pets', json)
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
    const response = await fetch(
      `${import.meta.env.VITE_URL}/api/user/${user_id}/create_pet`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(fields),
      },
    )

    console.log('Create Pet: ', response)

    if (!response.ok) {
      const json = await response.json()
      throw new Error(json.error)
    }

    const json = await response.json()
    console.log(json)
    dispatch(fetchPets(user_id))
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
    dispatch(fetchPets(user_id))
  } catch (err) {
    console.log('Unable to update pet')
    dispatch(actionPetFailed(err.message))
  }
}

export const deletePet = (user_id, pet_id) => async (dispatch) => {
  try {
    const token = Cookies.get('token')

    dispatch(fetchPetStart())
    const response = await fetch(
      `${import.meta.env.VITE_URL}/api/user/${user_id}/delete_pet?pet_id=${pet_id}`,
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

    const json = await response.json()
    dispatch(deletePetSuccess(json))
  } catch (err) {
    console.log('Unable to delete pet')
    dispatch(actionPetFailed(err.message))
  }
}

export default petSlice.reducer
