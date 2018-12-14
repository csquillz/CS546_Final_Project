const express = require("express");
const router = express.Router();
const data = require("../data");
const goalsData = data.goals;
const userData = data.users;
const uuid = require("node-uuid");

router.post("/goal", async function (req, res) {
    let type = req.body.type;
    let amount = req.body.amount;
    let month = req.body.month;
    let sessionId = req.cookies.sessionId;
    let userInfo = await userData.getUserInfoById(sessionId);
    let username = userInfo.Account.userName;
    await goalsData.addGoal(type, amount, month, username);
});

router.post("/removegoal", async function (req, res) {
    let goalId = req.body.id;
    await goalsData.removeGoal(goalId);
});

module.exports = router;