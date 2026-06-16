import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";


import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import timetableRoutes from "./routes/timetableRoutes.js";
import goalRoutes from "./routes/goalRoutes.js";
import pomodoroRoutes from "./routes/pomodoroRoutes.js";
import noteRoutes from "./routes/noteRoutes.js";
import badgeRoutes from "./routes/badgeRoutes.js";
import pdfRoutes from "./routes/pdfRoutes.js";
import flashcardRoutes from "./routes/flashcardRoutes.js";
import streakRoutes from "./routes/streakRoutes.js";



const app = express();

/* MIDDLEWARE */

app.use(cors());

app.use(express.json());

/* ROUTES */

app.use(
  "/api/auth",
  authRoutes
);
    
app.use(
  "/api/tasks",
  taskRoutes
);

app.use(
  "/api/timetable",
  timetableRoutes
);

app.use(
  "/api/goals",
  goalRoutes
);

app.use(
  "/api/pomodoro",
  pomodoroRoutes
);

app.use(
  "/api/notes",
  noteRoutes
);

app.use("/api/badges", badgeRoutes);

app.use(
 "/api/pdf",
 pdfRoutes
);

app.use(
  "/api/flashcards",
  flashcardRoutes
);

app.use(
  "/api/streak",
  streakRoutes
);

/* TEST ROUTE */

app.get("/", (req, res) => {

  res.send(
    "Backend Running Successfully"
  );

});

/* DATABASE CONNECTION */

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {

    console.log(
      "MongoDB Connected Successfully"
    );

    app.listen(

      process.env.PORT || 5000,

      () => {

        console.log(

          `Server Running On Port ${process.env.PORT}`

        );

      }

    );

  })

  .catch((error) => {

    console.log(error);

  });