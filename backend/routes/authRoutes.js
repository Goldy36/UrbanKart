const express = require("express");
const {
  registerUser,
  loginUser,
  getCurrentUser,
  becomeSeller
} = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getCurrentUser);
router.put("/become-seller", protect, becomeSeller);

module.exports = router;
