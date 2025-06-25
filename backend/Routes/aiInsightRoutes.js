const express = require("express");
const router = express.Router();
const {
  saveInsight,
  getInsights,
} = require("../Controllers/aiInsightController");
const authMiddleware = require("../Middlewares/authMiddlewares");

router.post("/add", authMiddleware, saveInsight);
router.get("/", authMiddleware, getInsights);

module.exports = router;
