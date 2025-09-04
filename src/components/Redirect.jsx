import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
function Redirect() {
const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // أو سبينر
  }else{
  if (user) {
    if (user.role === "admin") {
      return <Navigate to="/admin-dashboard" />;
    } else {
      return <Navigate to="/exams/start" />;
    }
    
  }
  console.log(user);
  
  return <Navigate to="/login" />;
}
}

export default Redirect;
