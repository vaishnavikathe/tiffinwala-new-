import express from "express";

import {
  createMenu,
  getMenus,
  getMenuByPlan,
  updateMenu,
  deleteMenu,
  getSingleMenu
} from "../controllers/menuController.js";

import { protectVendor } from "../middlewares/authMiddleware.js";

const menurouter = express.Router();


// ✅ CREATE MENU (plan based)
menurouter.post(
  "/:planId",
  protectVendor,
  createMenu
);


// ✅ GET ALL MENUS (vendor dashboard)
menurouter.get(
  "/",
  protectVendor,
  getMenus
);


// ✅ GET MENU BY PLAN (user side)
menurouter.get(
  "/plan/:planId",
  getMenuByPlan
);


// ✅ UPDATE MENU
menurouter.put(
  "/:id",
  protectVendor,
  updateMenu
);


// ✅ DELETE MENU
menurouter.delete(
  "/:id",
  protectVendor,
  deleteMenu
);
// GET SINGLE MENU
menurouter.get(
  "/single/:id",
  protectVendor,
  getSingleMenu
);

export default menurouter;