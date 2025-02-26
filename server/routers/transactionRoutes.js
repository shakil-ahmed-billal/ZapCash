const express = require("express");
const { sendCash, getUserTrx } = require("../controllers/transactionController");
const { getAllTrx } = require("../controllers/allTrxControllers");
const router = express.Router();

router.post("/trx", sendCash);
router.get("/trx/:number", getUserTrx);
router.get("/allTrx", getAllTrx);

module.exports = router;