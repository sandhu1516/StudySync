import Task from "../models/Task.js";
import User from "../models/User.js";

export const getTasks =
async (req, res) => {

  const tasks =
    await Task.find({

      userId:
      req.user.id

    });

  res.json(tasks);

};

export const createTask =
async (req, res) => {

  const task =
    await Task.create({

      title:
      req.body.title,

      userId:
      req.user.id

    });

  res.json(task);

};

export const updateTask =
async (req, res) => {

  console.log("UPDATE TASK HIT");

  const oldTask =
    await Task.findById(
      req.params.id
    );

  const task =
    await Task.findByIdAndUpdate(

      req.params.id,

      req.body,

      { new:true }

    );

if(
  !oldTask.completed &&
  task.completed
){

  const user =
    await User.findById(
      req.user.id
    );

  user.totalPoints += 10;

 const today = new Date();

if (!user.lastTaskDate) {

  user.streak = 1;

} else {

  const lastDate = new Date(user.lastTaskDate);

const todayDateOnly =
  today.toISOString().split("T")[0];

const lastDateOnly =
  lastDate.toISOString().split("T")[0];

console.log("TODAY DATE =", todayDateOnly);
console.log("LAST DATE =", lastDateOnly);

const diffDays = Math.floor(
  (
    new Date(todayDateOnly) -
    new Date(lastDateOnly)
  ) /
  (1000 * 60 * 60 * 24)
);

console.log("DIFF DAYS =", diffDays);

  console.log("LAST DATE =", lastDate);
  console.log("TODAY =", today);
  console.log("DIFF DAYS =", diffDays);
  console.log("STREAK BEFORE =", user.streak);

  if (diffDays >= 1 && diffDays < 2) {

    user.streak += 1;

  }

  else if (diffDays >= 2) {

    user.streak = 1;

  }

  console.log("STREAK AFTER =", user.streak);

}

user.lastTaskDate = new Date();

  console.log("OLD STREAK:", user.streak);
console.log("LAST DATE:", user.lastTaskDate);
console.log("TODAY:", today);

console.log("STREAK AFTER =", user.streak);

  await user.save();

  console.log("NEW STREAK:", user.streak);

}

  res.json(task);

};

export const deleteTask =
async (req, res) => {

  await Task.findByIdAndDelete(

    req.params.id

  );

  res.json({
    message:
    "Task Deleted"
  });

};