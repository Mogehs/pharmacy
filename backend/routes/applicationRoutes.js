// routes/applicationRoutes.js
import express from "express";
import {
  createApplication,
  getApplications,
  getApplicationById,
  updateApplicationStatus,
  deleteApplication,
} from "../controllers/applicationController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, createApplication);
router.get("/", authMiddleware, getApplications);
router.get("/:id", authMiddleware, getApplicationById);
router.put("/:id/status", authMiddleware, updateApplicationStatus);
router.delete("/:id", authMiddleware, deleteApplication);

export default router;
