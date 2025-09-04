import React, { createContext, useState, useContext, useEffect } from "react";
import axiosInstance from "../services/axios";

export const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null); // هنا هنخزن بيانات اليوزر
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // أول ما التطبيق يفتح
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setAuthToken(token);
      axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      fetchUser(); // نجيب بيانات اليوزر
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUser = async () => {
    try {
      const res = await axiosInstance.get("/me");
      setUser(res.data);
    } catch (err) {
      console.error("Failed to fetch user:", err);
      setUser(null);
      localStorage.removeItem("token");
    } finally {
      setLoading(false);
    }
    // if(!(localStorage.getItem("token"))) {
    //   setUser(null);
    // }
  };

  const login = async (code, password) => {
    try {
      setError(null);
      const response = await axiosInstance.post("/login", { code, password });
      const { access_token } = response.data;

      if (access_token) {
        localStorage.setItem("token", access_token);
        setAuthToken(access_token);
        axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;

        await fetchUser(); // بعد تسجيل الدخول هات بيانات اليوزر
        return response.data;
      }
    } catch (err) {
      setError(err.response?.data?.message || "حدث خطأ في تسجيل الدخول");
      throw err;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    delete axiosInstance.defaults.headers.common["Authorization"];
    setAuthToken(null);
    setUser(null);
  };

  const isAuthenticated = () => {
    return !!authToken;
  };

  return (
    <AuthContext.Provider
      value={{
        authToken,
        setAuthToken,
        user,          // بيانات اليوزر متاحة هنا
        setUser,
        login,
        logout,
        isAuthenticated,
        loading,
        error,
      }}
    >
      {!loading ? children : <div>Loading...</div>}
    </AuthContext.Provider>
  );
};
