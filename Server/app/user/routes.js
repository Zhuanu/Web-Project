const express = require("express");

const createUser = require("./services/createUser.js");
const login = require("./services/login.js");
const logout = require("./services/logout.js");
const getUser = require("./services/getUser.js");
const deleteUser = require("./services/deleteUser.js");
const getUserInfo = require("./services/getUserInfo.js");
const {upload, updatePicture } = require("./services/updatePicture.js");
const editProfil = require("./services/editProfil.js");
const sessionExpired = require("./services/sessionExpired.js");

const { verifyToken } = require('./auth.js');

const user = express.Router();

user.use(express.json())

user
    .post('/', createUser)

    .post('/login', login)
    
    .post('/updatePicture', verifyToken, upload.single('picture'), updatePicture)
    // .post('/updatePicture', verifyToken, upload.single('picture'), (req, res) => {res.status(200).json({ status: 200, message: "Picture updated" })})

    .post('/editProfil', verifyToken, editProfil)

    .get('/infos', verifyToken, getUserInfo)

    .get('/logout', verifyToken, logout)

    .get('/get', verifyToken, getUser)

    .get('/sessionExpired', sessionExpired)

    .delete('/:userid', deleteUser)

    .use((req, res) => {
        res.status(404).json({status : 404, "message": "Page not found"});
    })

module.exports = user;