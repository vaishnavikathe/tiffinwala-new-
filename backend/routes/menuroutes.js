import express from "express";
import {
  createMenu,
  getMenus,
  getMenuByPlan,
  deleteMenu
} from "../controllers/menuController.js";

import { protectVendor } from "../middlewares/authMiddleware.js";

const menurouter = express.Router();


// ✅ VENDOR ROUTES (protected)

// Create menu for a plan
menurouter.post("/", protectVendor, createMenu);

// Get all menus of logged-in vendor (dashboard use)
menurouter.get("/", protectVendor, getMenus);

// Delete menu
menurouter.delete("/:id", protectVendor, deleteMenu);


// ✅ USER FLOW ROUTE (public or protected based on your design)

// Get menu of a specific plan
menurouter.get("/plan/:planId", getMenuByPlan);


export default menurouter;