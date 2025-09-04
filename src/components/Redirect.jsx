import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
function Redirect() {
  const { user } = useAuth();

  if (user) {
    if (user.role === "admin") {
      return <Navigate to="/admin-dashboard" />;
    } else {
      return <Navigate to="/exams/start" />;
    }
    
  }

  return <Navigate to="/login" />;
}

export default Redirect;
