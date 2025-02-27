const Transaction = require("../models/transactionModels");
const User = require("../models/userModel");

const userStats = async (req, res) => {
  try {
    const { userType, userNumber } = req.query;

    if (!userType || !userNumber) {
      return res
        .status(400)
        .json({ success: false, message: "User type and number are required" });
    }

    const user = await User.findOne({ number: userNumber });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Fetch transactions related to the user
    const transactions = await Transaction.find({
      $or: [{ sender: userNumber }, { receiver: userNumber }],
    });

    const totalTrx = transactions.length;
    let totalCharge = 0;
    let totalReceived = 0;
    let totalSent = 0;

    transactions.forEach((trx) => {
      if (trx.sender === userNumber) {
        totalSent += trx.amount;
        totalCharge += trx.charge;
      }
      if (trx.receiver === userNumber) {
        totalReceived += trx.amount;
      }
    });

    res.status(200).json({
      success: true,
      data: {
        userType,
        totalTrx,
        totalCharge,
        totalReceived,
        totalSent,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};



const getAdminIncome = async (req, res) => {
  try {
    // Fetch all transactions
    const transactions = await Transaction.find();

    let totalFixedIncome = 0; // 5 Taka
    let totalCashOutIncome = 0; // 0.5% fee
    let totalIncome = 0;

    transactions.forEach((trx) => {

      if (trx.txType === "sendMoney") {
        totalFixedIncome += trx.amount > 100 ? 5 : 0;
      }

      if (trx.txType === "cashOut") {
        totalCashOutIncome += trx.amount * 0.005;
      }
    });

    totalIncome = totalFixedIncome + totalCashOutIncome;

    res.status(200).json({
      success: true,
      data: {
        totalFixedIncome,
        totalCashOutIncome,
        totalIncome,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { userStats, getAdminIncome };
