const usersRoute = require("./users");
const goalsRoute = require("./goals");
const transHistoryRoutes = require("./trans-history");


module.exports = {
    users: usersRoute,
    goals: goalsRoute,
    transHistory: transHistoryRoutes
};