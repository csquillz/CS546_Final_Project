const express = require("express");
const router = express.Router();
const data = require("../data");
const goalsData = data.goals;
const uuid = require("node-uuid");

router.post("/goal", async function (req, res) {
    console.log(req.body);
});

module.exports = router;