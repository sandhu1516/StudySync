import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

  name:{
    type:String,
    required:true
  },

  email:{
    type:String,
    required:true
  },

  password:{
    type:String,
    required:true
  },

  totalPoints:{
    type:Number,
    default:0
  },

  streak:{
    type:Number,
    default:0
  },

  lastTaskDate:{
    type:Date
  }

});

export default mongoose.model("User", userSchema);