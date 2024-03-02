import { Route, Routes } from "react-router-dom";
import Dashboard from "./Page/Admin/Dashboard";
import Sidebar from "./Component/Sidebar";
import Layout from "./Component/Layout";
import Tenant from "./Page/Admin/Tenant";
import Apartment from "./Page/Admin/Apartment";
import Security from "./Page/Admin/Security";
import Concern from "./Page/Admin/Concern";
import Profile from "./Page/Admin/Profile";
import Least from "./Page/Admin/Least";
import Invoice from "./Page/Admin/Invoice";
import Login from "./Page/Login";
import TenantCard from "./Component/TenantCard";
import TenantProfile from "./Page/Admin/TenantProfile";
import ApartmentProfile from "./Page/Admin/ApartmentProfile";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route
        path="/dashboard"
        element={
          <Layout className="bg-white1">
            <Dashboard />
          </Layout>
        }
      />
      <Route
        path="/tenant"
        element={
          <Layout className="bg-white1">
            <Tenant />
          </Layout>
        }
      />
      <Route
        path="/tenantprofile"
        element={
          <Layout className="bg-white1">
            <TenantProfile />
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
        path="/concern&issue"
        element={
          <Layout className="bg-white1">
            <Concern />
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
        path="/document/LeastAgreement"
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
  );
}

export default App;
