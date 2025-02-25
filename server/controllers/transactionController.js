const Transaction = require("../models/transactionModels");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");

const sendCash = async (req, res) => {
  const { sender, receiver,amount, pin, acType, txType } = req.body;

  if (!sender || !receiver || !amount || !pin || !acType || !txType) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  if (amount < 50) {
    return res.status(400).json({ success: false, message: "Minimum amount to send is 50 taka" });
  }

  try {
    if (acType === "user") {
      const senderUser = await User.findOne({ number: sender });
      const receiverUser = await User.findOne({ number: receiver });
      const admin = await User.findOne({ acType: "admin" });

      if (!senderUser || !receiverUser) {
        return res
          .status(404)
          .json({ success: false, message: "User not found" });
      }

      if (!(await bcrypt.compare(pin, senderUser.pin))) {
        return res
          .status(400)
          .json({ success: false, message: "Incorrect pin" });
      }

      let charge = 0;
      if (amount > 100) {
        charge = 5;
      }

      const totalAmount = amount + charge;

      console.log(totalAmount , senderUser.balance , amount);

      if (senderUser.balance < totalAmount) {
        return res
          .status(400)
          .json({ success: false, message: "Insufficient balance" });
      }

      if (txType === "sendMoney") {
        senderUser.balance -= totalAmount;
        receiverUser.balance += amount;
        if (admin) {
          admin.balance += charge;
        }
      }

      await senderUser.save();
      await receiverUser.save();
      if (admin) {
        await admin.save();
      }

      const transaction = new Transaction({
        sender: senderUser.number,
        receiver: receiverUser.number,
        amount,
        date: new Date(),
        status: "confirmed",
        txType,
        acType,
        charge,
      });

      await transaction.save();

      return res.status(200).json({
        success: true,
        message: "Cash sent successfully",
        data: transaction,
      });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { sendCash };
