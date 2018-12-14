const express = require("express");
const router = express.Router();
const data = require("../data");
const transData = data.transHistory;
const userData = data.users;
const uuid = require("node-uuid");

router.post("/transHistory", async function (req, res) {
    let type = req.body.type;
    let store = req.body.store;
    let amount = req.body.amount;
    let date = req.body.date;
    let description = req.body.description;
    let sessionId = req.cookies.sessionId;
    let userInfo = await userData.getUserInfoById(sessionId);
    let username = userInfo.Account.userName;
    await transData.addTransaction(type, store, amount, date, description, username);
});

router.post("/removetrans", async function (req, res) {
    let transId = req.body.id;
    await transData.removeTransaction(transId);
});

module.exports = router;