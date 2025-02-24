const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    photoURL: { type: String },
    number: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    pin: { type: String, required: true },
    balance: { type: Number, default: 0 },
    acType: { type: String, required: true },
    acStatus: { type: String, default: "unverified" },
  });

const User = mongoose.model("User", userSchema);

module.exports = User;
