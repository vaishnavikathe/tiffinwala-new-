import express from "express";
import { registerUser, loginUser, updateUserProfile, updateUserPassword } from "../controllers/userController.js";
import { protectUser } from "../middlewares/authMiddleware.js";
import upload from "../middlewares/uploadMiddleware.js";

const userroutes = express.Router();

//public
//userroutes.post("/register", registerUser);
userroutes.post("/login", loginUser);
userroutes.post("/register",upload.single("profilePic"),registerUser);

//protected
userroutes.use(protectUser);
userroutes.post("/update-profile", updateUserProfile);
userroutes.post("/change-password", updateUserPassword);


export default userroutes;