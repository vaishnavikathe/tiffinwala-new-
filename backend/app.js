import express from "express";
import cors from "cors";
import userroutes from "./routes/userRoutes.js";
import vendorRoutes from "./routes/vendorRoutes.js";
import planRoutes from "./routes/planRoutes.js";
import menurouter from "./routes/menuroutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import subscriptionRoutes from "./routes/subscriptionRoutes.js";
import path from "path";
const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/api/user",userroutes);
app.use("/api/vendor",vendorRoutes);
app.use("/api/plan",planRoutes);
app.use("/api/menu", menurouter); 
app.use("/api/contact", contactRoutes);
app.use("/api/subscription", subscriptionRoutes);
app.use("/uploads",express.static("uploads"));
app.get("/", (req, res) => {
  res.send("Mess Management API running...");
});

export default app;