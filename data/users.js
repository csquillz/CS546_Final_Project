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
      username: userName.toLowerCase(),
      sessionId: "",
      hashedPassword: hash,
      Account: {
        firstName: firstName.toLowerCase(),
        lastName: lastName.toLowerCase(),
        userName: userName.toLowerCase()
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
    return usersCollection.findOne({ username: username.toLowerCase() }).then(account => {
      if (!account) throw "username not found";
      return account;
    });
  });
}

async function validatePassword(username, password) {
  const userInfo = await checkForExistingUser(username);
  // console.log(userInfo)
  // console.log(userInfo.hashedPassword)
  //console.log(password)
  let compareToMatch = false
  try {
    compareToMatch = await bcrypt.compare(password, String(userInfo.hashedPassword))
  } catch (e) {
    throw (e)
  }
  return compareToMatch;
}

// async function getInfo(username) {
//   for (let user of users) {
//     if (user.username === username) {
//       return {
//         _id: user._id,
//         username: user.username,
//         hashedPassword: user.hashedPassword,
//         Account: {
//           _id: user._id,
//           firstName: user.firstName,
//           lastName: user.lastName
//         }
//       }
//     }
//   }
// }

async function validateSessionId(sessionId) {
  //if (!sessionId) throw "Invalid session Id";
  return users().then(usersCollection => {
    return usersCollection.findOne({ sessionId: sessionId }).then(account => {
      //if (!account) throw "Session Id not found";
      return account;
    });
  });
}

async function getUserInfoById(sessionId) {
  validateSessionId(sessionId)
}

async function addSessionId(newsessionId, username) {
  const usersCollection = await users();

  //console.log(username);
  //console.log(sessionId);
  // console.log(await checkForExistingUser(username));
  //const updatedUser =  await usersCollection.findOne({ username: username })
  const updatedInfo = await usersCollection.updateOne({ username: username }, { $set: {sessionId: newsessionId}});
  //console.log(updatedUser)
  if (updatedInfo.modifiedCount === 0) {
    throw "could not update session id successfully";
  }
  //console.log(await checkForExistingUser(username));
  return await this.checkForExistingUser(username);
}

async function removeSessionId(sessionId) {

  const userCollection = await users();

  const updatedInfo = await userCollection.updateOne({ sessionId: sessionId }, { $set: {sessionId: null }});

  if (updatedInfo.modifiedCount === 0) {
    throw "could not update user successfully";
  }

  return await this.getUserInfoById(sessionId);
}


let exportedMethods = { addUser, checkForExistingUser, validatePassword, validateSessionId, getUserInfoById, addSessionId, removeSessionId }
module.exports = exportedMethods;