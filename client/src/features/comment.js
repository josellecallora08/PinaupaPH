import { createSlice } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'
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
    insertCommentSuccess: (state, action) => {
      state.data = [...state.data, action.payload]
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
  insertCommentSuccess,
  editCommentsSuccess,
  deleteCommentSuccess,
  actionFailed,
} = commentSlice.actions

export const createComment =
  (userId, concernId, comment, url) => async (dispatch) => {
    try {
      console.log(userId)
      dispatch(fetchCommentStart())
      const token = Cookies.get('token')
      // const socket = io(`${import.meta.env.VITE_URL}/`)
      const response = await fetch(
        `${import.meta.env.VITE_URL}/api/concern/create/comment?user_id=${userId}&concern_id=${concernId}`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ comment, url }),
        },
      )
      if (!response.ok) {
        const json = await response.json()
        console.log(json)
        throw new Error(json.error)
      }
      const json = await response.json()
      console.log(comment)

      // dispatch(fetchconcern(concernId))
    } catch (err) {
      dispatch(actionFailed(err.message))
    }
  }
export const fetchComments = (concernId) => async (dispatch) => {
  try {
    dispatch(fetchCommentStart())
    const token = Cookies.get('token')
    const response = await fetch(
      `${import.meta.env.VITE_URL}/api/concern/list/comments?concern_id=${concernId}`,
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
    dispatch(fetchCommentsSuccess(json.response))
  } catch (err) {
    dispatch(actionFailed(err.message))
  }
}

export const fetchComment = (concernId, commentId) => async (dispatch) => {
  try {
    dispatch(fetchCommentStart())
    const token = Cookies.get('token')
    const response = await fetch(
      `${import.meta.env.VITE_URL}/api/concern/?concern_id=${concernId}&comment_id=${commentId}`,
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
  (concernId, commentId, comment) => async (dispatch) => {
    try {
      dispatch(fetchCommentStart())
      const token = Cookies.get('token')
      const response = await fetch(
        `${import.meta.env.VITE_URL}/api/concern/?concern_id=${concernId}&comment_id=${commentId}`,
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
      dispatch(fetchconcerns())
    } catch (err) {
      dispatch(actionFailed(err.message))
    }
  }

export const deleteComment = (concernId) => async (dispatch) => {
  try {
    dispatch(fetchCommentStart())
    const token = Cookies.get('token')
    const response = await fetch(
      `${import.meta.env.VITE_URL}/api/concern/?concern_id=${concernId}`,
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
    dispatch(fetchconcerns())
  } catch (err) {
    dispatch(actionFailed(err.message))
  }
}

export default commentSlice.reducer
