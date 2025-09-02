import React from "react";

import { Navigate } from "react-router-dom";

import { isAuthenticated } from "../services/authService";
import { me } from "../services/authService";
function ProtectedRoute({ children }) {
  if (isAuthenticated()) {
    const user = me();
    if (user && user.role === "admin") {
      return children;
    } else {
      return <Navigate to="/unauthorized" />;
    }
  } else {
    return <Navigate to="/unauthorized" />;
  }
}

export default ProtectedRoute;
