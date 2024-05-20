import { Route, Routes } from 'react-router-dom'
import Dashboard from './Page/Admin/Dashboard'
import Layout from './Component/Layout'
import Tenant from './Page/Admin/Tenant'
import Apartment from './Page/Admin/Apartment'
import Security from './Page/Admin/Security'
import Concern from './Page/Admin/Concern'
import Profile from './Page/Admin/Profile'
import Least from './Page/Admin/Lease'
import Invoice from './Page/Admin/Invoice'
import Login from './Page/Login'
import TenantProfile from './Page/Admin/TenantProfile'
import ApartmentProfile from './Page/Admin/ApartmentProfile'
import ViewConcern from './Page/Admin/ViewConcern'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { isLoggedin } from './features/authentication'
import { useNavigate, Navigate } from 'react-router-dom'
import ForgotPass from './Page/ForgotPass'
import OTPVerify from './Page/OTPVerify'
import ResetPass from './Page/ResetPass'
import TenantPayment from './Page/Tenant/TenantPayment'
import TenantHome from './Page/Tenant/TenantHome'
import ProfileTenant from './Page/Tenant/ProfileTenant'
import InvoiceFormat from './Component/InvoiceFormat'
import TermsAndConditions from './Page/TermsAndCondition'
import ContactUsAdmin from './Page/ContactUs'
import ErrorPage from './Page/ErrorPage'
import Announcement from './Page/Admin/Announcement'
import LeaseView from './Page/Admin/LeaseView'
import SuperAdmin from './Page/SuperAdmin'
import PaymentStatus from './Component/LoadingComponent/PaymentStatus'
function App() {
  const user = useSelector((state) => state.auth.isAuthenticated)
  const role = useSelector((state) => state.auth.user)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(isLoggedin())
  }, [])

  return (
    <Routes>
      <Route path="*" element={<ErrorPage />} />
      <Route
        path="/"
        element={user ? <Navigate to="/dashboard" /> : <Login />}
      />
      <Route
        path="/verify-payment/status/:invoice_id"
        element={<PaymentStatus />}
      />
      <Route path="/forgot-password" element={<ForgotPass />} />
      <Route path="/contact" element={<ContactUsAdmin />} />
      <Route path="/otp-verify/:id" element={<OTPVerify />} />
      <Route path="/reset-password/:id" element={<ResetPass />} />
      <Route
        path="/terms&condition"
        element={
          user ? (
            <Layout>
              <TermsAndConditions />
            </Layout>
          ) : (
            <Navigate to={'/'} />
          )
        }
      />
      <Route
        path="/contact"
        element={
          user ? (
            <Layout className="bg-white1">
              <ContactUsAdmin />
            </Layout>
          ) : (
            <Navigate to={'/'} />
          )
        }
      />
    
      <Route
        path="/dashboard"
        element={
          role?.role === 'Admin' ? (
            <Layout className="bg-white1">
              <Dashboard />
            </Layout>
          ) : role?.role === 'Superadmin' ? (
            <SuperAdmin />
          ) : role?.user_id.role === 'Tenant' ? (
            <Layout className="bg-white1">
              <TenantHome />
            </Layout>
          ) : (
            <Navigate to="/" />
          )
        }
      />
      <Route
        path="/tenantprofile/:id"
        element={
          <Layout className="bg-white1">
            <TenantProfile />
          </Layout>
        }
      />

      <Route
        path="/announcement"
        element={
          role?.role === 'Admin' ? (
            <Layout className="bg-white1">
              <Announcement />
            </Layout>
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
            <Navigate to={'/'} />
          )
        }
      />
      <Route
        path="/concern&issue"
        element={
          user ? (
            <Layout className="bg-white1">
              <Concern />
            </Layout>
          ) : (
            <Navigate to="/" />
          )
        }
      />
      <Route
        path={`/view-concern/:id`}
        element={
          <Layout className="bg-white1">
            <ViewConcern />
          </Layout>
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
        path="/agreement/:contract_id/:reference"
        element={
          <Layout className="bg-white1">
            <LeaseView />
          </Layout>
        }
      />
      <Route
        path="/invoice/:invoice_id"
        element={
          <Layout className="bg-white1">
            <InvoiceFormat />
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
          user ? (
            <Layout className="bg-white1">
              <Security />
            </Layout>
          ) : (
            <Navigate to="/" />
          )
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
          user ? (
            <Layout className="bg-white1">
              <Invoice />
            </Layout>
          ) : (
            <Navigate to="/" />
          )
        }
      />

      {/* Tenant Side */}

      <Route
        path="/profile"
        element={
          role?.role === 'Admin' || role?.role === 'Superadmin' ? (
            <Layout className="bg-white1">
              <Profile />
            </Layout>
          ) : role?.user_id?.role === 'Tenant' ? (
            <Layout className="bg-white1">
              <ProfileTenant />
            </Layout>
          ) : (
            <Navigate to="/" />
          )
        }
      />
      <Route
        path="/tenant/payment/:id"
        element={
          <Layout className="bg-white1">
            <TenantPayment />
          </Layout>
        }
      />

      {/* SuperAdmin */}
      <Route
        path="/announcement"
        element={
          role?.role === 'SuperAdmin' ? (
            <Layout className="bg-white1">
              <SuperAdmin />
            </Layout>
          ) : (
            <Navigate to="/" />
          )
        }
      />
    </Routes>
  )
}

export default App
