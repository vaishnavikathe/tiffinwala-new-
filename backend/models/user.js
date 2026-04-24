import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {

    name: {
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

    password: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    }

  },
  {
    timestamps: true
  }
);

// Export model
export default mongoose.model("user", userSchema);