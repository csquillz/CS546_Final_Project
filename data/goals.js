
const mongoCollections = require("../config/mongoCollections");
const goals = mongoCollections.goals;
const uuid = require("node-uuid");
const bcrypt = require("bcrypt");
const saltRounds = 16;

async function addGoals(type, amount, month) {

  const hash = await bcrypt.hash(password, saltRounds);

  return goals().then(goalsCollection => {
    let newGoal = {
        type: type.toLowerCase(),
        amount: amount.toLowerCase(),
        month: month.toLowerCase()
    };

    return goalsCollection
      .insertOne(newGoal)
      .then(newInsertInformation => {
        return newInsertInformation.insertedId;
      })
      .then(newId => {
        return true;
        //return this.getUserById(newId);
      });
  });
}

async function getAllGoals(username) {
   for (let goal of goals) {
     if (user.username === username) {
      return {
        type: type.toLowerCase(),
        amount: amount.toLowerCase(),
        month: month.toLowerCase() 
       }
     }
   }
 }

 async function removeGoal(goal) {

  const goalCollection = await goals();

  const updatedInfo = await goalCollection.updateOne({ sessionId: sessionId }, { $set: {sessionId: null }});

  if (updatedInfo.modifiedCount === 0) {
    throw "could not update goal successfully";
  }

  return await this.getGoalInfoByUsername(username);
}


let exportedMethods = { addGoals, getAllGoals, removeGoal }
module.exports = exportedMethods;