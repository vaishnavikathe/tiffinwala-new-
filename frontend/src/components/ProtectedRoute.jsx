import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ role }) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  if (!token) {
    return <Navigate to={role === "vendor" ? "/vendor-login" : "/user-login"} replace />;
  }

  if (role && userRole !== role) {
    return <Navigate to={role === "vendor" ? "/vendor-login" : "/user-login"} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;