import express from "express";
import cors from "cors";
import userroutes from "./routes/userRoutes.js";
import vendorroutes from "./routes/vendorRoutes.js";
import planRoutes from "./routes/planRoutes.js";
import menurouter from "./routes/menuroutes.js";
const app = express();


app.use(cors());
app.use(express.json());

app.use("/api/user",userroutes);
app.use("/api/vendor",vendorroutes);
app.use("/api/plan",planRoutes);
app.use("/api/menu", menurouter); 
app.get("/", (req, res) => {
  res.send("Mess Management API running...");
});

export default app;