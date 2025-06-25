const express = require("express");
const router = express.Router();
const User = require("../models/User");
const sendOTP = require("../utils/sendMail");
const {
  Signup,
  VerifyOTP,
  Login,
  ForgetPassword,
  Logout,
} = require("../controllers/auth-controller");
// Generate 6-digit OTP
const generateOTP = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

// Signup Route using controller
router.post("/signup", Signup);

// Verify OTP Route
router.post("/verify-otp", VerifyOTP);

// Login Route

router.post("/login", Login);

// Forget Password Route
router.post("/forget-password", ForgetPassword);

// Logout Route
router.post("/logout", Logout);

module.exports = router;
