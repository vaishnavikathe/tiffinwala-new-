import express from "express";
import { registerUser, loginUser, updateUserProfile, updateUserPassword } from "../controllers/userController.js";
import { protectUser } from "../middlewares/authMiddleware.js";
import upload from "../middlewares/uploadMiddleware.js";
import User from "../models/user.js";


const userroutes = express.Router();

//public
//userroutes.post("/register", registerUser);
userroutes.post("/login", loginUser);
userroutes.post("/register",upload.single("profilePic"),registerUser);
userroutes.get("/profile", protectUser, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json({ user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//protected
userroutes.put(
  "/profile",
  protectUser,
  upload.single("profilePic"),
  updateUserProfile
);
userroutes.use(protectUser);
//userroutes.post("/update-profile", updateUserProfile);
userroutes.post("/change-password", updateUserPassword);


export default userroutes;