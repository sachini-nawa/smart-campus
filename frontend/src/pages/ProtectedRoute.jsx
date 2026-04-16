import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, adminOnly = false }) {
  const authenticated = localStorage.getItem("authenticated") === "true";
  const role = localStorage.getItem("role");

  if (!authenticated) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && role !== "ADMIN") {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;