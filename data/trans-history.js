const mongoCollections = require("../config/mongoCollections");
const trans_history = mongoCollections.trans_history;
const uuid = require("node-uuid");

async function addTransaction(type, store, amount, date, description, username) {
    return trans_history().then(transactionCollection => {
    let newTransaction = {
        _id: uuid.v4(),
        type: type.toLowerCase(),
        store: store.toLowerCase(),
        amount: amount,
        date: date,
        description: description.toLowerCase(),
        username: username,
    };

    return transactionCollection
        .insertOne(newTransaction)
        .then(newInsertInformation => {
        return newInsertInformation.insertedId;
        })
        .then(newId => {
        return true;
        });
  });
}

async function getAllTransactions(username) {
    const transactionCollection = await trans_history();
    return await transactionCollection.find({username: username}).toArray();
}

async function removeTransaction(transId) {
    if (!transId) throw "You must provide an id to be removed";
    const transactionCollection = await trans_history();
    
    const deletionInfo = await transactionCollection.removeOne({ _id: transId});
  
    if (deletionInfo.deletedCount === 0) {
      throw `Could not delete transaction with id of ${transId}`;
    }
    return true;
  }

let exportedMethods = { addTransaction, getAllTransactions, removeTransaction}
module.exports = exportedMethods;