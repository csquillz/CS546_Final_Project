const express = require("express");
const router = express.Router();
const data = require("../data");
const usersData = data.users;
const uuid = require("node-uuid");

router.use("/", async function (req, res, next) {
    if (req.originalUrl == "/") {
        //console.log(req.cookies.sessionId)
        valID = await usersData.validateSessionId(req.cookies.sessionId)
        if (req.cookies.name === 'AuthCookie' && valID) {
            next();
        } else {
            res.render("pages/index", {
                title: "Login"
            });
        }
    } else {
        next();
    }
});

router.use("/private", async function (req, res, next) {
    if (req.cookies.name === 'AuthCookie' && await usersData.validateSessionId(req.cookies.sessionId)) {
        next();
    } else {
        res.clearCookie('name')
        res.clearCookie('sessionId')
        res.status(403).render("pages/error", { title: "Error! No access." })
        return;
    }
});

router.post("/signup", async function (req, res) {
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let username = req.body.username;
    let password = req.body.password
    //const goodUsername = await usersData.checkForExistingUser(username);
    //const goodPassword = await usersData.validatePassword(username, password);
    await usersData.addUser(firstName, lastName, username, password);
    //add auth check?
    res.cookie('name', 'AuthCookie')
        //await usersData.getInfo(username);
    const sessionId = uuid.v4();
    res.cookie("sessionId", sessionId)
    await usersData.addSessionId(sessionId, username)
    res.redirect("/private");
});

router.get("/signup", async function (req, res) {
    //const sessionId = req.cookies.sessionId;
    //const user = await usersData.getUserInfoById(sessionId);
    res.render("pages/signup", {
        title: "Sign Up"
    })
});

router.post("/login", async function (req, res) {
    let username = req.body.username;
    let password = req.body.password;

    const goodUsername = await usersData.checkForExistingUser(username);
    const goodPassword = await usersData.validatePassword(username, password);
    //console.log(password)
    //console.log(goodPassword)
    //console.log(goodPassword.hashedPassword)
    // console.log(goodPassword._id)
    if (goodUsername && goodPassword) {
        res.cookie('name', 'AuthCookie')
        //await usersData.getInfo(username);
        const sessionId = uuid.v4();
        res.cookie("sessionId", sessionId)
        await usersData.addSessionId(sessionId, username)
        res.redirect("/private");
    } else {
        let error = ""
        if (!goodUsername) {
            error = "User does not exist"
        } else {
            error = "Password is invalid"
        }
        res.render("pages/index", {
            title: "Login",
            error: error
        });
    }
});

router.get("/", async function (req, res) {
    if (req.cookies.name === 'AuthCookie' && await usersData.validateSessionId(req.cookies.sessionId)) {
        res.redirect("/private")
    } else {
        res.render("pages/index", {
            title: "Login"
        });
    }
});

router.get("/private", async function (req, res) {
    // const sessionId = req.cookies.sessionId;
    // const user = await usersData.getUserInfoById(sessionId);
    res.render("pages/private", {
        title: "Welcome " //+ user.firstName,
        //user: user
    })
});

router.get("/logout", async function (req, res) {
    const sessionId = req.cookies.sessionId;
    await usersData.removeSessionId(sessionId);
    res.clearCookie('name')
    res.clearCookie('sessionId')
    res.render("pages/logout", {
        title: "You are now logged out!"
    })
});

module.exports = router;