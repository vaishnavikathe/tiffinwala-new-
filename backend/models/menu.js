import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  }
}, { _id: false });

const menuSchema = new mongoose.Schema({
  vendorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vendor",
    required: true
  },
  planId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Plan",
    required: true
  },
  day: String,
  mealType: {
    type: String,
    enum: ["lunch", "dinner"]
  },

  // ✅ FIXED
  items: {
    type: [itemSchema],
    required: true
  }

}, { timestamps: true });

export default mongoose.models.Menu || mongoose.model("Menu", menuSchema);