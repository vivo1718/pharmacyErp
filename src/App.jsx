import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Inventory from "./pages/Inventory";
import Billing from "./pages/Billing";
import Customers from "./pages/Customers";
import Reports from "./pages/Reports";
import Login from "./pages/Login";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AddMedicine from "./pages/AddMedicine";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import ProtectedRouter from "./components/ProtectedRouter";
import Signup from "./pages/Signup";
import AutoLogout from "./components/AutoLogout";

function App() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("lastActivityTime");
    window.location.href = "/"; // Redirect to login
  };
  

  return (
    <BrowserRouter>
          <AutoLogout onLogout={handleLogout} />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        {/* Protected Routes */}
        <Route
          path="/*"
          element={
            <ProtectedRouter>
              <div className="flex">
                <Sidebar isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />
                <div className="flex-1">
                  <Navbar />
                  <Routes>
                    <Route path="/dashboard" element={<Dashboard isCollapsed={isCollapsed} />} />
                    <Route path="/inventory" element={<Inventory isCollapsed={isCollapsed} />} />
                    <Route path="/billing" element={<Billing isCollapsed={isCollapsed} />} />
                    <Route path="/customers" element={<Customers isCollapsed={isCollapsed} />} />
                    <Route path="/reports" element={<Reports isCollapsed={isCollapsed} />} />
                    <Route path="/add-medicine" element={<AddMedicine />} />
                  </Routes>
                </div>
              </div>
            </ProtectedRouter>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
