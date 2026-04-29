import API from "./api";

// ✅ Get vendors (pagination handled by backend)
export const getVendors = ({ page = 1, limit = 9 } = {}) => {
  return API.get(`/vendor/all?page=${page}&limit=${limit}`);
};

// ✅ Get plans by vendor
export const getVendorPlans = (vendorId) =>
  API.get(`/plans/vendor/${vendorId}`);

// ✅ Get menu by plan
export const getPlanByMenu = (planId) =>
  API.get(`/menu/plan/${planId}`);