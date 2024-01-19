

import {Route,Routes} from "react-router-dom"
import Dashboard from "./Page/Admin/Dashboard"
import Sidebar from "./Component/Sidebar"
import Layout from "./Component/Layout"
import Tenant from "./Page/Admin/Tenant"
import Apartment from "./Page/Admin/Apartment"
import Security from "./Page/Admin/Security"
import Concern from "./Page/Admin/Concern"
import Profile from "./Page/Admin/Profile"
import Least from "./Page/Admin/Least"
import Invoice from "./Page/Admin/Invoice"
import Login from "./Page/Login"
import TenantCard from "./Component/TenantCard"
import TenantProfile from "./Page/Admin/TenantProfile"

function App() {
  

  return (
 <>
  <Layout className="bg-white1">
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/tenant" element={<Tenant />} />
      <Route path="/tenantprofile" element={<TenantProfile />} />
      <Route path="/apartment" element={<Apartment />} /> 
      <Route path="/security" element={<Security />} />
      <Route path="/concern&issue" element={<Concern />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/document/LeastAgreement" element={<Least />} />
      <Route path="/document/invoice" element={<Invoice />} />
    </Routes>
  </Layout>
 </>
   
  )
}

export default App
