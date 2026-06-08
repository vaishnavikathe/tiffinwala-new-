// adminApi.js
import axios from "axios";

const adminAPI = axios.create({
  baseURL: "http://localhost:5000/api/admin",
});

adminAPI.interceptors.request.use((config) => {
  const token = localStorage.getItem("adminToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Dashboard
export const getDashboardStats = () =>
  adminAPI.get("/dashboard");

// Recent Subscriptions
export const getRecentSubscriptions = () =>
  adminAPI.get("/recent-subscriptions");

export default adminAPI;