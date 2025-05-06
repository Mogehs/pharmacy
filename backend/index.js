import express from "express";
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

app.post(
  "/api/stripe/webhook",
  express.raw({ type: "application/json" }),
  stripeWebhook
);

// Middleware
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
};

app.use(cors(corsOptions));

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
  .connect(MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ DB Connection Error:", err.message);
  });
