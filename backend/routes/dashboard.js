const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");

// GET /api/dashboard
router.get("/", auth, (req, res) => {
  const { role, id } = req.user;
  res.json({
    msg: `Welcome ${role}`,
    userId: id,
    dashboard: `${role} dashboard loaded`,
  });
});

module.exports = router;
