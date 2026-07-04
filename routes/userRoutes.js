const express = require('express');

const router = express.Router();

const { registerUser, loginUser, logoutUser, getProfile } = require("../controllers/userController");

const authMiddleware = require("../middleware/auth.middleware");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", authMiddleware, logoutUser);
router.get("/profile", authMiddleware, getProfile);

module.exports = router;