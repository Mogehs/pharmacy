import express from "express";
import { createCheckoutSession } from "../stripe/stripeSession.js";
import { stripeWebhook } from "../stripe/stripeWebHook.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/create-checkout-session", authMiddleware, createCheckoutSession);
router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  stripeWebhook
);

export default router;
