import express from "express";
import { createSubscription } from "../controllers/subscriptionController.js";
import { protectUser } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", protectUser, createSubscription);

export default router;