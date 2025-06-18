const express = require("express");
const router = express.Router();
const User = require("../models/User");
const sendOTP = require("../utils/sendMail");

// Generate 6-digit OTP
const generateOTP = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

// Signup Route
router.post("/signup", async (req, res) => {
  const { name, email, password, role, department } = req.body;

  const existing = await User.findOne({ email });
  if (existing) return res.status(400).json({ msg: "User already exists" });

  const otp = generateOTP();
  const createdAt = new Date();
  const user = new User({
    name,
    email,
    password,
    otp,
    verified: false,
    role,
    department,
    createdAt,
  });
  await user.save();

  await sendOTP(email, otp);
  res.json({ msg: "OTP sent to email" });
});

// Verify OTP Route
router.post("/verify-otp", async (req, res) => {
  const { email, otp } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ msg: "User not found" });

  if (user.otp === otp) {
    user.verified = true;
    user.otp = null;
    await user.save();
    res.json({ msg: "OTP verified successfully" });
  } else {
    res.status(400).json({ msg: "Invalid OTP" });
  }
});

// Login Route

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.find({ email });
  const verified = user[0] ? user[0].verified : false;
  if (!verified) {
    return res.status(400).json({ msg: "Please verify your email first" });
  }
  if (!user) {
    res.json({ msg: "User Not Found" });
  }
  const isMatch = user[0].password === password;
  if (isMatch) {
    res.json({ msg: "Login Successful", user: user[0] });
  } else {
    res.status(400).json({ msg: "Invalid Credentials" });
  }
});

// Forget Password Route
router.post("/forget-password", async (req, res) => {
  const { email } = req.body;
  const user = await User.find({ email });
  if (!user) {
    return res.status(400).json({ msg: "User Not Found" });
  }
  const otp = generateOTP();
  user[0].otp = otp;
  user[0].verified = false;
  await user[0].save();
  await sendOTP(email, otp);
  res.json({ msg: "OTP sent to email for password reset" });
});

module.exports = router;
