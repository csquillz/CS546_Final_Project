const usersRoute = require("./users");
const goalsRoute = require("./users");
const transHistoryRoutes = require("./trans-history");


module.exports = {
    users: usersRoute,
    goals: goalsRoute,
    transHistory: transHistoryRoutes
};