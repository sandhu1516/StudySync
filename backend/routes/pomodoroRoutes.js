import express from "express";

import {
  saveSession,
  getSessions
}
from "../controllers/pomodoroController.js";

import protect
from "../middleware/authMiddleware.js";

const router =
express.Router();

router.post(
  "/",
  protect,
  saveSession
);

router.get(
  "/",
  protect,
  getSessions
);

export default router;