import mongoose from "mongoose";

const vendorSchema = new mongoose.Schema(
  {

    ownerName: {
      type: String,
      required: true,
    },

    shopName: {
      type: String,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },

    mobile: {
      type: String,
      required: true,
      unique: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    cuisine: {
      type: String,
      required: true,
    }

  },
  {
    timestamps: true
  }
);

export default mongoose.model("vendors", vendorSchema);