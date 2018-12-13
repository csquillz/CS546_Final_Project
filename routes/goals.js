const express = require("express");
const router = express.Router();
const data = require("../data");
const usersData = data.users;
const uuid = require("node-uuid");

router.post("/goal", async function (req, res) {
    console.log(req.body);
});

module.exports = router;