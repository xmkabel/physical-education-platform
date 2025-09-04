import React, { createContext, useState, useContext, useEffect } from "react";
import axiosInstance from "../services/axios";
import LoadingScreen from "../components/LoadingScreen";

export const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setAuthToken(token);
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    setLoading(false);
  }, []);

  const login = async (code, password) => {
    try {
      setError(null);
      const response = await axiosInstance.post('/login', { code, password });
      const { access_token } = response.data;

      if (access_token) {
        localStorage.setItem('token', access_token);
        setAuthToken(access_token);
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
        return response.data;
      }
    } catch (err) {
      setError(err.response?.data?.message || 'حدث خطأ في تسجيل الدخول');
      throw err;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    delete axiosInstance.defaults.headers.common['Authorization'];
    setAuthToken(null);
  };

  const isAuthenticated = () => {
    return !!authToken;
  };

  return (
    <AuthContext.Provider 
      value={{ 
        authToken, 
        setAuthToken, 
        login, 
        logout, 
        isAuthenticated,
        loading,
        error 
      }}
    >
      {!loading ? children : <LoadingScreen />}
    </AuthContext.Provider>
  );
};
