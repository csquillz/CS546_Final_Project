const express = require("express");
const router = express.Router();
const data = require("../data");
const transData = data.trans_history;
const uuid = require("node-uuid");

router.post("/transHistory", async function (req, res) {
    console.log(req.body);
});

module.exports = router;