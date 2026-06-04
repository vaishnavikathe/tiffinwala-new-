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
/*
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

   /* const endDate = new Date();
    endDate.setDate(startDate.getDate() + plan.duration); 
    // 👉 make sure plan.duration exists (days)

if (!plan.prepaidPlans || plan.prepaidPlans.length === 0) {
  return res.status(400).json({
    message: "No prepaid plans available"
  });
}

const selectedPlan = plan.prepaidPlans[0]; // or from frontend

const endDate = new Date(startDate);
endDate.setDate(startDate.getDate() + selectedPlan.tiffinCount);
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
    console.log("Subscription routes loaded");

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
};*/
/*import Subscription from "../models/subscription.js";
import Plan from "../models/plan.js";

export const createSubscription = async (req, res) => {
  try {
    const userId = req.user.id;
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
      planId,
      startDate: new Date(),
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      status: "active"
    });

    if (existing) {
      return res.status(400).json({
        message: "Already subscribed"
      });
    }

    // ✅ Check prepaid plans exist
    if (!plan.prepaidPlans || plan.prepaidPlans.length === 0) {
      return res.status(400).json({
        message: "No prepaid plans available"
      });
    }*/
   /* if (
      selectedPlanIndex === undefined ||
      !plan.prepaidPlans[selectedPlanIndex]
    ) {
      return res.status(400).json({
        message: "Invalid plan selection"
      });
    }*/

    //const selectedPlan = plan.prepaidPlans[selectedPlanIndex];
   /* const selectedPlan = plan.prepaidPlans.reduce((max, p) =>
   
   
  p.tiffinCount > max.tiffinCount ? p : max
);
    // ✅ Dates logic
    const startDate = new Date();

    const endDate = new Date(startDate);
    endDate.setDate(
      startDate.getDate() + Number(selectedPlan.tiffinCount)
    );

    // ✅ Create subscription
    const subscription = await Subscription.create({
      userId,
      vendorId,
      planId,
      startDate,
      endDate,
      status: "active",
      planDetails: selectedPlan
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
      .populate("userId", "name email mobile")
      .populate("planId", "planName");

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
};*/

import Subscription from "../models/subscription.js";
import Plan from "../models/plan.js";
// Create Subscription
export const createSubscription = async (req, res) => {
  try {
    const userId = req.user.id;
    const { vendorId, planId } = req.body;

    console.log("USER ID:", userId);
    console.log("BODY:", req.body);

    // Check plan exists
    const plan = await Plan.findById(planId);

    if (!plan) {
      return res.status(404).json({
        message: "Plan not found",
      });
    }

    // Prevent duplicate active subscription
    const existing = await Subscription.findOne({
      userId,
      vendorId,
      planId,
      status: "active",
    });

    if (existing) {
      return res.status(400).json({
        message: "Already subscribed",
      });
    }

    // Check prepaid plans
    
console.log("PLAN:", plan);
console.log("PREPAID:", plan.prepaidPlans);
    /*if (!plan.prepaidPlans || plan.prepaidPlans.length === 0) {
      return res.status(400).json({
        message: "No prepaid plans available",
      });
    }

    // Select highest tiffin count plan
    const selectedPlan = plan.prepaidPlans.reduce(
      (max, p) => (p.tiffinCount > max.tiffinCount ? p : max),
      plan.prepaidPlans[0]
    );*/
    if (plan.prepaidPlans && plan.prepaidPlans.length > 0) {

      // Highest prepaid plan
      selectedPlan = plan.prepaidPlans.reduce(
        (max, p) => (p.tiffinCount > max.tiffinCount ? p : max),
        plan.prepaidPlans[0]
      );

      planType = "prepaid";

    } else if (plan.postpaidPlan) {

      selectedPlan = plan.postpaidPlan;
      planType = "postpaid";

    } else {

      return res.status(400).json({
        message: "No plans available",
      });

    }

    // Dates
    const startDate = new Date();

    const endDate = new Date(startDate);
    endDate.setDate(
      startDate.getDate() + Number(selectedPlan.tiffinCount)
    );

    // Create subscription
    const subscription = await Subscription.create({
      userId,
      vendorId,
      planId,
      startDate,
      endDate,
      status: "active",
    });

    console.log("CREATED SUB:", subscription);

    res.status(201).json({
      message: "Subscribed successfully",
      subscription,
    });

  } catch (error) {
    console.error("SUBSCRIPTION ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// Get User Subscriptions
export const getUserSubscriptions = async (req, res) => {
  try {
    const userId = req.user.id; // FIXED

    const subs = await Subscription.find({ userId })
      .populate("vendorId", "shopName")
      .populate("userId", "name email mobile")
      .populate("planId", "planName");

    // Update expired subscriptions
    for (const sub of subs) {
      if (sub.status === "active" && new Date() > sub.endDate) {
        sub.status = "expired";
        await sub.save();
      }
    }

    res.status(200).json({
      totalSubscriptions: subs.length,
      subscriptions: subs,
    });

  } catch (error) {
    console.error("GET USER SUBS ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Vendor Subscribers
export const getVendorSubscribers = async (req, res) => {
  try {
    const vendorId = req.vendor._id;

    console.log("Logged Vendor:", req.vendor._id);
    const subscribers = await Subscription.find({
      vendorId,
      status: "active",
      
    })
      
      .populate("userId", "name email mobile")
      .populate("planId", "planName");
    console.log("Found Subscribers:", subscribers);
    res.status(200).json({
      totalSubscribers: subscribers.length,
      subscribers,
    });

  } catch (error) {
    console.error("GET VENDOR SUBSCRIBERS ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

export const addExtraTiffin = async (req, res) => {
  try {
    const { subscriptionId } = req.params;
    const { quantity, pricePerTiffin } = req.body;

    const subscription =
      await Subscription.findById(subscriptionId);

    if (!subscription) {
      return res.status(404).json({
        success: false,
        message: "Subscription not found",
      });
    }

    subscription.extraTiffins += quantity;

    subscription.totalAmount +=
      quantity * pricePerTiffin;

    await subscription.save();

    res.json({
      success: true,
      subscription,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const cancelSubscription = async (req, res) => {
  try {
    const subscription = await Subscription.findById(
      req.params.id
    );

    if (!subscription) {
      return res.status(404).json({
        success: false,
        message: "Subscription not found",
      });
    }

    // Ensure user owns this subscription
    if (
      subscription.userId.toString() !==
      req.user.id
    ) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    await Subscription.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({
      success: true,
      message: "Subscription cancelled successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};