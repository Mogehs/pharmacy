import express from "express";
import {
  registerUser,
  loginUser,
  verifyOTP,
  resendOTP,
  getUserProfile,
  updateUserProfile,
  requestPasswordReset,
  resetPassword,
  getAllUsers,
  deleteUser,
  logoutUser,
} from "../controllers/userController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// Auth
router.post("/register", registerUser);
router.post("/login", loginUser);

// OTP Verification
router.post("/verify-otp/:id", verifyOTP);
router.post("/resend-otp", resendOTP);

// Password reset
router.post("/request-password-reset", requestPasswordReset);
router.post("/reset-password", resetPassword);

// User Profile
router.get("/profile/:id", authMiddleware, getUserProfile);
router.put("/profile/:id", authMiddleware, updateUserProfile);

// Admin-only
router.get("/", authMiddleware, getAllUsers);
router.delete("/:id", authMiddleware, deleteUser);

router.post("/logout", logoutUser);

export default router;
