import axios from "axios";
  const vendorAPI = axios.create({
  baseURL: "http://localhost:5000/api",
});

vendorAPI.interceptors.request.use((config) => {
  const token = localStorage.getItem("vendorToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});


// Dashboard
export const getDashboard = () => vendorAPI.get("/vendor/dashboard");

// FIXED PLANS API
export const getPlans = () => vendorAPI.get("/plan");
export const createPlan = (data) => vendorAPI.post("/plan/create", data);
export const updatePlan = (id, data) => vendorAPI.put(`/plan/${id}`, data);
export const deletePlan = (id) => vendorAPI.delete(`/plan/${id}`);

// Menu

export const addMenu = (data) => vendorAPI.post(`/menu/${data.planId}`, {
    day: data.day,
    mealType: data.mealType,
    items: data.items
  });
// Users
export const getUsers = () => vendorAPI.get("/vendor/subscribers");


// Get menu

export const getMenus = () => vendorAPI.get("/menu");
// Edit Menu
export const updateMenu = (id, data) => vendorAPI.put(`/menu/${id}`, data);


export const getVendorProfile = () =>
  vendorAPI.get("/vendor/profile");

export const updateVendorProfile = (data) =>
  vendorAPI.put("/vendor/profile", data);
/*export const updateVendorProfile = (data) =>
  API.put("/vendor/update-profile", data);*/


  export default vendorAPI;