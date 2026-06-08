import { Routes, Route, Navigate } from "react-router-dom";

// Layouts
import Layout from "./components/layout/Layout";
import DashboardLayout from "./components/vendorDashboard/layout/VendorDashboardLayout";
import UserDashboardLayout from "./components/user/UserDashboardLayout";
import VendorProfile from "./components/vendorDashboard/layout/VendorProfile";

// Auth Pages
import VendorLogin from "./pages/Auth/VendorLogin";
import VendorRegister from "./pages/Auth/VendorRegister";
import UserLogin from "./pages/Auth/UserLogin";
import UserRegister from "./pages/Auth/UserRegister";
import AdminLogin from "./pages/Auth/AdminLogin";

// Home
import Home from "./pages/Home/Home";
import About from "./pages/Home/About";
import Contact from "./pages/Home/Contact";

// Admin
import AdminDashboard from "./pages/admin/AdminDashboard";

// Vendor
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/vendor/Dashboard";
import AddMealPlan from "./pages/vendor/PlanManagement";
import EditMealPlan from "./pages/vendor/EditMealPlan";
import MenuManagement from "./pages/vendor/MenuManagement";
import Users from "./pages/vendor/Users";

// User
import UserDashboard from "./pages/user/UserDashboard";
import Vendors from "./pages/user/Vendors";
import VendorDetails from "./pages/user/VendorDetails"; 
import PlanDetails from "./pages/user/PlanDetails";
import SubscriptionPage from "./pages/user/SubscriptionPage";
import UserProfile from "./components/user/UserProfile";
import BillingPage from "./pages/user/BillingPage";


const App = () => {
  return (
    <Routes>

      {/* MAIN */}
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Route>

      {/* AUTH */}
      <Route path="/vendor-login" element={<VendorLogin />} />
      <Route path="/vendor-register" element={<VendorRegister />} />
      <Route path="/user-login" element={<UserLogin />} />
      <Route path="/user-register" element={<UserRegister />} />
      <Route path="/admin-login" element={<AdminLogin />} />

      {/* VENDOR DASHBOARD */}
      <Route element={<ProtectedRoute role="vendor" />}>
        <Route element={<DashboardLayout />}>
          <Route path="/vendor" element={<Navigate to="/vendor/dashboard" />} />
          <Route path="/vendor/dashboard" element={<Dashboard />} />
          <Route path="/vendor/add-plan" element={<AddMealPlan />} />
          <Route path="/vendor/edit-plan/:id" element={<EditMealPlan />} />
          <Route path="/vendor/menu" element={<MenuManagement />} />
          <Route path="/vendor/profile" element={<VendorProfile />} />
          <Route path="/vendor/users" element={<Users />} />
          
        </Route>
      </Route>

      {/* USER DASHBOARD */}
        <Route element={<ProtectedRoute role="user" />}>
          <Route element={<UserDashboardLayout />}>
            <Route path="/user" element={<UserDashboard />} />
            <Route path="/user/vendors" element={<Vendors />} />
            <Route path="/user/vendors/:id" element={<VendorDetails />} />
            <Route path="/user/plan/:planId" element={<PlanDetails />} />
            <Route path="/user/subscription" element={<SubscriptionPage />} />
            <Route path="/user/profile" element={<UserProfile />} />
            <Route path="/user/billing" element={<BillingPage />} />
          </Route>
        </Route>
        
          {/* Vendors List */}
          <Route path="/user/vendors" element={<Vendors />} />

          {/* Vendor Details (plans + menu inside this) */}
          <Route path="/user/vendors/:id" element={<VendorDetails />} />

          {/* Plan Details */}
          <Route path="/user/plan/:planId" element={<PlanDetails />} />

        
    

      {/* ADMIN DASHBOARD PANELS */}
      {/* Note: You can nest this inside a ProtectedRoute later if needed */}
      <Route path="/admin/dashboard" element={<AdminDashboard />} />

      {/* 404 */}
      <Route
        path="*"
        element={
          <h1 className="text-center mt-10 text-2xl">
            404 - Page Not Found
          </h1>
        }
      />

    </Routes>
  );
};

export default App;