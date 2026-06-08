import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
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
  extraTiffins: {
    type: Number,
    default: 0
  },
  totalAmount: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ["active", "expired","cancelled"],
    default: "active"
  },
  billingType: {           
    type: String,
    enum: ["prepaid", "postpaid"],
    default: "prepaid"
  },
  pricePerTiffin: {       
    type: Number,
    default: 0
  },
  tiffinsConsumed: {       
    type: Number,
    default: 0
  },
  planDetails: {
    tiffinCount: Number,
    price: Number,
    duration: String
  }
}, { timestamps: true });

export default mongoose.model("Subscription", subscriptionSchema);