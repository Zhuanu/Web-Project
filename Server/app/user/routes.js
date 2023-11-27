const express = require("express");

const createUser = require("./services/createUser.js");
const login = require("./services/login.js");
const logout = require("./services/logout.js");
const getUser = require("./services/getUser.js");
const deleteUser = require("./services/deleteUser.js");
const getNonFollowing = require("./services/getNonFollowing.js");
const {upload, updatePicture } = require("./services/updatePicture.js");
const editProfil = require("./services/editProfil.js");
const sessionExpired = require("./services/sessionExpired.js");
const getUserFromParams = require("./services/getUserFromParams.js");
const search = require("./services/search.js");

const { verifyToken } = require('./auth.js');

const user = express.Router();

user.use(express.json())

user
    .post('/', createUser)

    .post('/login', login)
    
    .post('/updatePicture', verifyToken, upload.single('picture'), updatePicture)
    
    .post('/editProfil', verifyToken, editProfil)

    .get('/nonFollowing', verifyToken, getNonFollowing)

    .delete('/logout', verifyToken, logout)

    .get('/get', verifyToken, getUser)

    .get('/get/:userid', verifyToken, getUserFromParams)

    .get('/search', verifyToken, search)
    // renvoie tous les utilisateurs matché par ce que l'utilisateur a tapé dans la barre de recherche

    .get('/sessionExpired', sessionExpired)

    .delete('/', verifyToken, deleteUser)

    .use((req, res) => {
        res.status(404).json({status : 404, "message": "Page not found"});
    })

module.exports = user;