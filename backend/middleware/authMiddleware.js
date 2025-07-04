const jwt = require("jsonwebtoken");

// -------------------
// ✅ AUTH MIDDLEWARE
// -------------------
exports.authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // contains id and role
    console.log("✅ Authenticated user:", req.user.role);
    next();
  } catch (err) {
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