const express = require("express");
const { userStats, getAdminIncome } = require("../controllers/userStatsControllers");


const router = express.Router();


router.get("/userStats", userStats);
router.get("/getAdminIncome", getAdminIncome);

module.exports = router;