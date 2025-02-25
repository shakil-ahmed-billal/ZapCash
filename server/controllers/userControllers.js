const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  try {
    const { email, number, name, pin } = req.body;

    // Validate input fields
    if (!email || !number || !name || !pin) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Ensure number is a string and not null
    if (typeof number !== "string") {
      return res.status(400).json({
        success: false,
        message: "Phone number must be a valid string",
      });
    }

    // Check if user with the same number already exists
    const existingUser = await User.findOne({ number });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User with this number already exists",
      });
    }

    const hashedPin = await bcrypt.hash(pin, 10);
    const token = jwt.sign(
      { email, number },
      process.env.SECRET_KEY,
      { expiresIn: "1d" }
    );
    const user = await User.create({
      name,
      number,
      email,
      pin: hashedPin,
    });
    res
    .cookie("token", token, {
      httpOnly : process.env.NODE_ENV === "production",
      secure : process.env.NODE_ENV === "production",
      sameSite : process.env.NODE_ENV === "production" ? "none" : "strict",
    })
      .status(201)
      .json({
        success: true,
        message: "User created successfully",
        user: {
          name: user.name,
          acType: user.acType,
        },
      });
  } catch (error) {
    console.error("registerUser error", error);

    res.status(500).json({
      success: false,
      message:
        error.code === 11000
          ? "Duplicate entry detected"
          : "Internal Server Error",
    });
  }
};

const loginUser = async (req, res) => {
  try{
    const {number , pin} = req.body;

    if(!number || !pin){
      return res.status(400).send({
        success : false,
        message : "All fields are required"
      })
    }
    const findUser = await User.findOne({number});

    if(!findUser){
      return res.status(400).json({
        success : false,
        message : "User not found"
      })
    }

    if(!await bcrypt.compare(pin , findUser.pin)){
      return res.status(400).send({
        success : false,
        message : "Incorrect pin"
      })
    }

    if(findUser){
      res.status(200).send({
        success: true ,
        message : "User logged in successfully",
        user : {
          name : findUser.name,
          acType : findUser.acType
        }
      })
      
    }
  } catch(error){
    console.log(error);
  }
};

module.exports = { registerUser , loginUser };
