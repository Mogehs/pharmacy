// components/ProtectedRoute.jsx
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const RequireAdmin = ({ children }) => {
  const user = useSelector((state) => state.user.user);
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  // Authorized as admin — allow access
  return children;
};

export default RequireAdmin;
