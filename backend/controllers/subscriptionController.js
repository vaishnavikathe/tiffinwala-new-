import Subscription from "../models/subscription.js";

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
};