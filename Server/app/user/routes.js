const express = require("express");

const createUser = require("./services/createUser.js");
const login = require("./services/login.js");
const logout = require("./services/logout.js");
const getUser = require("./services/getUser.js");
const deleteUser = require("./services/deleteUser.js");
const getUserInfo = require("./services/getUserInfo.js");

const { verifyToken } = require('./auth.js');

const user = express.Router();

user.use(express.json())

user
    .post('/', createUser)

    .post('/login', login)
    
    // .post('/welcome', verifyToken, async (req, res) => {
    //     res.status(200).json({status : 200, message: "OK : User logged in welcome", user: req.user});
    // })

    .get('/infos', getUserInfo)

    .get('/logout', verifyToken, logout)

    .get('/get', verifyToken, getUser)

    .delete('/:userid', deleteUser)

    .use((req, res) => {
        res.status(404).json({status : 404, "message": "Page not found"});
    })

module.exports = user;