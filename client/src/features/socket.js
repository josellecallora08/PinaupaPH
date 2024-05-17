import { createSlice } from '@reduxjs/toolkit'
import { io } from 'socket.io-client'
import { fetchReport } from './report'
import { createComment } from './comment'

const socketSlice = createSlice({
  name: 'socket',
  initialState: {
    connection: '',
  },
  reducers: {
    fetchConnected: (state, action) => {
      state.connection = action.payload
    },
    fetchDisconnected: (state, action) => {
      state.connection = action.payload
    },
  },
})

export const { fetchConnected, fetchDisconnected } = socketSlice.actions

export const fetchComments = (id) => async (dispatch) => {
  console.log(id)
  const socket = io(`${import.meta.env.VITE_URL}/`)

  socket.on('connect', () => {
    console.log('Socket Connected')
    dispatch(fetchConnected('Socket Connected'))
  })
  socket.on('disconnect', () => {
    console.log('Socket disconnected')
    dispatch(fetchDisconnected('Socket Disconnected'))
  })

  socket.on('receive-message', () => {
    console.log('Received a message')
    // Dispatch the fetch_message action with updated token and chatId

    try {
      dispatch(fetchReport(id))
    } catch (error) {
      console.error('Error fetching messages:', error)
      // Handle the error as needed
    }
  })
}

export default socketSlice.reducer
