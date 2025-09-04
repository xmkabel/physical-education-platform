
import { Navigate } from "react-router-dom";
// import { isAuthenticated } from "../services/authService";
import { useAuth } from "../context/AuthContext";
function ProtectedRoute({ children }) {
  const { isAuthenticated  } = useAuth();

  return isAuthenticated() ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;
