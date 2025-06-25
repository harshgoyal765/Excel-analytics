const express = require("express");
const router = express.Router();
const { register, getUser, login } = require("../Controllers/authController");
const authMiddleware = require("../Middlewares/authMiddlewares");

router.post("/register", register);
router.post('/login', login);
router.get("/", authMiddleware, getUser);

module.exports = router;
