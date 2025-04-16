import React from "react";
import { Navigate, useLocation } from "react-router";
import { useAuth } from "../contexts/AuthContext";

export default function ProtectedRoute({ children, requiredRole }) {
  const { user } = useAuth();
  const location = useLocation();

  // not logged in → send to /login
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // logged in but wrong role → send to /login
  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // otherwise show the protected children
  return children;
}
