const usersRoute = require("./users");
const userAccountRoute = require("./user-account");
const goalsRoute = require("./users");
const transHistoryRoute = require("./trans-history");


module.exports = {
    users: usersRoute,
    userAccount: userAccountRoute,
    goals: goalsRoute,
    transHistory: transHistoryRoute
};