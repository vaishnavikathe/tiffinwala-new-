import Vendor from "../models/vendor.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import Plan from "../models/plan.js";
import Menu from "../models/menu.js";

export const registerVendor= async (req,res)=>{
  try{
    const{ownerName,address,mobile,password,cuisine,shopName,email,profilePic} = req.body;

    const existing = await Vendor.findOne({ 
      $or: [
      { mobile: mobile },
      { email: email }
    ]
     });
        if (existing) {

        return res.status(400).json({
        message: "vendor already registered, return to login"
      });     
  }  

  const hashedPassword = await bcrypt.hash(password, 10);
   
  const vendor =await Vendor.create({
    ownerName,
    address,
    mobile,
    password: hashedPassword,
    cuisine,
    shopName,
    email,
    profilePic 
  });
  
  res.status(201).json({
      message: "Vendor Registered successfully",
      vendor 
    });

}catch(error){
 res.status(500).json({ error: error.message });     
}
};


//login
export const loginVendor = async (req, res) => {
  try {
    const { mobile, email, password } = req.body;

    // dynamic query
    let query = {};

    if (email) {
      query.email = email;
    } else if (mobile) {
      query.mobile = mobile;
    } else {
      return res.status(400).json({
        message: "Email or Mobile required"
      });
    }

    const vendor = await Vendor.findOne(query);

    if (!vendor) {
      return res.status(401).json({
        message: "Vendor not found"
      });
    }

    const isMatch = await bcrypt.compare(password, vendor.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid Password"
      });
    }

    const token = jwt.sign(
      { id: vendor._id, role: "vendor" },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.json({
      message: "Login Successfully",
      token,
      vendor: {
        ownerName: vendor.ownerName,
        shopName: vendor.shopName
      }
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Menu handler 
export const addMenu = async (req, res) => {
  try {
    const { vendorId, weekMenu } = req.body;

    // check if already exists
    const existing = await Menu.findOne({ vendorId });

    if (existing) {
      return res.status(400).json({
        message: "Menu already exists, use update API"
      });
    }

    const menu = await Menu.create({
      vendorId,
      weekMenu
    });

    return res.json({
      message: "Weekly menu created",
      menu
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// get vendors for user dashboard
export const getAllVendors = async (req, res) => {
  try {
    // ✅ query params
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 9;

    const skip = (page - 1) * limit;

    // ✅ total count
    const total = await Vendor.countDocuments();

    // ✅ paginated data
    const vendors = await Vendor.find()
      .select("ownerName shopName cuisine address")
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    return res.json({
      message: "Vendors fetched successfully",
      total,
      page,
      totalPages: Math.ceil(total / limit),
      vendors
    });

  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
};

//GET SINGLE VENDOR DETAILS (IMPORTANT)
export const getVendorDetails = async (req, res) => {
  try {
    const vendorId = req.params.id;

    // vendor basic info
    const vendor = await Vendor.findById(vendorId).select(
      "ownerName shopName cuisine address"
    );

    if (!vendor) {
      return res.status(404).json({
        message: "Vendor not found"
      });
    }

    // menu (7 days)
    const menu = await Menu.findOne({vendor: vendorId });

    // plans (prepaid + postpaid)
    const plans = await Plan.find({vendor: vendorId });

    return res.json({
      message: "Vendor details fetched",
      vendor,
      menu,
      plans
    });

  } catch (error) {
    console.error("Error in getVendorDetails:",error);
    return res.status(500).json({
      error: error.message
    });
  }
};

//update vendor profile
export const updateVendorProfile = async (req, res) => {
  try {

    const vendorId = req.vendor._id; // ✅ FIX

    const vendor = await Vendor.findById(vendorId);

    if (!vendor) {
      return res.status(404).json({
        message: "Vendor not found"
      });
    }

    vendor.ownerName =
      req.body.ownerName || vendor.ownerName;

    vendor.shopName =
      req.body.shopName || vendor.shopName;

    vendor.cuisine =
      req.body.cuisine || vendor.cuisine;

    vendor.address =
      req.body.address || vendor.address;

    await vendor.save();

    res.json({
      message: "Profile updated successfully",
      vendor
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: error.message
    });

  }
};
//Update password 
export const updateVendorPassword = async (req, res) => {
  try {

    const vendorId = req.vendor.id; // ✅ FIX

    const {
      currentPassword,
      newPassword
    } = req.body;

    // Find vendor
    const vendor = await Vendor.findById(vendorId);

    if (!vendor) {
      return res.status(404).json({
        message: "Vendor Not found"
      });
    }

    // Check current password
    const isMatch = await bcrypt.compare(
      currentPassword,
      vendor.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Current password is incorrect"
      });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);

    vendor.password = await bcrypt.hash(
      newPassword,
      salt
    );

    await vendor.save();

    res.json({
      message: "Password updated successfully"
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: error.message
    });
  }
};


export const getVendorDashboard = async (req, res) => {
  try {

    const vendorId = req.user.id;

    // Total Users
    const totalUsers = await User.countDocuments();

    // Active Users (same for now)
    const activeUsers = totalUsers;

    // Total Plans
    const totalPlans = await Plan.countDocuments({
      vendorId
    });

    // Total Menus
    const totalMenus = await Menu.countDocuments({
      vendorId
    });

    res.json({
      totalUsers,
      activeUsers,
      totalPlans,
      totalMenus
    });

  } catch (error) {

    console.error("Dashboard Error:", error);

    res.status(500).json({
      message: error.message
    });

  }
};