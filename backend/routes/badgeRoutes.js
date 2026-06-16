import express from "express";

const router = express.Router();

// temporary badges data (static)
router.get("/", (req, res) => {
  res.json([
    { name: "Task Master 🏅" },
    { name: "Pomodoro Champion 🍅" },
    { name: "Focus King 👑" }
  ]);
});

export default router;