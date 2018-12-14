const dbConnection = require("../config/mongoConnection");
const data = require("../data/");
const users = data.users;
const goals = data.goals;
const transactions = data.transHistory;

dbConnection().then(
    db => {
        return db
            .dropDatabase()
            .then(() => {
                return dbConnection;
            })
            .then(db => {
                return users.addUser("Caroline", "Squillante", "csquilla", "CSRocks");
            })
            .then(CarolineId => {
                return users.checkForExistingUserById(CarolineId);
            })
            .then(userData => {
                let username = userData.username;
                return goals.addGoal("Coffee", "30.00", "2018-12", username)
                    .then(() => {
                        return goals.addGoal("Food", "120.00", "2019-01", username);
                    })
                    .then(() => {
                        return goals.addGoal("Clothes", "100.00", "2019-01", username);
                    })
                    .then(() => {
                        return transactions.addTransaction("Coffee", "Starbucks", "4.00", "12/10/2018", "Finals got me down", username);
                    })
                    .then(() => {
                        return transactions.addTransaction("Coffee", "Dunkin", "2.50", "12/13/2018", "Finals are the worst", username);
                    })
                    .then(() => {
                        return transactions.addTransaction("Clothes", "Loft", "50.00", "12/12/2018", "I needed clothes for the holiday party", username);
                    });
            })
            .then(() => {
                console.log("Done seeding database");
                db.serverConfig.close();
            })
    },
error => {
    console.error(error);
});