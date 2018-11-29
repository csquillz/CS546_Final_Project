const bcrypt = require('bcrypt');

const users = [
  {
    _id: "1245325124124",
    username: "masterdetective123",
    firstName: "Sherlock",
    lastName: "Holmes",
    profession: "Detective",
    bio: "Sherlock Holmes (/ˈʃɜːrlɒk ˈhoʊmz/) is a fictional private detective created by British author Sir Arthur Conan Doyle. Known as a 'consulting detective' in the stories, Holmes is known for a proficiency with observation, forensic science, and logical reasoning that borders on the fantastic, which he employs when investigating cases for a wide variety of clients, including Scotland Yard.",
    hashedPassword: "$2a$16$7JKSiEmoP3GNDSalogqgPu0sUbwder7CAN/5wnvCWe6xCKAKwlTD."
  },
  {
    _id: "723445325124124",
    username: "lemon",
    firstName: "Elizabeth",
    lastName: "Lemon",
    profession: "Writer",
    bio: "Elizabeth Miervaldis 'Liz' Lemon is the main character of the American television series 30 Rock. She created and writes for the fictional comedy-sketch show The Girlie Show or TGS with Tracy Jordan.",
    hashedPassword: "$2a$16$SsR2TGPD24nfBpyRlBzINeGU61AH0Yo/CbgfOlU1ajpjnPuiQaiDm"
  },
  {
    _id: "123454345325776",
    username: "theboywholived",
    firstName: "Harry",
    lastName: "Potter",
    profession: "Student",
    bio: "Harry Potter is a series of fantasy novels written by British author J. K. Rowling. The novels chronicle the life of a young wizard, Harry Potter, and his friends Hermione Granger and Ron Weasley, all of whom are students at Hogwarts School of Witchcraft and Wizardry. The main story arc concerns Harry's struggle against Lord Voldemort, a dark wizard who intends to become immortal, overthrow the wizard governing body known as the Ministry of Magic, and subjugate all wizards and Muggles.",
    hashedPassword: "$2a$16$4o0WWtrq.ZefEmEbijNCGukCezqWTqz1VWlPm/xnaLM8d3WlS5pnK"
  }
]

let userSessionIds = []


async function checkForExistingUser(username) {
  for (let user of users) {

    if (user.username === username) {
      return true;
    }
  }
  return false
}

async function validatePassword(username, password) {
  for (let user of users) {
    if (user.username === username) {
      let compareToMatch = false
      try{
        compareToMatch = await bcrypt.compare(password, user.hashedPassword)
      }catch(e){
        throw(e)
      }
      return compareToMatch
    }
  }
}

async function getInfo(username) {
  for (let user of users) {
    if (user.username === username) {
      return {
        _id: user._id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        profession: user.profession,
        bio: user.bio,
        hashedPassword: user.hashedPassword
      }
    }
  }
}

async function validateSessionId(sessionId) {
  for (let id of userSessionIds) {
    if (id.sessionId === sessionId) {
      return true;
    }
  }
  return false
}

async function getUserInfoById(sessionId) {
  for (let id of userSessionIds) {
    if (id.sessionId === sessionId) {
      return getInfo(id.username);
    }
  }
}

async function addSessionId(sessionId, username){
  userSessionIds.push({sessionId: sessionId, username: username})
  return userSessionIds
}

async function removeSessionId(sessionId){
  userSessionIds.filter(function(id){return id.sessionId !== sessionId});
  return userSessionIds;
}


let exportedMethods = {checkForExistingUser,validatePassword, getInfo, validateSessionId, getUserInfoById, addSessionId, removeSessionId}
module.exports = exportedMethods;