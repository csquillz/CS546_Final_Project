
const mongoCollections = require("../config/mongoCollections");
const goals = mongoCollections.goals;
const uuid = require("node-uuid");

async function addGoal(type, amount, month, username) {

  return goals().then(goalsCollection => {
    let newGoal = {
      _id: uuid.v4(),
      type: type.toLowerCase(),
      amount: amount,
      month: month,
      username: username
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
  const goalCollection = await goals();
  return await goalCollection.find({ username: username }).toArray();
}

async function removeGoal(goalId) {
  if (!goalId) throw "You must provide an id to be removed";
  const goalCollection = await goals();
  
  const deletionInfo = await goalCollection.removeOne({ _id: goalId});

  if (deletionInfo.deletedCount === 0) {
    throw `Could not delete goal with id of ${goalId}`;
  }
  return true;
}


let exportedMethods = { addGoal, getAllGoals, removeGoal }
module.exports = exportedMethods;