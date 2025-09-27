import React, { createContext, useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axiosInstance from '../services/axios';
import LoadingScreen from '../components/LoadingScreen';

const LoadingContext = createContext({ loading: false, setLoading: () => {} });

export const useLoading = () => useContext(LoadingContext);

export const LoadingProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const location = useLocation(); // عشان نعرف إحنا فين

  useEffect(() => {
    // counter to support concurrent requests
    let activeRequests = 0;

    const reqId = axiosInstance.interceptors.request.use(
      (config) => {
        activeRequests++;
        setLoading(true);
        return config;
      },
      (error) => Promise.reject(error)
    );

    const resId = axiosInstance.interceptors.response.use(
      (response) => {
        activeRequests--;
        if (activeRequests <= 0) setLoading(false);
        return response;
      },
      (error) => {
        activeRequests--;
        if (activeRequests <= 0) setLoading(false);
        return Promise.reject(error);
      }
    );

    return () => {
      axiosInstance.interceptors.request.eject(reqId);
      axiosInstance.interceptors.response.eject(resId);
    };
  }, []);

  // المسارات اللي مش عايز اللودينج يشتغل فيها
  const HIDE_LOADING_PATHS = ['/login', '/register'];

  const shouldShowLoading =
    loading && !HIDE_LOADING_PATHS.includes(location.pathname);

  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {children}
      {shouldShowLoading && <LoadingScreen />}
    </LoadingContext.Provider>
  );
};
