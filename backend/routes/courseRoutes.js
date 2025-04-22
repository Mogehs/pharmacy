import express from "express";
import {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
} from "../controllers/courseController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// Routes
router.post("/", authMiddleware, createCourse);
router.get("/", getAllCourses);
router.get("/:id", getCourseById);
router.put("/:id", authMiddleware, updateCourse);
router.delete("/:id", authMiddleware, deleteCourse);

export default router;
