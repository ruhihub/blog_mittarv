import axios from "axios";
const API_URL = import.meta.env.VITE_REACT_APP_BACKEND_URL;


const axiosInstance = axios.create({
  // baseURL: "http://localhost/8000/api",
  baseURL: `${API_URL}/api`,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
