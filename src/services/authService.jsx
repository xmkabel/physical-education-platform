import axiosInstance from "./axios";

export const login = async (code, password) => {
  const response = await axiosInstance.post("/login", { code, password });

  const { access_token } = response.data;

  if (access_token) {
    localStorage.setItem("token", access_token); // Store token in localStorage
  }

  return response.data;
};

export const logout = () => {
  localStorage.removeItem("token"); // Remove token from localStorage
};

export const isAuthenticated = () => {
  return !!localStorage.getItem("token"); // Check if token exists
};

// function me(){
//   return axiosInstance.get("/me");  
// }
// export { me };