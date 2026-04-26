import axios from "axios";

const configuredApiUrl = import.meta.env.VITE_API_URL?.trim();
const fallbackApiUrl = import.meta.env.DEV ? "http://localhost:5000/api" : "/api";

export const API_BASE_URL = configuredApiUrl || fallbackApiUrl;
export const SERVER_BASE_URL = API_BASE_URL.replace(/\/api\/?$/, "");

const axiosInstance = axios.create({
  baseURL: API_BASE_URL
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("urbankart_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getImageUrl = (imagePath) => {
  if (!imagePath) return "";
  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    return imagePath;
  }
  return `${SERVER_BASE_URL}${imagePath}`;
};

export default axiosInstance;
