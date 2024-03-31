import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/authentication'
import apartmentReducer from '../features/apartment'
import unitReducer from '../features/unit'
import cctvReducer from '../features/cctv'
import documentReducer from '../features/documents'
import userReducer from '../features/user'
import paymentReducer from '../features/payment'
import menuReducer from '../features/menu'
import commentReducer from '../features/comment'
import reportReducer from '../features/report'
import householdReducer from '../features/household'
import petReducer from '../features/pet'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    apartment: apartmentReducer,
    unit: unitReducer,
    cctv: cctvReducer,
    docs: documentReducer,
    user: userReducer,
    payment: paymentReducer,
    toggle: menuReducer,
    comment: commentReducer,
    report: reportReducer,
    household: householdReducer,
    pet: petReducer
  },
})
