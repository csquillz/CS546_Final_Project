const express = require("express");
const router = express.Router();
const data = require("../data");
const goalsData = data.goals;
const userData = data.users;
const xss = require("xss");

router.post("/goal", async function (req, res) {
    let type = xss(req.body.type);
    let amount = xss(req.body.amount);
    let month = xss(req.body.month);
    let sessionId = xss(req.cookies.sessionId);
    let userInfo = await userData.getUserInfoById(sessionId);
    let username = userInfo.Account.userName;
    await goalsData.addGoal(type, amount, month, username);
});

router.post("/removegoal", async function (req, res) {
    let goalId = xss(req.body.id);
    await goalsData.removeGoal(goalId);
});

module.exports = router;