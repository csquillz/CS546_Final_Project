const express = require("express");
const router = express.Router();
const data = require("../data");
const transData = data.transHistory;
const userData = data.users;
const xss = require("xss");

router.post("/transHistory", async function (req, res) {
    let type = xss(req.body.type);
    let store = xss(req.body.store);
    let amount = xss(req.body.amount);
    let date = xss(req.body.date);
    let description = xss(req.body.description);
    let sessionId = xss(req.cookies.sessionId);
    let userInfo = await userData.getUserInfoById(sessionId);
    let username = userInfo.Account.userName;
    await transData.addTransaction(type, store, amount, date, description, username);
});

router.post("/removetrans", async function (req, res) {
    let transId = xss(req.body.id);
    await transData.removeTransaction(transId);
});

module.exports = router;