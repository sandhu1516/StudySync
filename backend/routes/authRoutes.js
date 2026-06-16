import express from "express";

import {
  register,
  login,
  updateProfile
}
from "../controllers/authController.js";

const router = express.Router();

/* REGISTER */

router.post(
  "/register",
  register
);

/* LOGIN */

router.post(
  "/login",
  login
);

router.put(
  "/profile",
  protect,
  updateProfile
);

import protect from "../middleware/authMiddleware.js";
export default router;