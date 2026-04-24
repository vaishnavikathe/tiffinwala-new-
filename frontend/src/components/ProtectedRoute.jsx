import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/vendor-login" replace />;
  }

  return <Outlet />; // ✅ THIS FIXES YOUR BLANK SCREEN
};

export default ProtectedRoute;