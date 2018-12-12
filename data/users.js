const mongoCollections = require("../config/mongoCollections");
const users = mongoCollections.users;
const uuid = require("node-uuid");
const bcrypt = require("bcrypt");
const saltRounds = 16;

async function addUser(firstName, lastName, userName, password) {

  const hash = await bcrypt.hash(password, saltRounds);

  return users().then(usersCollection => {
    let newUser = {
      _id: uuid.v4(),
      username: userName,
      sesssioId: uuid.v4(),
      hashedPassword: hash,
      Account: {
        firstName: firstName,
        lastName: lastName,
        userName: userName
      }
    };

    return usersCollection
      .insertOne(newUser)
      .then(newInsertInformation => {
        return newInsertInformation.insertedId;
      })
      .then(newId => {
        return true;
        //return this.getUserById(newId);
      });
  });
}


async function checkForExistingUser(username) {
  if (!username) throw "Invalid username";
  return users().then(usersCollection => {
    return usersCollection.findOne({ username: username }).then(account => {
      if (!account) throw "username not found";
      return account;
    });
  });
}

async function validatePassword(username, password) {
  const userInfo = checkForExistingUser(username);
  let compareToMatch = false
  try {
    compareToMatch = await bcrypt.compare(password, userInfo.hashedPassword)
  } catch (e) {
    throw (e)
  }
  return compareToMatch;
}

async function getInfo(username) {
  for (let user of users) {
    if (user.username === username) {
      return {
        _id: user._id,
        username: user.username,
        hashedPassword: user.hashedPassword,
        Account: {
          _id: user._id,
          firstName: user.firstName,
          lastName: user.lastName
        }
      }
    }
  }
}

async function validateSessionId(sessionId) {
  if (!sessionId) throw "Invalid session Id";
  return users().then(usersCollection => {
    return usersCollection.findOne({ sessionId: sessionId }).then(account => {
      if (!account) throw "username not found";
      return account;
    });
  });
}

async function getUserInfoById(sessionId) {
  validateSessionId(sessionId)
}

async function addSessionId(sessionId, username) {
  // const userCollection = await recipes();

  // const updatedInfo = await userCollection.updateOne({ username: username }, { $set: updatedUser });

  // if (updatedInfo.modifiedCount === 0) {
  //   throw "could not update recipe successfully";
  // }
  return await this.getUserInfoById(id);

  // userSessionIds.push({ sessionId: sessionId, username: username })
  // return userSessionIds
}

async function removeSessionId(sessionId) {
  return await this.getUserInfoById(id);
 
  // userSessionIds.filter(function (id) { return id.sessionId !== sessionId });
  // return userSessionIds;
}


let exportedMethods = { addUser, checkForExistingUser, validatePassword, getInfo, validateSessionId, getUserInfoById, addSessionId, removeSessionId }
module.exports = exportedMethods;