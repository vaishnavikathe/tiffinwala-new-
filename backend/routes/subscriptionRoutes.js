import express from "express";
import { createSubscription } from "../controllers/subscriptionController.js";
import { getUserSubscriptions} from "../controllers/subscriptionController.js";
import { protectUser } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/subscription", protectUser, createSubscription);
router.post("/subscription", protectUser, getUserSubscriptions);

export default router;