import Plan from "../models/plan.js";

export const createPlan = async (req, res) => {
  try {
    //  get vendorId from token (middleware)
    const vendorId = req.user.id;
    const { planTypes, prepaidPlans, postpaidPlan } = req.body;
    const plan = await Plan.create({
      vendorId,
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
    res.status(500).json({ error: error.message });
  }
};

export const getPlans = async (req, res) => {
  try {
    const vendorId = req.user.id;

    // ✅ query params
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;

    const skip = (page - 1) * limit;

    // ✅ total count
    const total = await Plan.countDocuments({ vendorId });

    // ✅ paginated data
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
    res.status(500).json({ error: error.message });
  }
};


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
    const vendorId = req.user.id;
    const { id } = req.params;

    const { planTypes, prepaidPlans, postpaidPlan } = req.body;

    const plan = await Plan.findOneAndUpdate(
      { _id: id, vendorId },
      {
        planTypes,
        prepaidPlans,
        postpaidPlan,
      },
      { new: true }
    );

    if (!plan) {
      return res.status(404).json({ message: "Plan not found" });
    }

    res.json({
      message: "Plan updated successfully",
      plan,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
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