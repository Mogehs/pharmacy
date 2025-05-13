import express from "express";
import {
  createAppointment,
  getAllAppointments,
  getAppointmentById,
  deleteAppointment,
} from "../controllers/appointmentController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, createAppointment);
router.get("/", authMiddleware, getAllAppointments);
router.get("/:id", authMiddleware, getAppointmentById);
router.delete("/:id", authMiddleware, deleteAppointment);

export default router;
