import Goal from "../models/Goal.js";
import User from "../models/User.js";

export const getGoals =
async (req,res)=>{

  const goals =
  await Goal.find({

    userId:req.user.id

  });

  res.json(goals);

};

export const addGoal =
async (req,res)=>{

  const goal =
  await Goal.create({

    userId:req.user.id,

    title:req.body.title,

    type:req.body.type

  });

  res.json(goal);

};

export const updateGoal =
async (req,res)=>{

  const oldGoal =
    await Goal.findById(
      req.params.id
    );

  const goal =
    await Goal.findByIdAndUpdate(

      req.params.id,

      req.body,

      {new:true}

    );

  if(
    oldGoal.progress < 100 &&
    goal.progress === 100
  ){

    const user =
      await User.findById(
        req.user.id
      );

    user.totalPoints += 25;

    await user.save();

  }

  res.json(goal);

};

export const deleteGoal =
async (req,res)=>{

  await Goal.findByIdAndDelete(
    req.params.id
  );

  res.json({
    message:"Goal Deleted"
  });

};