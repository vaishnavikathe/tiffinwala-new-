/*import Admin from "../models/Admin.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import user from "../models/user.js";
import vendors from "../models/vendor.js";
import Subscription from "../models/subscription.js";
//import bcrypt from "bcryptjs";

export const adminLogin = async (req, res) => {
    try {
        const { email, password
         } = req.body;
        console.log("EMAIL:", email);

        const admin = await Admin.findOne({ email });
        console.log("ADMIN:", admin);
        
        if (!admin) {
            return res.status(404).json({
                message: "Admin not found",
            });
        }

        const isMatch = await bcrypt.compare(
            password,
            admin.password
        );
        console.log("MATCH:", isMatch);
        
        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid credentials",
            });
        }

        const token = jwt.sign(
            {
                id: admin._id,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d",
            }
        );

        res.json({
            message: "Login Successful",
            token,
            admin: {
                id: admin._id,
                email: admin.email,
            },
        });

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

//Dashboard

export const getDashboardStats =
    async (req, res) => {
        try {

            const totalUsers =
                await user.countDocuments();

            const totalVendors =
                await vendors.countDocuments();

            const totalSubscriptions =
                await Subscription.countDocuments({
                    status: "active",
                });

            res.json({
                totalUsers,
                totalVendors,
                totalSubscriptions,
            });

        } catch (error) {
            res.status(500).json({
                message: error.message,
            });
        }
    };*/

import admins from "../models/admin.js";
import User from "../models/user.js";
import vendors from "../models/vendor.js";
import Subscription from "../models/subscription.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// ADMIN LOGIN

/*export const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const admin = await admins.findOne({ email });

        if (!admin) {
            return res.status(404).json({
                success: false,
                message: "Admin not found",
            });
        }
        console.log("Entered Password:", password);
        console.log("Stored Hash:", admin.password);
        const isMatch = await bcrypt.compare(
            password,
            admin.password
        );
        try {
            const isMatch = await bcrypt.compare(
                password,
                admin.password
            );

            console.log("MATCH:", isMatch);
        } catch (err) {
            console.log("BCRYPT ERROR:", err);
        }

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials",
            });
        }

        const token = jwt.sign(
            {
                id: admin._id,
                role: "admin",
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d",
            }
        );

        res.status(200).json({
            success: true,
            message: "Login Successful",
            token,
            admin: {
                id: admin._id,
                email: admin.email,
            },
        });

    } catch (error) {
        console.error("ADMIN LOGIN ERROR:", error);

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};*/
export const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const admin = await admins.findOne({ email });

        if (!admin) {
            return res.status(404).json({
                success: false,
                message: "Admin not found",
            });
        }

        console.log("Entered Password:", password);
        console.log("Stored Hash:", admin.password);

        const isMatch = await bcrypt.compare(
            password,
            admin.password
        );

        console.log("MATCH:", isMatch);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials",
            });
        }

        const token = jwt.sign(
            {
                id: admin._id,
                role: "admin",
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d",
            }
        );

        return res.status(200).json({
            success: true,
            message: "Login Successful",
            token,
            admin: {
                id: admin._id,
                email: admin.email,
            },
        });
    } catch (error) {
        console.error("ADMIN LOGIN ERROR:", error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
// DASHBOARD STATS

/*export const getDashboardStats = async (req, res) => {
    try {

        const totalUsers =
            await user.countDocuments();

        const totalVendors =
            await vendors.countDocuments();

        const approvedVendors =
            await vendors.countDocuments({
                status: "approved",
            });

        const pendingVendors =
            await vendors.countDocuments({
                status: "pending",
            });

        const activeSubscriptions =
            await Subscription.countDocuments({
                status: "active",
            });

        const recentSubscriptions =
            await Subscription.find()
                .populate("userId", "name")
                .populate("planId", "planName")
                .sort({ createdAt: -1 })
                .limit(5);

        res.status(200).json({
            success: true,

            stats: {
                totalUsers,
                totalVendors,
                approvedVendors,
                pendingVendors,
                activeSubscriptions,
            },

            recentSubscriptions,
        });

    } catch (error) {
        console.error("DASHBOARD ERROR:", error);

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};*/
/*export const getDashboardStats = async (req, res) => {

    try {
        const totalUsers = await user.countDocuments();

        const totalVendors = await vendors.countDocuments();

        const totalSubscriptions =
            await Subscription.countDocuments({
                status: "active",
            });

        res.status(200).json({
            success: true,
            totalUsers,
            totalVendors,
            totalSubscriptions,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// GET ALL USERS

export const getAllUsers = async (req, res) => {
    try {

        const users = await user.find()
            .select("-password")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: users.length,
            users,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

// GET ALL VENDORS

export const getAllVendors = async (req, res) => {
    try {

        const Vendors = await vendors.find()
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: vendors.length,
            Vendors,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};*/

export const getDashboardStats = async (req, res) => {
    try {
        const totalUsers =
            await User.countDocuments();

        const totalVendors =
            await vendors.countDocuments();

        const approvedVendors =
            await vendors.countDocuments({
                status: "approved",
            });

        const totalSubscriptions =
            await Subscription.countDocuments();

        const pendingVendors =
            await vendors.find({
                status: "pending",
            }).limit(5);

        const recentSubscriptions =
            await Subscription.find()
                .sort({ createdAt: -1 })
                .limit(5);

        res.status(200).json({
            success: true,
            totalUsers,
            totalVendors,
            approvedVendors,
            totalSubscriptions,
            pendingVendors,
            recentSubscriptions,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

   //GET ALL USERS

export const getAllUsers = async (req, res) => {
    try {
        const Users = await User.find()
            .select("-password")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            Users,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

//GET ALL VENDORS

export const getAllVendors = async (req, res) => {
    try {
        const Vendors = await vendors.find()
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            Vendors,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

//APPROVE VENDOR


export const approveVendor = async (req, res) => {
    try {
        const vendor =
            await vendors.findByIdAndUpdate(
                req.params.id,
                {
                    status: "approved",
                },
                {
                    new: true,
                }
            );

        if (!vendor) {
            return res.status(404).json({
                success: false,
                message: "Vendor not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Vendor approved",
            vendor,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

//SUSPEND VENDOR

export const suspendVendor = async (req, res) => {
    try {
        const vendor =
            await vendors.findByIdAndUpdate(
                req.params.id,
                {
                    status: "suspended",
                },
                {
                    new: true,
                }
            );

        if (!vendor) {
            return res.status(404).json({
                success: false,
                message: "Vendor not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Vendor suspended",
            vendor,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const getAllSubscriptions = async (req, res) => {
    try {
        const subscriptions = await Subscription.find()
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            subscriptions,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// controllers/adminController.js

export const getRecentSubscriptions = async (req, res) => {
    try {
        const subscriptions = await Subscription.find()
            .populate("userId", "name")
            .populate("vendorId", "shopName")
            .populate("planId", "planName")
            .sort({ createdAt: -1 })
            .limit(5);

        res.json({
            success: true,
            subscriptions,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};