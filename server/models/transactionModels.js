const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  sender: { type: String, required: true },
  receiver: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  status: { type: String, default: "confirmed" },
  txType: { type: String , enm:["sendMoney" , "cashOut" , "cashIn" , "B2B"] },
  acType: { type: String , enm:["user" , "agent" , "admin"] },
  charge: { type: Number },

}, { timestamps: true });

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
