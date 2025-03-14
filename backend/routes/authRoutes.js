const express = require("express");
const { registerUser, loginUser, getUserProfile,getAllUsers } = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Routes
router.post("/register", registerUser); // Public
router.post("/login", loginUser); // Public
router.get("/profile", protect, getUserProfile); // Protected
router.get("/allusers", getAllUsers); // Protected
module.exports = router;
