import { createSlice } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'
import { io } from 'socket.io-client'

const reportSlice = createSlice({
  name: 'report',
  initialState: {
    loading: false,
    error: null,
    data: null,
    single: null,
    msg: null,
  },
  reducers: {
    resetReportStatus: (state) => {
      state.error = null
      state.msg = null
    },
    fetchReportStart: (state) => {
      state.loading = true
      state.error = null
      state.msg = null
    },
    insertReportSuccess: (state, action) => {
      state.loading = false
      state.data = [...state.data, action.payload.response]
      state.msg = action.payload.msg
    },
    fetchReportsSuccess: (state, action) => {
      state.loading = false
      state.data = action.payload
    },
    fetchReportSuccess: (state, action) => {
      state.loading = false
      state.single = action.payload
    },
    fetchReportFailed: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    deleteReportSuccess: (state, action) => {
      state.loading = false
      state.data = state.data.filter(
        (item) => item._id !== action.payload.response._id,
      )
      state.msg = action.payload.msg
    },
    resolveReportSuccess: (state, action) => {
      state.loading = false
      state.single = {...state.single, ...action.payload.response}
      state.msg = action.payload.msg
    },
    editReportSuccess: (state, action) => {
      state.loading = false
      state.data = state.data.map((item) =>
        item._id === action.payload.response._id
          ? action.payload.response
          : item,
      )
      state.msg = action.payload.msg
    },
  },
})

export const {
  resetReportStatus,
  fetchReportStart,
  fetchReportsSuccess,
  fetchReportSuccess,
  insertReportSuccess,
  fetchReportFailed,
  resolveReportSuccess,
  deleteReportSuccess,
  editReportSuccess,
} = reportSlice.actions

export const searchReport = (filter) => async (dispatch) => {
  try {
    const token = Cookies.get('token')
    dispatch(fetchReportStart())
    const response = await fetch(
      `${import.meta.env.VITE_URL}/api/report/search?filter=${filter}`,
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
    dispatch(fetchReportsSuccess(json.response))
  } catch (err) {
    console.log(err.message)
    dispatch(fetchReportFailed(err.message))
  }
}
export const createReport = (user_id, title, description, attached_image, type) => async (dispatch) => {
  try {
    console.log(attached_image);
    console.log(type);
    const token = Cookies.get('token');
    dispatch(fetchReportStart());
    const formData = new FormData();

    // Append each image to the form data
    attached_image.forEach((image, index) => {
      formData.append(`attached_image`, image); // No need to use an array index here
    });

    formData.append('title', title);
    formData.append('description', description);
    formData.append('type', type);

    const response = await fetch(
      `${import.meta.env.VITE_URL}/api/report/create?user_id=${user_id}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          // 'Content-Type': 'multipart/form-data' // Do not set this manually
        },
        body: formData,
      },
    );

    if (!response.ok) {
      const json = await response.json();
      console.log(json);
      throw new Error(json.error);
    }
    const json = await response.json();
    console.log(json);
    dispatch(insertReportSuccess(json));
  } catch (err) {
    console.log(err.message);
    dispatch(fetchReportFailed(err.message));
  }
};


export const fetchReports = () => async (dispatch) => {
  try {
    const token = Cookies.get('token')
    dispatch(fetchReportStart())

    const response = await fetch(
      `${import.meta.env.VITE_URL}/api/report/list`,
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
    dispatch(fetchReportsSuccess(json.response))
  } catch (err) {
    console.log(err.message)
    dispatch(fetchReportFailed(err.message))
  }
}
export const fetchReport = (report_id) => async (dispatch) => {
  try {
    dispatch(fetchReportStart())
    const socket = io(`${import.meta.env.VITE_URL}/`)

    const token = Cookies.get('token')
    const response = await fetch(
      `${import.meta.env.VITE_URL}/api/report/list/v1?report_id=${report_id}`,
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

    dispatch(fetchReportSuccess(json.response))
  } catch (err) {
    console.log(err.message)
    dispatch(fetchReportFailed(err.message))
  }
}
export const resolveReport = (report_id) => async (dispatch) => {
  try {
    const token = Cookies.get('token')
    dispatch(fetchReportStart())
    const response = await fetch(
      `${import.meta.env.VITE_URL}/api/report/update/v1?report_id=${report_id}&status=true`,
      {
        method: 'PATCH',
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
    dispatch(resolveReportSuccess(json))
  } catch (err) {
    console.log(err.message)
    dispatch(fetchReportFailed(err.message))
  }
}

export const editReport = (report_id, fields) => async (dispatch) => {
  try {
    const token = Cookies.get('token')
    dispatch(fetchReportStart())
    const response = await fetch(
      `${import.meta.env.VITE_URL}/api/report/update?report_id=${report_id}`,
      {
        method: 'PATCH',
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
    dispatch(editReportSuccess(json))
  } catch (err) {
    console.log(err.message)
    dispatch(fetchReportFailed(err.message))
  }
}
export const deleteReport = (report_id, navigate) => async (dispatch) => {
  try {
    dispatch(fetchReportStart())
    const token = Cookies.get('token')
    const response = await fetch(
      `${import.meta.env.VITE_URL}/api/report/v1?report_id=${report_id}`,
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
    dispatch(deleteReportSuccess(json))
    navigate('/concern&issue')
  } catch (err) {
    console.log(err.message)
    dispatch(fetchReportFailed(err.message))
  }
}
export default reportSlice.reducer
