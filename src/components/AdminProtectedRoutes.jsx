import { Navigate } from "react-router-dom";
// import { isAuthenticated } from "../services/authService";
import { useAuth } from "../context/AuthContext";
import LoadingScreen from "./LoadingScreen";
const AdminProtectedRoute = ({ children }) => {
  const { user, loading ,isAuthenticated} = useAuth();

  if (loading) return <LoadingScreen />;

  if (isAuthenticated() && user) {
    if (user.role === "admin") {
      console.log("user", user);
      return children;
    } else {
      console.log("user", user);
      return <Navigate to="/unauthorized" />;
    }
  } else {
    return <Navigate to="/login" replace />;
  }
};

export default AdminProtectedRoute;
