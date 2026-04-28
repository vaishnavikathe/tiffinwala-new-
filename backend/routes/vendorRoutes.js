import express from "express";
import { registerVendor, loginVendor,addMenu,getAllVendors,getVendorDetails , updateVendorProfile, updateVendorPassword} from "../controllers/vendorController.js";
import { protectVendor } from "../middlewares/authMiddleware.js";
import upload from "../middlewares/uploadMiddleware.js";

const vendorroutes = express.Router();

vendorroutes.post("/register", registerVendor);
vendorroutes.post("/login", loginVendor);
<<<<<<< HEAD
vendorroutes.get("/all", getAllVendors);
=======
vendorroutes.post("/register",upload.single("profilePic"),registerVendor);
>>>>>>> 2d0c19f2c28947eb14a9d37f9bb58173f36f7266

vendorroutes.use(protectVendor);


vendorroutes.get("/:id/details", getVendorDetails);
vendorroutes.put("/update-profile", updateVendorProfile);
vendorroutes.put("/change-password", updateVendorPassword);


export default vendorroutes;