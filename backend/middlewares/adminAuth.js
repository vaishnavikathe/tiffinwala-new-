/*import jwt from "jsonwebtoken";
import admins from "../models/admin.js";

export const protectAdmin = async (
    req,
    res,
    next
) => {
    try {
        const token =
            req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                message: "No token",
            });
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.admin = await admin.findById(
            decoded.id
        );

        next();

    } catch (error) {
        res.status(401).json({
            message: "Unauthorized",
        });
    }
};*/
import jwt from "jsonwebtoken";
import admins from "../models/admin.js";

export const protectAdmin = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                message: "No token",
            });
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        const admin = await admins.findById(decoded.id);

        if (!admin) {
            return res.status(401).json({
                message: "Admin not found",
            });
        }

        req.admin = admin;

        next();
    } catch (error) {
        return res.status(401).json({
            message: "Unauthorized",
        });
    }
};