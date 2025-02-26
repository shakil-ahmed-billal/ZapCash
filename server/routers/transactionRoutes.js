const express = require("express");
const { sendCash, getUserTrx } = require("../controllers/transactionController");
const router = express.Router();

router.post("/trx", sendCash);
router.get("/trx/:number", getUserTrx);


module.exports = router;