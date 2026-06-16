import mongoose from "mongoose";

const pomodoroSchema = new mongoose.Schema(
{
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
  },

  duration:{
    type:Number,
    required:true
  },

  completed:{
    type:Boolean,
    default:true
  }
},
{
  timestamps:true
}
);

export default mongoose.model(
  "Pomodoro",
  pomodoroSchema
);