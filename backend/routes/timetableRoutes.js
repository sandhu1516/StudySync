import express from "express";

import protect
from "../middleware/authMiddleware.js";

import {

  getTimetable,
  addTimetable,
  updateTimetable,
  deleteTimetable

}

from "../controllers/timetableController.js";

const router =
express.Router();

router.get(
  "/",
  protect,
  getTimetable
);

router.post(
  "/",
  protect,
  addTimetable
);

router.put(
  "/:id",
  protect,
  updateTimetable
);

router.delete(
  "/:id",
  protect,
  deleteTimetable
);

export default router;