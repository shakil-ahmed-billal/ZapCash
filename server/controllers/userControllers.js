const User = require("../models/userModel");
const bcrypt = require("bcrypt");

const registerUser = async (req, res) => {
  const { email, number, name, pin, acType } = req.body;
  console.log("user");
  const hashedPin = await bcrypt.hash(pin, 10);
  try {
    const user = await User.create({
      name,
      number,
      email,
      pin: hashedPin,
      acType,
    });

    if(!user){
      res.status(400).json({
        success: false,
        message: "User already exist",
      });
    }

    res.status(200).json({
      success: true,
      message: "User created successfully",
      user:{
        name: user.name,
        acType: user.acType
      }
    });
  } catch (error) {
    console.log("registerUser error", error);
    res.status(400).json({
      success: false,
      message: "User already exist",
    });
  }
};


module.exports = { registerUser };
