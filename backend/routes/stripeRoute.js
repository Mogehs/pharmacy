import express from "express";
import { createCheckoutSession } from "../stripe/stripeSession.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/create-checkout-session/:id", createCheckoutSession);

export default router;
