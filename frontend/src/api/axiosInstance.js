import axios from "axios";

const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("urbankart_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const SERVER_BASE_URL = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");

export const getImageUrl = (imagePath) => {
  if (!imagePath) return "";
  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    return imagePath;
  }
  return `${SERVER_BASE_URL}${imagePath.startsWith("/") ? imagePath : `/${imagePath}`}`;
};

export default API;
