import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  vendorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "vendors"
  },
  planId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Plan"
  },
  startDate: {
    type: Date,
    default: Date.now
  },

  endDate: {
    type: Date
  },
  status: {
    type: String,
    enum: ["active", "expired"],
    default: "active"
  },
  planDetails: {
    tiffinCount: Number,
    price: Number,
    duration: String
  }
}, { timestamps: true });

export default mongoose.model("Subscription", subscriptionSchema);