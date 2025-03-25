import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) return null;

  if (!user || !user.userId) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;
