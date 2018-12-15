const express = require("express");
const router = express.Router();
const data = require("../data");
const userData = data.users;
const goalsData = data.goals;
const utilities = require("../data/utilities");
const transHistory = data.transHistory;
const uuid = require("node-uuid");
const xss = require("xss");

router.get("/charts", async function (req, res) {
    const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
    ];
    var date = new Date();
    var month = date.getMonth();
    var monthName = monthNames[month];
    res.render("pages/charts", {month: monthName});
});

router.get("/pieChartData", async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let sessionId = xss(req.cookies.sessionId);
    let userInfo = await userData.getUserInfoById(sessionId);
    let username = userInfo.Account.userName;
    let data = await transHistory.getAllTransactions(username);
    let finalData = [];
    var currentDate = new Date();
    var currentMonth = currentDate.getMonth() + 1;
    data.forEach(elem => {
        var d = new Date(elem.date);
        var day = elem.date.substring(elem.date.lastIndexOf("-")+1)
        var month = d.getMonth() + 1;
        if (day == "01") {
            month = new Date().getMonth() + 1;
        }
        if (month == currentMonth) {
            let data = {
                amount: elem.amount,
                type: elem.store
            }
            finalData.push(data);
        }
    });
    res.send(JSON.stringify(finalData));
});

router.get("/getBarChartData", async function (req, res) {
    let sessionId =  xss(req.cookies.sessionId);
    let userInfo = await userData.getUserInfoById(sessionId);
    let username = userInfo.Account.userName;
    let data = await transHistory.getAllTransactions(username);
    let finalData = [];
    var currentDate = new Date();
    var currentMonth = currentDate.getMonth() + 1;
    data.forEach(elem => {
        var d = new Date(elem.date);
        var day = elem.date.substring(elem.date.lastIndexOf("-")+1)
        var month = d.getMonth() + 1;
        if (day == "01") {
            month = new Date().getMonth() + 1;
        }
        if (month == currentMonth) {
            let data = {
                amount: elem.amount,
                type: elem.store
            }
            finalData.push(data);
        }
    });
    res.send(JSON.stringify(finalData));
});

module.exports = router;