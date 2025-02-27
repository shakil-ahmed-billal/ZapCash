const Transaction = require("../models/transactionModels");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");

const addAction = async (req, res) => {
  const { sender, amount, pin, acType, txType } = req.body;

  if (!sender || !amount || !pin || !acType || !txType) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  const senderUser = await User.findOne({ number: sender });
  const admin = await User.findOne({ acType: "admin" });

  if (senderUser?.acStatus !== "verified") {
    console.log("unverified");
    return res
      .status(400)
      .json({ success: false, message: "User not verified " });
  }

  if (!senderUser || !admin) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  if (!(await bcrypt.compare(pin, senderUser.pin))) {
    return res.status(400).json({ success: false, message: "Incorrect pin" });
  }

  try {
    if (txType === "cashRequest" && acType === "agent") {
      // Create cash request transaction (status pending)
      const transaction = new Transaction({
        sender: senderUser.number,
        receiver: admin.number,
        amount,
        acType,
        charge: 0,
        date: new Date(),
        status: "pending",
        txType: "cashRequest",
      });

      await transaction.save();
      return res.status(200).json({
        success: true,
        message: "Cash request sent successfully. Waiting for admin approval.",
        data: transaction,
      });
    }

    if (txType === "withdrawRequest" && acType === "agent") {
      if (senderUser.balance < amount) {
        return res
          .status(400)
          .json({ success: false, message: "Insufficient balance" });
      }

      // Create withdraw request transaction
      const transaction = new Transaction({
        sender: senderUser.number,
        receiver: admin.number,
        amount,
        acType,
        charge: 0,
        date: new Date(),
        status: "pending",
        txType: "withdrawRequest",
      });

      await transaction.save();
      return res.status(200).json({
        success: true,
        message:
          "Withdrawal request sent successfully. Waiting for admin approval.",
        data: transaction,
      });
    }

    return res
      .status(400)
      .json({ success: false, message: "Invalid transaction type" });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// Admin Approving Requests (Cash Recharge & Withdrawal)
const approveRequest = async (req, res) => {
  const { transactionId } = req.body;

  console.log(transactionId);
  if (!transactionId) {
    return res
      .status(400)
      .json({ success: false, message: "Transaction ID is required" });
  }

  try {
    const transaction = await Transaction.findById(transactionId);
    if (!transaction) {
      return res
        .status(404)
        .json({ success: false, message: "Transaction not found" });
    }

    const agentUser = await User.findOne({ number: transaction.sender });
    const admin = await User.findOne({ acType: "admin" });

    if (!agentUser || !admin) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    if (transaction.status !== "pending") {
      return res
        .status(400)
        .json({ success: false, message: "Transaction already processed" });
    }
    if (transaction.txType === "cashRequest") {
      agentUser.balance += 100000;
    } else if (transaction.txType === "withdrawRequest") {
      if (agentUser.balance < transaction.amount) {
        return res
          .status(400)
          .json({
            success: false,
            message: "Insufficient balance for withdrawal",
          });
      }
      agentUser.balance -= transaction.amount;
      admin.balance += transaction.amount;
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Invalid transaction type" });
    }

    transaction.status = "approved";
    await admin.save();
    await transaction.save();

    await agentUser.save();

    return res.status(200).json({
      success: true,
      message: `${
        transaction.txType === "cashRequest"
          ? "Cash request"
          : "Withdrawal request"
      } approved successfully.`,
      data: transaction,
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { addAction, approveRequest };
