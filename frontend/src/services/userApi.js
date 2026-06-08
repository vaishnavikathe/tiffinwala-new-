import axios from "axios";

const userAPI = axios.create({
  baseURL: "http://localhost:5000/api",
});
userAPI.interceptors.request.use((config) => {
  const token = localStorage.getItem("userToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default userAPI;

//Get vendors (pagination handled by backend)
export const getVendors = ({ page = 1, limit = 9 } = {}) => {
  return userAPI.get(`/vendor/all?page=${page}&limit=${limit}`);
};

//  Get plans by vendor
export const getVendorDetails = (vendorId) => {
  return userAPI.get(`/vendor/${vendorId}/details`);
};

//  Get menu by plan
export const getPlanByMenu = (planId) =>
  userAPI.get(`/menu/plan/${planId}`);

//Subscribe to a plan
export const createSubscription = ({ vendorId, planId }) =>
  userAPI.post("/subscription", { vendorId, planId });

// Get user's subscriptions
export const getUserSubscriptions = () =>
  userAPI.get("/subscription");

// User Profile
export const getUserProfile = () => userAPI.get("/user/profile");
export const updateUserProfile = (data) => userAPI.put("/user/profile", data);

// Cancel subscription
export const cancelSubscription = (id) =>
  userAPI.delete(`/subscription/${id}`);

// Delete subscription
export const deleteSubscription = (id) =>
  userAPI.delete(`/subscription/${id}`);

// Extra tiffin order
export const orderExtraTiffin = (id, data) =>
  userAPI.patch(`/subscription/${id}`, data);