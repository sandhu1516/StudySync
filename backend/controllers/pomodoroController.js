import Pomodoro from "../models/Pomodoro.js";
import User from "../models/User.js";

export const saveSession =
async(req,res)=>{

  const session =
  await Pomodoro.create({

    user:req.user.id,

    duration:req.body.duration,

    completed:true

  });

  const user =
    await User.findById(
      req.user.id
    );

  user.totalPoints += 2;

  await user.save();

  res.json(session);

};

export const getSessions =
async(req,res)=>{

  const sessions =
  await Pomodoro.find({

    user:req.user.id

  });

  res.json(sessions);

};