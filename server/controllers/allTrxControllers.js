const Transaction = require("../models/transactionModels");

const getAllTrx = async (req, res) => {
  try {
    const { search, status ,txType } = req.query;
    let query = {};

    if (search) {
      query.$or = [
        { sender: { $regex: search, $options: "i" } },
        { receiver: { $regex: search, $options: "i" } }
      ];
    }

    if (status) {
      query.status = status;
      query.txType = txType
    }

    const transactions = await Transaction.find(query)
      .sort({ createdAt: -1 }) 
      .limit(100);

    res.status(200).json({ success: true, data: transactions });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getAllTrx };

