import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // change if needed
});

// ✅ Get all vendors
export const getVendors = () => API.get("/vendors");

// ✅ Get plans by vendor
export const getVendorPlans = (vendorId) =>
  API.get(`/plans/vendor/${vendorId}`);

// ✅ Get menu by plan
export const getPlanByMenu = (planId) =>
  API.get(`/menu/plan/${planId}`);