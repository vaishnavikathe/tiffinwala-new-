import mongoose from "mongoose";

const prepaidPlanSchema = new mongoose.Schema({
  name: String,
  tiffinCount: Number,
  price: Number
}, { _id: false });

const postpaidSchema = new mongoose.Schema({
  deposit: Number,
  pricePerTiffin: Number
}, { _id: false });

const planSchema = new mongoose.Schema({
  vendorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vendor",
    required: true
  },

  planTypes: {
    prepaid: Boolean,
    postpaid: Boolean
  },

  prepaidPlans: {
    type: [prepaidPlanSchema],
    default: []
  },

  postpaidPlan: postpaidSchema

}, { timestamps: true });

export default mongoose.model("Plan", planSchema);