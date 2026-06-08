import API from "./api";

//Get vendors (pagination handled by backend)
export const getVendors = ({ page = 1, limit = 9 } = {}) => {
  return API.get(`/vendor/all?page=${page}&limit=${limit}`);
};

//  Get plans by vendor
export const getVendorDetails = (vendorId) => {
  return API.get(`/vendor/${vendorId}/details`);
};

//  Get menu by plan
export const getPlanByMenu = (planId) =>
  API.get(`/menu/plan/${planId}`);

//Subscribe to a plan
export const createSubscription = ({ vendorId, planId }) =>
  API.post("/subscription", { vendorId, planId });

// Get user's subscriptions
export const getUserSubscriptions = () =>
  API.get("/subscription");

// User Profile
export const getUserProfile = () => API.get("/user/profile");
export const updateUserProfile = (data) => API.put("/user/profile", data);

// Cancel subscription
export const cancelSubscription = (id) =>
  API.delete(`/subscription/${id}`);

// Delete subscription
export const deleteSubscription = (id) =>
  API.delete(`/subscription/${id}`);