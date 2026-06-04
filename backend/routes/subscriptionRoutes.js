import express from "express";
import { createSubscription } from "../controllers/subscriptionController.js";
import { getUserSubscriptions } from "../controllers/subscriptionController.js";
import { getVendorSubscribers } from "../controllers/subscriptionController.js";
import { protectUser } from "../middlewares/authMiddleware.js";
import { protectVendor } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", protectUser, createSubscription);
router.get("/", protectUser, getUserSubscriptions);
router.get("/vendor/subscribers",protectVendor,getVendorSubscribers);

export default router;