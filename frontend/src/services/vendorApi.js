import API from "./api";

// Dashboard
export const getDashboard = () => API.get("/vendor/dashboard");

// FIXED PLANS API
export const getPlans = () => API.get("/plan");
export const createPlan = (data) => API.post("/plan/create", data);
export const updatePlan = (id, data) => API.put(`/plan/${id}`, data);
export const deletePlan = (id) => API.delete(`/plan/${id}`);

// Menu

export const addMenu = (data) => API.post(`/menu/${data.planId}`, {
    day: data.day,
    mealType: data.mealType,
    items: data.items
  });
// Users
export const getUsers = () => API.get("/vendor/users");


// Get menu

export const getMenus = () => API.get("/menu");
// Edit Menu
export const updateMenu = (id, data) => API.put(`/menu/${id}`, data);


export const getVendorProfile = () =>
  API.get("/vendor/profile");

export const updateVendorProfile = (data) =>
  API.put("/vendor/profile", data);
/*export const updateVendorProfile = (data) =>
  API.put("/vendor/update-profile", data);*/


  