import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function ProtectedRoute({ children, requiredRole }) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    // not logged in
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requiredRole && user.role?.toLowerCase() !== requiredRole.toLowerCase()) {
    // wrong role
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
