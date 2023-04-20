const express = require("express");

const createUser = require("./services/createUser.js");
const { login, refresh } = require("./services/login.js");
const logout = require("./services/logout.js");
const getUser = require("./services/getUser.js");
const deleteUser = require("./services/deleteUser.js");
const getUserInfo = require("./services/getUserInfo.js");

const auth = require('./auth.js');

const user = express.Router();

// user.route("/user")

user.use(express.json())

user
    .post('/', createUser)

    .post('/login', login)
    
    .post('/welcome', auth, async (req, res) => {
        console.log("APR7S LE LOGIN");
        res.status(200).json({status : 200, message: "OK : User logged in welcome", connexion: req.connexion.id});
    })

    .post('/refresh', refresh)

    .get('/infos', getUserInfo)

    .delete('/:userid/logout', logout)

    .get('/:userid', getUser)

    .delete('/:userid', deleteUser)

    .use((req, res) => {
        res.status(404).json({status : 404, "message": "Page not found"});
    })

module.exports = user;