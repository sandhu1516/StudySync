import mongoose from "mongoose";

const goalSchema =
new mongoose.Schema({

  userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
  },

  title:{
    type:String,
    required:true
  },

  type:{
    type:String,
    enum:[
      "Weekly",
      "Monthly",
      "Yearly"
    ],
    required:true
  },

  progress:{
    type:Number,
    default:0
  },

  completed:{
    type:Boolean,
    default:false
  }

},
{
  timestamps:true
});

export default mongoose.model(
  "Goal",
  goalSchema
);