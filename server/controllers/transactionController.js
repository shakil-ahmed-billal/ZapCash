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
  if (txType === "sendMoney") {
    if (acType === "user") {
      try {
        // send money function
        let charge = 0;
        const totalAmount = amount + charge;

        if (receiverUser.acType == "agent") {
          console.log(receiverUser);
          return res
            .status(400)
            .json({ success: false, message: "Account is not personal" });
        }
        if (amount > 100) {
          charge = 5;
        }

        receiverUser.balance += amount;
        admin.balance += charge;

        console.log(senderUser.balance, amount);
        if (senderUser.balance < totalAmount) {
          return res
            .status(400)
            .json({ success: false, message: "Insufficient balance" });
        }

        await receiverUser.save();
        await admin.save();
        senderUser.balance -= totalAmount;
        await senderUser.save();

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
          message: `Send Money successfully`,
          data: transaction,
        });
      } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
      }
    }
  }

  if (txType === "cashOut") {
    if (acType === "user") {
      try {
        let charge = 0;

        // agent cash out function
        const cashOutFee = amount * 0.015;
        const agentIncome = amount * 0.01;
        const adminIncome = amount * 0.005;
        const totalDeduction = amount + cashOutFee;

        console.log(
          amount,
          cashOutFee,
          agentIncome,
          adminIncome,
          totalDeduction
        );
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
          receiverUser.balance += amount + agentIncome;
          admin.balance += adminIncome;
        }

        await receiverUser.save();
        await admin.save();
        senderUser.balance -= totalDeduction;
        await senderUser.save();

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
          message: `Cash Out successfully`,
          data: transaction,
        });
      } catch (error) {
        res.status(500).json({ success: false, message: error.message });
      }
    }
  }

  // agent  account transaction function
  if (txType === "cashIn") {
    if (acType === "agent") {
      try {
        if (!senderUser || !receiverUser) {
          return res
            .status(404)
            .json({ success: false, message: "User not found" });
        }

        let charge = 0;

        // cashIn transaction calculation
        if (!receiverUser.acType === "user") {
          return res
            .status(400)
            .json({ success: false, message: "Receiver is not a user" });
        }
        receiverUser.balance += amount;
        admin.balance += charge;

        console.log(senderUser.balance, receiverUser.balance, admin.balance);

        if (senderUser?.balance < amount) {
          return res.status(400).send({
            message: "Insufficient Balance",
          });
        }

        await receiverUser.save();
        await admin.save();

        senderUser.balance = senderUser.balance - amount;
        await senderUser.save();

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
          success: true,
          message: `${txType === "cashIn" && "Cash In"} Successfully Done`,
        });
      } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
      }
    }
  }
};

const getUserTrx = async (req, res) => {
  const { number } = req.params;

  try {
    const user = await User.findOne({ number });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const transactions = await Transaction.find({
      $or: [{ sender: number }, { receiver: number }],
    }).sort({ createdAt: -1 });

    if (transactions.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No transactions found" });
    }

    res.status(200).json({
      message: `Transactions for ${user.name}`,
      success: true,
      data: transactions,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getUserTrx };

module.exports = { sendCash, getUserTrx };
