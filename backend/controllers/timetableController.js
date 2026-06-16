import Timetable from "../models/Timetable.js";

export const getTimetable = async (req, res) => {
  try {
    const schedules = await Timetable.find({
      userId: req.user.id,
    });

    res.json(schedules);
  } catch (error) {
    console.log("GET TIMETABLE ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

export const addTimetable = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("USER:", req.user);

    const schedule = await Timetable.create({
      userId: req.user.id,
      subject: req.body.subject,
      day: req.body.day,
      time: req.body.time,
    });

    res.json(schedule);
  } catch (error) {
    console.log("ADD TIMETABLE ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

export const updateTimetable = async (req, res) => {
  try {
    const schedule = await Timetable.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(schedule);
  } catch (error) {
    console.log("UPDATE ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

export const deleteTimetable = async (req, res) => {
  try {
    await Timetable.findByIdAndDelete(req.params.id);

    res.json({
      message: "Deleted Successfully",
    });
  } catch (error) {
    console.log("DELETE ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};