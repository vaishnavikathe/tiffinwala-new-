/*import Subscription from "../models/subscription.js";

export const createSubscription = async (req, res) => {
  try {
    const userId = req.user._id;
    const { vendorId, planId } = req.body;

    // prevent duplicate subscription
    const existing = await Subscription.findOne({
      userId,
      vendorId,
      status: "active"
    });

    if (existing) {
      return res.status(400).json({
        message: "Already subscribed"
      });
    }

    const subscription = await Subscription.create({
      userId,
      vendorId,
      planId
    });

    res.status(201).json({
      message: "Subscribed successfully",
      subscription
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message
    });
  }
};*/

import Subscription from "../models/subscription.js";
import Plan from "../models/plan.js";

export const createSubscription = async (req, res) => {
  try {
    const userId = req.user._id;
    const { vendorId, planId } = req.body;

    // ✅ Check plan exists
    const plan = await Plan.findById(planId);
    if (!plan) {
      return res.status(404).json({
        message: "Plan not found"
      });
    }

    // ✅ Prevent duplicate active subscription
    const existing = await Subscription.findOne({
      userId,
      vendorId,
      status: "active"
    });

    if (existing) {
      return res.status(400).json({
        message: "Already subscribed"
      });
    }

    // ✅ Dates logic
    const startDate = new Date();

    const endDate = new Date();
    endDate.setDate(startDate.getDate() + plan.duration); 
    // 👉 make sure plan.duration exists (days)

    // ✅ Create subscription
    const subscription = await Subscription.create({
      userId,
      vendorId,
      planId,
      startDate,
      endDate,
      status: "active"
    });

    res.status(201).json({
      message: "Subscribed successfully",
      subscription
    });

  } catch (error) {
    console.error("SUBSCRIPTION ERROR:", error);
    res.status(500).json({
      message: error.message
    });
  }
};

export const getUserSubscriptions = async (req, res) => {
  try {
    const userId = req.user._id;

    const subs = await Subscription.find({ userId })
      .populate("vendorId", "shopName")
      .populate("planId", "planName price");

    // ✅ CHECK & UPDATE STATUS
    for (let sub of subs) {
      if (sub.status === "active" && new Date() > sub.endDate) {
        sub.status = "expired";
        await sub.save();
      }
    }

    res.json(subs);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};