import express from "express";

import {
  registerVendor,
  loginVendor,
  getAllVendors,
  getVendorDetails,
  updateVendorProfile,
  updateVendorPassword
} from "../controllers/vendorController.js";

import { protectVendor } from "../middlewares/authMiddleware.js";

import upload from "../middlewares/uploadMiddleware.js";

const vendorroutes = express.Router();

// =========================
// PUBLIC ROUTES
// =========================

// Register Vendor (with profile pic)
vendorroutes.post( "/register",upload.single("profilePic"),registerVendor);

// Login Vendor
vendorroutes.post("/login",loginVendor);

// Get all vendors (user browsing)
vendorroutes.get("/all",getAllVendors);
//get Vendor Details
vendorroutes.get("/:id/details",getVendorDetails);


// PROTECTED ROUTES


vendorroutes.use(protectVendor);
// Update Profile
vendorroutes.put("/update-profile",updateVendorProfile);
// Change Password
vendorroutes.put("/change-password",updateVendorPassword);

export default vendorroutes;