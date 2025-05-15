import express from "express";
import { createCheckoutSession } from "../stripe/stripeSession.js";
import { createCourseSession } from "../stripe/stripeCourseSession.js";

const router = express.Router();

router.post("/create-checkout-session/:id", createCheckoutSession);
router.post("/create-course-session/:id", createCourseSession);

export default router;
