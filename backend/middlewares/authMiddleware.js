import jwt from "jsonwebtoken";
import Vendor from "../models/vendor.js";

// ================= USER =================
export const protectUser = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "No token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "user") {
      return res.status(403).json({ message: "Access denied" });
    }

    req.user = decoded; // ✅ FIX

    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

// ================= VENDOR =================
/*export const protectVendor = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "No token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "vendor") {
      return res.status(403).json({ message: "Access denied" });
    }

    req.vendor = decoded; // ✅ FIX (IMPORTANT)

    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};*/
export const protectVendor = async (req, res, next) => {
  try {

    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {

      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET
      );

      // ✅ THIS WAS FAILING because Vendor wasn't imported
      req.vendor = await Vendor.findById(
        decoded.id
      ).select("-password");

      if (!req.vendor) {
        return res.status(404).json({
          message: "Vendor not found"
        });
      }

      next();

    } else {

      return res.status(401).json({
        message: "Not authorized, no token"
      });

    }

  } catch (error) {

    console.error(error);

    res.status(401).json({
      message: "Token failed"
    });

  }
};