import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  // no token → login page
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // token exists → allow access
  return children;
};

export default ProtectedRoute;