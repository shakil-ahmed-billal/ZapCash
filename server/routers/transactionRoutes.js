const express = require("express");
const { sendCash, getUserTrx } = require("../controllers/transactionController");
const { getAllTrx } = require("../controllers/allTrxControllers");
const { addAction, approveRequest } = require("../controllers/actionControllers");
const router = express.Router();

router.post("/trx", sendCash);
router.get("/trx/:number", getUserTrx);
router.get("/allTrx", getAllTrx);
router.post("/addAction" , addAction)
router.post("/approveRequest" , approveRequest)

module.exports = router;