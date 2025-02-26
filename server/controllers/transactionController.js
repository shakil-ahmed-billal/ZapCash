const Transaction = require("../models/transactionModels");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");

const sendCash = async (req, res) => {
  const { sender, receiver, amount, pin, acType, txType } = req.body;

  if (!sender || !receiver || !amount || !pin || !acType || !txType) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  if (amount < 50) {
    return res
      .status(400)
      .json({ success: false, message: "Minimum amount to send is 50 taka" });
  }

  const senderUser = await User.findOne({ number: sender });
  const receiverUser = await User.findOne({ number: receiver });
  const admin = await User.findOne({ acType: "admin" });

  // user or account validation
  if (!senderUser || !receiverUser) {
    return res.status(404).json({ success: false, message: "User not found" });
  }
  if (!(await bcrypt.compare(pin, senderUser.pin))) {
    return res.status(400).json({ success: false, message: "Incorrect pin" });
  }

  // user personal account transaction function
  if (acType === "user") {
    try {
      // send money function
      let charge = 0;
      const totalAmount = amount + charge;
      if (txType === "sendMoney") {
        if (receiverUser.acType == "agent") {
          console.log(receiverUser);
          return res
            .status(400)
            .json({ success: false, message: "Account is not personal" });
        }
        if (amount > 100) {
          charge = 5;
        }
        senderUser.balance -= totalAmount;
        receiverUser.balance += amount;
        admin.balance += charge;
      }

      // agent cash out function
      const cashOutFee = amount * 0.015;
      const agentIncome = amount * 0.01;
      const adminIncome = amount * 0.005;
      const totalDeduction = amount + cashOutFee;

      console.log(amount, cashOutFee, agentIncome, adminIncome, totalDeduction);
      if (txType === "cashOut") {
        if (receiverUser.acType === "user") {
          return res
            .status(400)
            .json({ success: false, message: "Receiver is not an agent" });
        }
        if (senderUser.balance < totalDeduction) {
          return res
            .status(400)
            .json({ success: false, message: "Insufficient balance" });
        }
        charge = cashOutFee;
        senderUser.balance -= totalDeduction;
        receiverUser.balance += amount + agentIncome;
        if (admin) {
          admin.balance += adminIncome;
        }
      }

      if (senderUser.balance < totalAmount) {
        return res
          .status(400)
          .json({ success: false, message: "Insufficient balance" });
      }

      await senderUser.save();
      await receiverUser.save();
      await admin.save();

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
        message: `${
          txType === "sendMoney" ? "Sent money" : "Cash out"
        } successfully`,
        data: transaction,
      });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }

  // agent  account transaction function
  if (acType === "agent") {
    try {
      if (!senderUser || !receiverUser) {
        return res
          .status(404)
          .json({ success: false, message: "User not found" });
      }

      let charge = 0;

      // cashIn transaction calculation
      if (txType === "cashIn") {
        if (!receiverUser.acType === "user") {
          return res
            .status(400)
            .json({ success: false, message: "Receiver is not a user" });
        }
        senderUser.balance -= amount;
        receiverUser.balance += amount;
        admin.balance += charge;
      }

      if (senderUser?.balance < amount) {
        return res.status(400).send({
          message: "Insufficient Balance",
        });
      }

      await senderUser.save();
      await receiverUser.save();
      await admin.save();

      const transaction = new Transaction({
        sender: senderUser?.number,
        receiver: receiverUser?.number,
        amount,
        date: new Date(),
        status: "confirmed",
        txType,
        acType,
        charge,
      });

      await transaction.save();
      res.status(200).send({
        success: true ,
        message: `${txType === "cashIn" && "Cash In"} Successfully Done`
      })
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }
};

module.exports = { sendCash };
