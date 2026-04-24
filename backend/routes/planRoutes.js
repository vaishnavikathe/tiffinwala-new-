import express from "express";
import {
  createPlan,
  getPlans,
  deletePlan,
  updatePlan,
  getVendorPlans
} from "../controllers/planController.js";
import { protectVendor } from "../middlewares/authMiddleware.js";

const planRoutes = express.Router();

planRoutes.post("/create", protectVendor, createPlan);
planRoutes.get("/", protectVendor, getPlans);
planRoutes.delete("/:id", protectVendor, deletePlan);
planRoutes.put("/:id", protectVendor, updatePlan);
planRoutes.get("/vendor/:vendorId", getVendorPlans);
planRoutes.get("/vendor/:id", getVendorPlans);

export default planRoutes;