import { createSlice } from '@reduxjs/toolkit'
import { io } from 'socket.io-client'
import Cookies from 'js-cookie'
import { fetchReports } from './report'
const commentSlice = createSlice({
  name: 'comment',
  initialState: {
    loading: false,
    error: null,
    data: null,
    single: null,
  },
  reducers: {
    fetchCommentStart: (state, action) => {
      state.loading = true
      state.error = null
    },
    fetchCommentsSuccess: (state, action) => {
      state.loading = false
      state.data = action.payload
    },
    editCommentsSuccess: (state, action) => {
      state.loading = false
      state.data = action.payload
    },
    deleteCommentSuccess: (state, action) => {
      state.loading = false
      state.data = action.payload
    },
    actionFailed: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
  },
})

export const {
  fetchCommentStart,
  fetchCommentsSuccess,
  editCommentsSuccess,
  deleteCommentSuccess,
  actionFailed,
} = commentSlice.actions

export const createComment =
  (userId, reportId, comment) => async (dispatch) => {
    try {
      dispatch(fetchCommentStart())
      const token = Cookies.get('token')
      const socket = io(`${import.meta.env.VITE_URL}/`)
      console.log(token)
      const response = await fetch(
        `${import.meta.env.VITE_URL}/api/report/create/comment?user_id=${userId}&report_id=${reportId}`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ comment }),
        },
      )
      if (!response.ok) {
        const json = await response.json()
        console.log(json)
        throw new Error(json.error)
      }
      const json = await response.json()
      console.log(json)
      socket.emit('send-comment')
      dispatch(fetchReports())
    } catch (err) {
      dispatch(actionFailed(err.message))
    }
  }
export const fetchComments = (reportId) => async (dispatch) => {
  try {
    const token = Cookies.get('token')
    const response = await fetch(
      `${import.meta.env.VITE_URL}/api/report/v1?report_id=${reportId}`,
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
    dispatch(fetchReports(json))
  } catch (err) {
    dispatch(actionFailed(err.message))
  }
}

export const fetchComment = (reportId, commentId) => async (dispatch) => {
  try {
    dispatch(fetchCommentStart())
    const token = Cookies.get('token')
    const response = await fetch(
      `${import.meta.env.VITE_URL}/api/report/?report_id=${reportId}&comment_id=${commentId}`,
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
    dispatch(fetchComment(json.response))
  } catch (err) {
    dispatch(actionFailed(err.message))
  }
}

export const editComment =
  (reportId, commentId, comment) => async (dispatch) => {
    try {
      dispatch(fetchCommentStart())
      const token = Cookies.get('token')
      const response = await fetch(
        `${import.meta.env.VITE_URL}/api/report/?report_id=${reportId}&comment_id=${commentId}`,
        {
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(comment),
        },
      )
      if (!response.ok) {
        const json = await response.json()
        throw new Error(json.error)
      }
      const json = await response.json()
      dispatch(fetchReports())
    } catch (err) {
      dispatch(actionFailed(err.message))
    }
  }

export const deleteComment = (reportId) => async (dispatch) => {
  try {
    dispatch(fetchCommentStart())
    const token = Cookies.get('token')
    const response = await fetch(
      `${import.meta.env.VITE_URL}/api/report/?report_id=${reportId}`,
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
    dispatch(fetchReports())
  } catch (err) {
    dispatch(actionFailed(err.message))
  }
}

export default commentSlice.reducer
