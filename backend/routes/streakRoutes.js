import express from "express";

import protect
from "../middleware/authMiddleware.js";

import {
  getStreak
}
from "../controllers/streakController.js";

const router =
express.Router();

router.get(
  "/",
  protect,
  getStreak
);

export default router;