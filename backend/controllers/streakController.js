import User from "../models/User.js";

export const getStreak = async (req, res) => {

  try {

    const user = await User.findById(req.user.id);

    res.json({
      currentStreak: user.streak || 0
    });

  }

  catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};