import express from "express";
import {
    adminLogin,
    approveVendor,
    getAllUsers,
    getAllVendors,
    getDashboardStats,
    suspendVendor
} from "../controllers/adminController.js";
import { protectAdmin, } from "../middlewares/adminAuth.js";

const adminRoutes = express.Router();

adminRoutes.post("/login", adminLogin);
adminRoutes.get("/dashboard", protectAdmin, getDashboardStats);
adminRoutes.get("/user", getAllUsers);
adminRoutes.get("/vendors", getAllVendors);
adminRoutes.patch("/vendors/:id/approve", approveVendor);
adminRoutes.patch("/vendors/:id/suspend", suspendVendor);

export default adminRoutes;