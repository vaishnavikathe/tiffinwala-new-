import API from "./api";

// Dashboard
export const getDashboard = () => API.get("/vendor/dashboard");

// ✅ FIXED PLANS API
export const getPlans = () => API.get("/plan");
export const createPlan = (data) => API.post("/plan/create", data);
export const updatePlan = (id, data) => API.put(`/plan/${id}`, data);
export const deletePlan = (id) => API.delete(`/plan/${id}`);

// Menu
export const addMenu = (data) => API.post("/vendor/menu", data);

// Users
export const getUsers = () => API.get("/vendor/users");