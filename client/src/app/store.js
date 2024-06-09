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
import concernReducer from '../features/concern'
import householdReducer from '../features/household'
import invoiceReducer from '../features/invoice'
import petReducer from '../features/pet'
import notifReducer from '../features/notification'
import announcementReducer from '../features/announcement'
import dashboardReducer from '../features/dashboard'
import reportReducer from '../features/report'
import requirementReducer from '../features/requirements'


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
    concern: concernReducer,
    household: householdReducer,
    pet: petReducer,
    invoice: invoiceReducer,
    notif: notifReducer,
    announcement: announcementReducer,
    dash: dashboardReducer,
    report: reportReducer,
    req: requirementReducer
  },
})
