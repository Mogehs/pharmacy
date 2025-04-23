import express from "express";
import {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
} from "../controllers/courseController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import { uploadMultiple } from "../middlewares/multer.js";

const router = express.Router();

// Routes
router.post(
  "/",
  authMiddleware,
  uploadMultiple.single("courseCoverImg"),
  createCourse
);
router.get("/", getAllCourses);
router.get("/:id", getCourseById);
router.put(
  "/:id",
  authMiddleware,
  uploadMultiple.single("courseCoverImg"),
  updateCourse
);
router.delete("/:id", authMiddleware, deleteCourse);

export default router;
