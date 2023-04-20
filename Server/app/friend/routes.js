const express = require("express");

const deleteFollower = require("./services/deleteFollower.js");
const addFollowing = require("./services/addFollowing.js");
const deleteFollowing = require("./services/deleteFollowing.js");
const Followers = require("./services/getList.js");
const Following = require("./services/getList.js");
const friendFollowers = require("./services/friendList.js");
const friendFollowing = require("./services/friendList.js");

const friend = express.Router();

// friend.route("/user/:userid")

friend.use(express.json())

friend

    .get("/:userid/followers", Followers.getList)

    .get("/:userid/followers/:friendid", friendFollowers.friendGetList)

    .delete("/:userid/followers/:friendid", deleteFollower.deleteFollower)

    .get("/:userid/following", Following.getList)

    .get("/:userid/following/:friendid", friendFollowing.friendGetList)

    .post("/:userid/following/:friendid", addFollowing)

    .delete("/:userid/following/:friendid", deleteFollowing.deleteFollowing)

    .get("/followers", (req, res) => {
        res.status(200).json({status : 200, "message": "rentré dedans"});
    })

    .use((req, res) => {
        res.status(404).json({status : 404, "message": "Page not foundo"});
    })



module.exports = friend;