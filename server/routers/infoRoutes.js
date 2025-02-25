const express = require("express");
const { getInfo } = require("../controllers/infoController");

const router = express.Router();

router.get("/info/:email", getInfo);

module.exports = router;
