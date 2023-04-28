const express = require("express");

const deleteFollower = require("./services/deleteFollower.js");
const addFollowing = require("./services/addFollowing.js");
const deleteFollowing = require("./services/deleteFollowing.js");
const getFollowers = require("./services/getFollowers.js");
const getFollowing = require("./services/getFollowing.js");
const getProfil = require("./services/getProfil.js");

const friendFollowers = require("./services/friendFollowers.js");
const friendFollowing = require("./services/friendFollowing.js");

const { verifyToken } = require('../user/auth.js');

const friend = express.Router();

// friend.route("/user/:userid")

friend.use(express.json())

friend

    .get("/followers", verifyToken, getFollowers)

    .get("/followers/:friendid", verifyToken, friendFollowers)

    .delete("/followers/:friendid", verifyToken, deleteFollower)

    .get("/following", verifyToken, getFollowing)

    .get("/following/:friendid", verifyToken, friendFollowing)

    .post("/following/:friendid", verifyToken, addFollowing)

    .delete("/following/:friendid", verifyToken, deleteFollowing)

    .get("/profil/:userid", verifyToken, getProfil)

    .use((req, res) => {
        res.status(404).json({status : 404, "message": "Page not foundo"});
    })



module.exports = friend;