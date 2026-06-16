import express from "express";

import protect
from "../middleware/authMiddleware.js";

import {

  getNotes,
  addNote,
  updateNote,
  deleteNote

}
from "../controllers/noteController.js";

const router =
express.Router();

router.get(
  "/",
  protect,
  getNotes
);

router.post(
  "/",
  protect,
  addNote
);

router.put(
  "/:id",
  protect,
  updateNote
);

router.delete(
  "/:id",
  protect,
  deleteNote
);

export default router;