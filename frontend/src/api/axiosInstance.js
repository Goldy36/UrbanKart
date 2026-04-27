import axios from "axios";

const rawApiUrl = (import.meta.env.VITE_API_URL || "").trim().replace(/\/$/, "");
const SERVER_BASE_URL = rawApiUrl.replace(/\/api$/i, "");

const API = axios.create({
  baseURL: `${SERVER_BASE_URL}/api`,
});

API.interceptors.request.use((config) => {
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
  return `${SERVER_BASE_URL}${imagePath.startsWith("/") ? imagePath : `/${imagePath}`}`;
};

export default API;
