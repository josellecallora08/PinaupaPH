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
import OTPVerify from './Page/OTPVerify'
import ResetPass from './Page/ResetPass'
import TenantLayout from './Component/Tenant Component/TenantLayout'
import TenantPayment from './Page/Tenant/TenantPayment'
import TenantInvoice from './Page/Tenant/TenantInvoice'
import TenantConcern from './Page/Tenant/TenantConcern'
import TenantLease from './Page/Tenant/TenantLease'
import TenantSecurity from './Page/Tenant/TenantSecurity'
import TenantHome from './Page/Tenant/TenantHome'
import ProfileTenant from './Page/Tenant/ProfileTenant'
import TenantViewConcern from './Page/Tenant/TenantViewConcern'

function App() {
  const user = useSelector((state) => state.auth.isAuthenticated)
  const role = useSelector((state) => state.auth.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(isLoggedin())
    console.log('1')
  }, [])

  return (
    <Routes>
      <Route
        path="/"
        element={user ? <Navigate to="/dashboard" /> : <Login />}
      />
      <Route path="/forgot-password" element={<ForgotPass />} />
      <Route path="/otp-verify/:id" element={<OTPVerify />} />
      <Route path="/reset-password/:id" element={<ResetPass />} />
      <Route
        path="/dashboard"
        element={
          role?.role === 'Admin' ? (
            <Layout className="bg-white1">
              <Dashboard />
            </Layout>
          ) : role?.role === 'Tenant' ? (
            <TenantHome />
          ) : (
            <Navigate to="/" />
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
        path={`/apartment/:id`}
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
        path={`/view-concern/:id`}
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

      {/* Tenant Side */}
      <Route
        path="/tenant/home"
        element={
          <TenantLayout className="bg-white1">
            <TenantHome />
          </TenantLayout>
        }
      />
            <Route
        path="/tenant/profile"
        element={
          <TenantLayout className="bg-white1">
            <ProfileTenant />
          </TenantLayout>
        }
      />
        <Route
        path="/tenant/security"
        element={
          <TenantLayout className="bg-white1">
            <TenantSecurity />
          </TenantLayout>
        }
      />
            <Route
        path="/tenant/document/lease"
        element={
          <TenantLayout className="bg-white1">
            <TenantLease />
          </TenantLayout>
        }
      />
      <Route
        path="/tenant/document/invoice"
        element={
          <TenantLayout className="bg-white1">
            <TenantInvoice />
          </TenantLayout>
        }
      />
            <Route
        path="/tenant/payment"
        element={
          <TenantLayout className="bg-white1">
            <TenantPayment />
          </TenantLayout>
        }
      />
      <Route
        path="/tenant/concern"
        element={
          <TenantLayout className="bg-white1">
            <TenantConcern />
          </TenantLayout>
        }
      />
            <Route
        path="/tenant/viewconcern"
        element={
          <TenantLayout className="bg-white1">
            <TenantViewConcern />
          </TenantLayout>
        }
      />

    

    </Routes>
  )
}

export default App
