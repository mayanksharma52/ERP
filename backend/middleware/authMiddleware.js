const jwt = require("jsonwebtoken");

// -------------------
// ✅ AUTH MIDDLEWARE
// -------------------

const User = require("../models/User"); // ✅ Import your User model

exports.authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 🔍 Fetch full user details
    const user = await User.findById(decoded.id).select("name email role");
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // ✅ Attach full user info to req.user
    req.user = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    console.log("✅ Authenticated user:", req.user);
    next();
  } catch (err) {
    console.error("❌ Token error:", err.message);
    res.status(401).json({ message: "Invalid token" });
  }
};

// ----------------------
// ✅ ROLE MIDDLEWARE
// ----------------------
exports.roleMiddleware = (roles) => {
  return (req, res, next) => {
    const userRole = req.user.role?.toLowerCase();  // 🔥 normalize from token
    const allowedRoles = roles.map(role => role.toLowerCase());  // 🔥 normalize input too

    console.log("🔐 Allowed Roles:", allowedRoles);
    console.log("👤 User Role:", userRole);

    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({ message: "Access denied" });
    }

    next();
  };
};