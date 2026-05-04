import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  vendorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vendor"
  },
  planId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Plan"
  },
  status: {
    type: String,
    enum: ["active", "expired"],
    default: "active"
  }
}, { timestamps: true });

export default mongoose.model("Subscription", subscriptionSchema);