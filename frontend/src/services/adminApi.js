// adminApi.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/admin",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("adminToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Dashboard
export const getDashboardStats = () =>
  API.get("/dashboard");

// Recent Subscriptions
export const getRecentSubscriptions = () =>
  API.get("/recent-subscriptions");

export default API;