import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const updateProfile = async (req,res) => {

  try{

    const user =
      await User.findById(req.user.id);

    if(!user){

      return res.status(404).json({
        message:"User not found"
      });

    }

    if(req.body.name){

      user.name = req.body.name;

    }

    if(req.body.newPassword){

      const isMatch =
        await bcrypt.compare(

          req.body.currentPassword,

          user.password

        );

      if(!isMatch){

        return res.status(400).json({

          message:"Current password incorrect"

        });

      }

      user.password =
        await bcrypt.hash(

          req.body.newPassword,

          10

        );

    }

    await user.save();

    res.json({

      success:true,

      user: {

  id: user._id,
  name: user.name,
  email: user.email,
  streak: user.streak

}

    });

  }

  catch(error){

    res.status(500).json({

      message:error.message

    });

  }

};

/* =========================
   REGISTER USER
========================= */

export const register = async (req, res) => {

  try {

    const { name, email, password } = req.body;

    const userExists =
      await User.findOne({ email });

    if (userExists) {

      return res.status(400).json({

        message: "User already exists"

      });

    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const user =
      await User.create({

        name,
        email,
        password: hashedPassword

      });

    res.status(201).json({

      success: true,

      message: "User Registered Successfully",

   user: {

  id: user._id,
  name: user.name,
  email: user.email,
  streak: user.streak

}

    });

  }

  catch (error) {

    res.status(500).json({

      success: false,

      message: error.message

    });

  }

};


/* =========================
   LOGIN USER
========================= */

export const login = async (req, res) => {

  try {

    const { email, password } = req.body;

    const user =
      await User.findOne({ email });

    if (!user) {

      return res.status(400).json({

        message: "User not found"

      });

    }

    const isMatch =
      await bcrypt.compare(

        password,
        user.password

      );

    if (!isMatch) {

      return res.status(400).json({

        message: "Invalid Password"

      });

    }

    const token = jwt.sign(

      {
        id: user._id
      },

      process.env.JWT_SECRET,

      {
        expiresIn: "7d"
      }

    );

    res.status(200).json({

      success: true,

      message: "Login Successful",

      token,

user: {

  id: user._id,
  name: user.name,
  email: user.email,
  streak: user.streak

}

    });

  }

  catch (error) {

    res.status(500).json({

      success: false,

      message: error.message

    });

  }

};