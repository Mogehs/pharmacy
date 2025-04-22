import express, { application } from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";
import productRoutes from "./routes/productRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";
import applicationRoutes from "./routes/applicationRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import stripeRoutes from "./routes/stripeRoute.js";

import { stripeWebhook } from "./stripe/stripeWebHook.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(cookieParser());
app.use(
  "/api/stripe/webhook",
  express.raw({ type: "application/json" }),
  stripeWebhook
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/stripe", stripeRoutes);

// DB connection & Server
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ DB Connection Error:", err.message);
  });
