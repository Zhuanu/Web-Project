const express = require("express");

const createUser = require("./services/createUser.js");
const login = require("./services/login.js");
const logout = require("./services/logout.js");
const getUser = require("./services/getUser.js");
const deleteUser = require("./services/deleteUser.js");
const getUserInfo = require("./services/getUserInfo.js");
const upload = require("./services/updatePicture.js");
const editProfil = require("./services/editProfil.js");

const { verifyToken } = require('./auth.js');

const user = express.Router();

user.use(express.json())

user
    .post('/', createUser)

    .post('/login', login)
    
    .post('/updatePicture', verifyToken, upload.single('picture'), (req, res) => {
        res.send('File uploaded!' + req.userid)
    })

    .post('/editProfil', verifyToken, editProfil)

    .get('/infos', verifyToken, getUserInfo)

    .get('/logout', verifyToken, logout)

    .get('/get', verifyToken, getUser)

    .get('/sessionExpired', logout)

    .delete('/:userid', deleteUser)

    .use((req, res) => {
        res.status(404).json({status : 404, "message": "Page not found"});
    })

module.exports = user;