const { User } = require("../models/Allmodels");
const sendOTP = require("../utils/sendMail");
const jwt = require("jsonwebtoken");
const generateOTP = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

/////////
// SIGNUP FUNCTION
/////////
const Signup = async (req, res) => {
  try {
    const { name, email, password, role, department } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // Generate OTP and create user
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

    // Send OTP via email
    await sendOTP(email, otp);

    res.status(201).json({ msg: "OTP sent to email" });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ msg: "Server Error" });
  }
};

////////
//VERIFY-OTP
///////

// router.post("/verify-otp", async (req, res) => {
//   const { email, otp } = req.body;

//   const user = await User.findOne({ email });
//   if (!user) return res.status(400).json({ msg: "User not found" });

//   if (user.otp === otp) {
//     user.verified = true;
//     user.otp = null;
//     await user.save();
//     res.json({ msg: "OTP verified successfully" });
//   } else {
//     res.status(400).json({ msg: "Invalid OTP" });
//   }
// });
const VerifyOTP = async (req, res) => {
  const { email, otp } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ msg: "User not found" });

  if (user.otp === otp) {
    user.verified = true;
    user.otp = null;
    await user.save();
    res.json({ msg: "OTP verified successfully" });
  } else {
    res.status(400).json({
      msg: "Invalid OTP",
    });
  }
};

////////
//LOGIN
///////

// router.post("/login", async (req, res) => {
//   const { email, password, role } = req.body;
//   const user = await User.findOne({ email, role });
//   if (!user) {
//     return res.status(400).json({ msg: "User Not Found or Role Mismatched" });
//   }
//   const verified = user ? user.verified : false;
//   if (!verified) {
//     return res.status(400).json({ msg: "Please verify your email first" });
//   }
//   if (!user) {
//     res.json({ msg: "User Not Found" });
//   }
//   const isMatch = user.password === password;
//   if (isMatch) {
//     const token = jwt.sign(
//       {
//         id: user._id,
//         role: user.role,
//       },
//       process.env.JWT_SECRET,
//       { expiresIn: "1d" }
//     );
//     res.json({
//       msg: "Login Successful",
//       token,
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         role: user.role,
//         department: user.department,
//       },
//     });
//   } else {
//     res.status(400).json({ msg: "Invalid Credentials" });
//   }
// });
const Login = async (req, res) => {
  const { email, password, role } = req.body;
  const user = await User.findOne({ email, role });

  if (!user) {
    return res.status(400).json({ "User Not found or Role Mismatched": true });
  }
  const isMatch = user.password === password;
  if (isMatch) {
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    res.json({
      msg: "Login Successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        department: user.department,
      },
    });
  } else {
    res.status(400).json({ msg: "Invalid Credentials" });
  }
};

/////////
//FORGET PASSWORD
/////////
const ForgetPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ msg: "User Not Found" });
  }
  const otp = generateOTP();
  user.otp = otp;
  user.verified = false;
  await user.save();
  await sendOTP(email, otp);
  res.json({ msg: "OTP sent to email for password reset" });
};

////////////
///Logout
////////////
const Logout = (req, res) => {
  // Frontend simply token ko localStorage/cookie se hata de
  res.json({ msg: "Logout Successful" });
};
module.exports = {
  Signup,
  VerifyOTP,
  Login,
  ForgetPassword,
  Logout,
  // Add other controller functions like Login, VerifyOTP, etc.
};
