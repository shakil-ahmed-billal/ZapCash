const express = require("express");
const { sendCash } = require("../controllers/transactionController");
const router = express.Router();

router.post("/trx", sendCash);


module.exports = router;