import { Routes, Route, Navigate } from "react-router-dom";

// Layouts
import Layout from "./components/layout/Layout";
import DashboardLayout from "./components/vendorDashboard/layout/VendorDashboardLayout";
import UserDashboardLayout from "./components/user/UserDashboardLayout"; // ✅ ADD THIS

// Auth Pages
import VendorLogin from "./pages/Auth/VendorLogin";
import VendorRegister from "./pages/Auth/VendorRegister";
import UserLogin from "./pages/Auth/UserLogin";
import UserRegister from "./pages/Auth/UserRegister";

// Home
import Home from "./pages/Home/Home";
import About from "./pages/Home/About";
import Contact from "./pages/Home/Contact";

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
import VendorPlans from "./pages/user/VendorPlans";
import PlanDetails from "./pages/user/PlanDetails";

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

      {/* VENDOR DASHBOARD */}
      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>

          <Route path="/vendor" element={<Navigate to="/vendor/dashboard" />} />
          <Route path="/vendor/dashboard" element={<Dashboard />} />
          <Route path="/vendor/add-plan" element={<AddMealPlan />} />
          <Route path="/vendor/edit-plan/:id" element={<EditMealPlan />} />
          <Route path="/vendor/menu" element={<MenuManagement />} />
          <Route path="/vendor/users" element={<Users />} />

        </Route>
      </Route>

      {/* USER DASHBOARD */}
      <Route element={<ProtectedRoute />}>
        <Route element={<UserDashboardLayout />}> {/* ✅ IMPORTANT */}

          <Route path="/user" element={<UserDashboard />} />
          <Route path="/user/vendors" element={<Vendors />} />
          <Route path="/user/vendors/:vendorId" element={<VendorPlans />} />
          <Route path="/user/plan/:planId" element={<PlanDetails />} />

        </Route>
      </Route>

      {/* 404 */}
      <Route path="*" element={<h1 className="text-center mt-10 text-2xl">404 - Page Not Found</h1>} />

    </Routes>
  );
};

export default App;