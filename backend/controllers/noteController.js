import Note from "../models/Note.js";

export const getNotes =
async(req,res)=>{

  const notes =
  await Note.find({

    user:req.user.id

  });

  res.json(notes);

};

export const addNote =
async(req,res)=>{

  const note =
  await Note.create({

    user:req.user.id,

    subject:req.body.subject,

    title:req.body.title,

    content:req.body.content

  });

  res.json(note);

};

export const updateNote =
async(req,res)=>{

  const note =
  await Note.findByIdAndUpdate(

    req.params.id,

    req.body,

    {
      new:true
    }

  );

  res.json(note);

};

export const deleteNote =
async(req,res)=>{

  await Note.findByIdAndDelete(
    req.params.id
  );

  res.json({
    message:"Deleted"
  });

};