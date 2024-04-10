import React from 'react'
import { Route,  Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

// Higher-order component to protect routes
const ProtectedRoute = ({
  element,
  adminRequired,
  tenantRequired,
  ...rest
}) => {
  const user = useSelector((state) => state.auth.data)

  const isAdmin = () => user && user.role === 'admin'
  const isTenant = () => user && user.role === 'tenant'

  return (
    <Route
      {...rest}
      element={
        user ? (
          adminRequired && !isAdmin() ? (
            <Navigate to="/unauthorized" />
          ) : tenantRequired && !isTenant() ? (
            <Navigate to="/unauthorized" />
          ) : (
            <Layout className="bg-white1">{element}</Layout>
          )
        ) : (
          <Navigate to="/login" />
        )
      }
    />
  )
}
export default ProtectedRoute
