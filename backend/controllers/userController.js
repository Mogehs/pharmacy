import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import User from "../models/User.js";
import sendEmail from "../utils/sendEmail.js";

import dotenv from "dotenv";
dotenv.config();

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

// Register
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({ message: "All fields are required" });

    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedOtp = await bcrypt.hash(otp, 10);
    const otpExpiresAt = Date.now() + 10 * 60 * 1000; // 10 min

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      otp: hashedOtp,
      otpExpiresAt,
    });

    const html = `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 20px; background-color: #f2f2f2;">
      <div style="max-width: 600px; margin: auto; background-color: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0px 0px 10px rgba(0,0,0,0.1);">
        <h2 style="color: #333333;">👋 Welcome, ${name}!</h2>
        <p style="color: #555555; font-size: 16px;">
          Thank you for registering. Please use the following One-Time Password (OTP) to verify your account:
        </p>
        <h1 style="text-align: center; color: #007bff; letter-spacing: 3px; font-size: 36px; margin: 30px 0;">${otp}</h1>
        <p style="color: #999999; font-size: 14px;">
          This OTP is valid for 10 minutes. If you didn't initiate this request, you can safely ignore this email.
        </p>
        <p style="margin-top: 40px; font-size: 13px; color: #cccccc; text-align: center;">
          © ${new Date().getFullYear()} Your Company. All rights reserved.
        </p>
      </div>
    </div>
  `;

    // Send OTP
    await sendEmail(email, "Verify your account", html);

    res.status(201).json({
      success: true,
      message: "OTP sent to email. Please verify.",
      userId: user._id,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Verify OTP

export const verifyOTP = async (req, res) => {
  try {
    const { otp, email } = req.body;
    let user;

    // Find user by ID (if provided) or email
    if (req.params.id && req.params.id !== "undefined") {
      user = await User.findById(req.params.id);
    } else if (email) {
      user = await User.findOne({ email });
    } else {
      return res.status(400).json({ message: "Email or user ID is required" });
    }

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Validate OTP and expiration
    const isMatch = await bcrypt.compare(otp, user.otp);
    const isExpired = user.otpExpiresAt < Date.now();

    if (!isMatch || isExpired) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    // Mark user as verified
    user.isVerified = true;
    user.otp = undefined;
    user.otpExpiresAt = undefined;

    await user.save();

    res.status(200).json({ message: "Account verified successfully" });
  } catch (err) {
    console.error("OTP Verification Error:", err.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Resend OTP
export const resendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ message: "Please enter registered email" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedOtp = await bcrypt.hash(otp, 10);
    const otpExpiresAt = Date.now() + 10 * 60 * 1000;

    user.otp = hashedOtp;
    user.otpExpiresAt = otpExpiresAt;
    await user.save();

    const html = `
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #f4f7fa;
              padding: 20px;
              color: #333;
            }
            .container {
              background-color: #ffffff;
              padding: 30px;
              border-radius: 8px;
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
              max-width: 600px;
              margin: 0 auto;
            }
            h1 {
              color: #4CAF50;
            }
            .otp-code {
              font-size: 24px;
              font-weight: bold;
              color: #FF9800;
            }
            .footer {
              margin-top: 20px;
              font-size: 12px;
              color: #888;
              text-align: center;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>OTP for Your Account</h1>
            <p>Hello,</p>
            <p>We received a request to resend the One-Time Password (OTP) for your account verification.</p>
            <p>Please use the following OTP to complete your verification process:</p>
            <p class="otp-code">${otp}</p>
            <p>This OTP is valid for the next 10 minutes.</p>
            <p>If you didn't request this, please ignore this message.</p>
            <div class="footer">
              <p>This is an automated email. Please do not reply to this message.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    await sendEmail(email, "New OTP", html);

    res.status(200).json({ success: true, message: "New OTP sent to email" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    if (!user.isVerified)
      return res
        .status(401)
        .json({ message: "Please verify your email first" });

    const token = generateToken(user._id);

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "None",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({ message: "Login successful", user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get Profile
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update Profile
export const updateUserProfile = async (req, res) => {
  try {
    const { name } = req.body;

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.name = name || user.name;
    await user.save();

    res.json({ message: "Profile updated", user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Request Password Reset
export const requestPasswordReset = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const token = crypto.randomBytes(20).toString("hex");
    const tokenExpire = Date.now() + 15 * 60 * 1000;

    user.resetToken = token;
    user.resetTokenExpires = tokenExpire;
    await user.save();

    const resetLink = `${process.env.FRONTEND_URL}/update-password/${token}`;
    const html = `
    <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f9f9f9;">
      <div style="max-width: 600px; margin: auto; background-color: #fff; border-radius: 8px; padding: 20px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
        <h2 style="color: #333;">🔐 Password Reset Request</h2>
        <p style="color: #555;">We received a request to reset your password. Click the button below to set a new password. This link is valid for 15 minutes.</p>
        <a href="${resetLink}" style="display: inline-block; padding: 12px 24px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px; margin-top: 20px;">Reset Password</a>
        <p style="margin-top: 30px; color: #aaa; font-size: 12px;">If you didn't request this, please ignore this email. Your password will remain unchanged.</p>
      </div>
    </div>
  `;
    await sendEmail(email, "Reset Password", html);

    res.json({ message: "Password reset link sent to email" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Reset Password
export const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    const user = await User.findOne({
      resetToken: token,
      resetTokenExpires: { $gt: Date.now() },
    });

    if (!user)
      return res.status(400).json({ message: "Invalid or expired token" });

    user.password = await bcrypt.hash(newPassword, 10);
    user.resetToken = undefined;
    user.resetTokenExpires = undefined;
    await user.save();

    res.json({ message: "Password reset successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Admin: Get All Users
export const getAllUsers = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// Admin: Delete User
export const deleteUser = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const logoutUser = (req, res) => {
  res.clearCookie("token").json({ message: "Logged out successfully" });
};
