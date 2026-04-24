import jwt from "jsonwebtoken";

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
export const protectVendor = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "No token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "vendor") {
      return res.status(403).json({ message: "Access denied" });
    }

    req.user = decoded; // ✅ FIX (IMPORTANT)

    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};