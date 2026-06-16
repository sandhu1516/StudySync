import express from "express";
import multer from "multer";
import { askPdfQuestion } from "../controllers/pdfController.js";

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage()
});

router.post(
  "/ask",
  upload.single("pdf"),
  askPdfQuestion
);

export default router;