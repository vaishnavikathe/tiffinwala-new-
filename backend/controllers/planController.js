import mongoose from "mongoose";
import Plan from "../models/plan.js";

export const createPlan = async (req, res) => {
  try {
    const vendorId = req.vendor.id;

    const {
      planName,
      planTypes,
      prepaidPlans,
      postpaidPlan
    } = req.body;

    const plan = await Plan.create({
      vendorId,
      planName, 
      planTypes,
      prepaidPlans,
      postpaidPlan
    });

    return res.status(201).json({
      message: "Plan created successfully",
      plan
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: error.message
    });
  }
};

export const getPlans = async (req, res) => {
  try {

    // ✅ get vendor from middleware
    const vendorId = req.vendor._id;

    // query params
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;

    const skip = (page - 1) * limit;

    // total count
    const total = await Plan.countDocuments({ vendorId });

    // paginated data
    const plans = await Plan.find({ vendorId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.json({
      total,
      page,
      totalPages: Math.ceil(total / limit),
      plans
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: error.message
    });

  }
};

/*import mongoose from "mongoose";
import Plan from "../models/plan.js";

export const getSinglePlan = async (req, res) => {
  try {
    const { id } = req.params;

    // ✅ Check if id exists
    if (!id) {
      return res.status(400).json({
        message: "Plan ID is required"
      });
    }

    // ✅ Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid Plan ID"
      });
    }

    const plan = await Plan.findById(id);

    if (!plan) {
      return res.status(404).json({
        message: "Plan not found"
      });
    }

    res.json({ plan });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: error.message
    });
  }
};*/


export const deletePlan = async (req, res) => {
  try {
    const vendorId = req.user.id;
    const { id } = req.params;

    const plan = await Plan.findOneAndDelete({
      _id: id,
      vendorId,
    });

    if (!plan) {
      return res.status(404).json({ message: "Plan not found" });
    }

    res.json({ message: "Plan deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};


export const updatePlan = async (req, res) => {
  try {

    const vendorId = req.vendor.id;
    const { id } = req.params;

    // ✅ Check if ID exists
    if (!id) {
      return res.status(400).json({
        message: "Plan ID is required"
      });
    }

    // ✅ Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid Plan ID"
      });
    }

    const {
      planName,
      planTypes,
      prepaidPlans,
      postpaidPlan
    } = req.body;

    const updatedPlan = await Plan.findOneAndUpdate(
      {
        _id: id,
        vendorId
      },
      {
        planName,
        planTypes,
        prepaidPlans,
        postpaidPlan
      },
      {
        new: true,
        runValidators: true
      }
    );

    if (!updatedPlan) {
      return res.status(404).json({
        message: "Plan not found"
      });
    }

    res.json({
      message: "Plan updated successfully",
      plan: updatedPlan
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: error.message
    });

  }
};
export const getVendorPlans = async (req, res) => {
  try {
    const { vendorId } = req.params;

    const plans = await Plan.find({ vendorId });

    res.json({
      message: "Plans fetched successfully",
      plans
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: error.message
    });
  }
};