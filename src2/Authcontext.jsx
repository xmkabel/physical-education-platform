import React, { createContext, useState, useEffect } from "react";

// Create Auth Context
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(localStorage.getItem("authToken"));

  const logout = () => {
    localStorage.removeItem("authToken");
    setAuthToken(null);
  };

  useEffect(() => {
    // If the user refreshes the page, check for the token in localStorage
    const token = localStorage.getItem("authToken");
    setAuthToken(token);
  }, []);

  return (
    <AuthContext.Provider value={{ authToken, setAuthToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
