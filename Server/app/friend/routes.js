const express = require("express");

const deleteFollower = require("./services/deleteFollower.js");
const addFollowing = require("./services/addFollowing.js");
const deleteFollowing = require("./services/deleteFollowing.js");
const getListFollowers = require("./services/getList.js");
const getListFollowing = require("./services/getList.js");
// const friendFollowers = require("./services/friendList.js");
// const friendFollowing = require("./services/friendList.js");

const friend = express.Router();

// friend.route("/user/:userid")

friend.use(express.json())

friend

    .get("/:userid/followers", getListFollowers)

    // .get("/:userid/followers/:friendid", friendFollowers.friendGetList)

    .delete("/:userid/followers/:friendid", deleteFollower)

    .get("/:userid/following", getListFollowing)

    // .get("/:userid/following/:friendid", friendFollowing.friendGetList)

    .post("/:userid/following/:friendid", addFollowing)

    .delete("/:userid/following/:friendid", deleteFollowing)

    .use((req, res) => {
        res.status(404).json({status : 404, "message": "Page not foundo"});
    })



module.exports = friend;