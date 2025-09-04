import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../services/authService";
import get from "./api/get";

const AdminProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (!isAuthenticated()) {
        setUser(null);
        setLoading(false);
        return;
      }

      try {
        const data = await get("/me"); // هنا بيرجع البيانات مباشرة
        setUser(data);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) return <div>Loading...</div>;

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
