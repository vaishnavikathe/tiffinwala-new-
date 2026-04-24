import axios from "axios";

// Base API instance
const API = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Attach token automatically to every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// =========================
// USER APIs
// =========================

export const loginUser = async (data) => {
  try {
    const payload =
      data.identifier.includes("@")
        ? { email: data.identifier, password: data.password }
        : { mobile: data.identifier, password: data.password };

    const response = await API.post("/user/login", payload);

    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "User login failed" };
  }
};

export const registerUser = async (data) => {
  try {
    const payload = {
      name: data.name,
      email: data.email,
      address: data.address,
      mobile: data.phone,
      password: data.password,
    };

    const response = await API.post("/user/register", payload);

    return response.data;
  } catch (error) {
    throw error.response?.data || {
      message: "User registration failed",
    };
  }
};

// =========================
// VENDOR APIs
// =========================

export const loginVendor = async (data) => {
  try {
    const payload =
      data.identifier.includes("@")
        ? { email: data.identifier, password: data.password }
        : { mobile: data.identifier, password: data.password };

    const response = await API.post("/vendor/login", payload);

    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Vendor login failed" };
  }
};

export const registerVendor = async (data) => {
  try {
    const payload = {
      ownerName: data.name,
      email: data.email,
      mobile: data.phone,
      password: data.password,
      cuisine: data.cuisine,
      shopName: data.shopName,
      address: data.shopAddress,
    };

    const response = await API.post("/vendor/register", payload);

    return response.data;
  } catch (error) {
    throw error.response?.data || {
      message: "Vendor registration failed",
    };
  }
};

export default API;