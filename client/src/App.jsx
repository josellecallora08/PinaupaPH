

import {Route,Routes} from "react-router-dom"
import Dashboard from "./Page/Dashboard"
import Sidebar from "./Component/Sidebar"
import Layout from "./Component/Layout"
import Tenant from "./Page/Tenant"
import Apartment from "./Page/Apartment"
import Security from "./Page/Security"
import Concern from "./Page/Concern"
import Profile from "./Page/Profile"
import Least from "./Page/Least"
import Invoice from "./Page/Invoice"

function App() {
  

  return (
 <>
  <Layout>
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/tenant" element={<Tenant />} />
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
