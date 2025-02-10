import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Inventory from "./pages/Inventory";
import Billing from "./pages/Billing";
import Customers from "./pages/Customers";
import Reports from "./pages/Reports";
import Login from "./pages/Login";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import { useState,useEffect } from "react";
import AddMedicine from "./pages/AddMedicine";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Signup from "./pages/Signup";
function App() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [user, setUser] = useState(null);
  
    const toggleSidebar = () => {
      setIsCollapsed(!isCollapsed);
    };
  return (
    <BrowserRouter>
      <div className="flex">
        <Sidebar isCollapsed={isCollapsed} toggleSidebar={toggleSidebar}  />
        <div className="flex-1">
          <Navbar />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            <Route path="/dashboard" element={<Dashboard isCollapsed={isCollapsed}  />} />
            <Route path="/inventory" element={<Inventory isCollapsed={isCollapsed} />} />
            <Route path="/billing" element={<Billing isCollapsed={isCollapsed}/>} />
            <Route path="/customers" element={<Customers isCollapsed={isCollapsed} />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route path="/reports" element={<Reports isCollapsed={isCollapsed} />} />
            <Route path="/add-medicine" element={<AddMedicine  />} />

          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;