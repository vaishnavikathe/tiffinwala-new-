import express from "express";
import {
  createMenu,
  getMenus,
  getMenuByPlan,
  updateMenu,
  deleteMenu
} from "../controllers/menuController.js";

import { protectVendor } from "../middlewares/authMiddleware.js";

const menurouter = express.Router();


// VENDOR ROUTES(protected)

// Create menu for a plan
menurouter.post("/", protectVendor, createMenu);

// Get all menus of logged-in vendor (dashboard use)
menurouter.get("/", protectVendor, getMenus);

//update menu
menurouter.put("/:id", protectVendor, updateMenu);

// Delete menu
menurouter.delete("/:id", protectVendor, deleteMenu);

// Get menu of a specific plan
menurouter.get("/plan/:planId", getMenuByPlan);


export default menurouter;