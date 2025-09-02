import axios from 'axios';
// Create an Axios instance

const axiosInstance = axios.create({

  baseURL: 'http://127.0.0.1:8000/api',

});


axiosInstance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');  // Get the token from localStorage
    if (token) {

      config.headers.Authorization = `Bearer ${token}`;  // Attach token to Authorization header

    }
    return config;
  },
  error => Promise.reject(error)  // Handle request error

);

export default axiosInstance;