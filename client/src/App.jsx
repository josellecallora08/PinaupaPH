import { Route, Routes } from 'react-router-dom'
import Dashboard from './Page/Admin/Dashboard'
import Sidebar from './Component/Sidebar'
import Layout from './Component/Layout'
import Tenant from './Page/Admin/Tenant'
import Apartment from './Page/Admin/Apartment'
import Security from './Page/Admin/Security'
import Concern from './Page/Admin/Concern'
import Profile from './Page/Admin/Profile'
import Least from './Page/Admin/Least'
import Invoice from './Page/Admin/Invoice'
import Login from './Page/Login'
import TenantCard from './Component/TenantCard'
import TenantProfile from './Page/Admin/TenantProfile'
import ApartmentProfile from './Page/Admin/ApartmentProfile'
import ViewConcern from './Page/Admin/ViewConcern'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { isLoggedin } from './features/authentication'
import { useNavigate, Navigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import ForgotPass from './Page/ForgotPass'
import OTPVerify from './Page/Admin/OTPVerify'
import ResetPass from './Page/Admin/ResetPass'
function App() {
  const token = Cookies.get('token')
  const user = useSelector((state) => state.auth.isAuthenticated)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(isLoggedin(token))
    console.log('1')
  }, [])

  return (
    <Routes>
      <Route
        path="/"
        element={user ? <Navigate to="/dashboard" /> : <Login />}
      />
      <Route
        path="/forgot-password"
        element={ <ForgotPass />}
      />
      <Route
        path="/OTPVerify"
        element={ <OTPVerify />}
      />
         <Route
        path="/ResetPassword"
        element={ <ResetPass />}
      />
      <Route
        path="/dashboard"
        element={
          user ? (
            <Layout className="bg-white1">
              <Dashboard />
            </Layout>
          ) : (
            <Login />
          )
        }
      />
      <Route
        path="/tenant"
        element={
          user ? (
            <Layout className="bg-white1">
              <Tenant />
            </Layout>
          ) : (
            <Login />
          )
        }
      />
      <Route
        path={`/tenantprofile/:id`}
        element={
          user ? (
            <Layout className="bg-white1">
              <TenantProfile />
            </Layout>
          ) : (
            <Login />
          )
        }
      />
      <Route
        path="/apartment"
        element={
          <Layout className="bg-white1">
            <Apartment />
          </Layout>
        }
      />
      <Route
        path="/apartmentprofile"
        element={
          <Layout className="bg-white1">
            <ApartmentProfile />
          </Layout>
        }
      />
      <Route
        path="/security"
        element={
          <Layout className="bg-white1">
            <Security />
          </Layout>
        }
      />

      <Route
        path="/security"
        element={
          <Layout className="bg-white1">
            <Security />
          </Layout>
        }
      />
      <Route
        path="/concern&issue"
        element={
          <Layout className="bg-white1">
            <Concern />
          </Layout>
        }
      />
      <Route
        path="/viewconcern"
        element={
          <Layout>
            <ViewConcern />
          </Layout>
        }
      />

      <Route
        path="/profile"
        element={
          <Layout className="bg-white1">
            <Profile />
          </Layout>
        }
      />
      <Route
        path="/document/lease-agreement"
        element={
          <Layout className="bg-white1">
            <Least />
          </Layout>
        }
      />
      <Route
        path="/document/invoice"
        element={
          <Layout className="bg-white1">
            <Invoice />
          </Layout>
        }
      />
    </Routes>
  )
}

export default App
