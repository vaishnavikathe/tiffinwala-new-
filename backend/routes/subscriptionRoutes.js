import express from "express";
import { createSubscription } from "../controllers/subscriptionController.js";
import { getUserSubscriptions } from "../controllers/subscriptionController.js";
import {
     getVendorSubscribers,
     addExtraTiffin,
     cancelSubscription,
     pauseTiffin
} from "../controllers/subscriptionController.js";
import { protectUser } from "../middlewares/authMiddleware.js";
import { protectVendor } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", protectUser, createSubscription);
router.get("/", protectUser, getUserSubscriptions);
router.post("/:id/pause", protectUser, pauseTiffin);
//router.post("/skip", protectUser, skipTiffin);
//router.get("/skip", protectUser, getSkippedTiffins);
router.get("/vendor/subscribers", protectVendor, getVendorSubscribers);
router.patch("/:id", protectUser, addExtraTiffin );
router.delete("/:id", protectUser, cancelSubscription);

export default router;