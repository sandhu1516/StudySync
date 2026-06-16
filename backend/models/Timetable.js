import mongoose from "mongoose";

const timetableSchema =
new mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  subject: {
    type: String,
    required: true
  },

  day: {
    type: String,
    required: true
  },

  time: {
    type: String,
    required: true
  },

  completed: {
    type: Boolean,
    default: false
  }

},
{
  timestamps: true
});

export default mongoose.model(
  "Timetable",
  timetableSchema
);