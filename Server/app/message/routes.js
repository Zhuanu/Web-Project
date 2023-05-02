const express = require("express");

const createTweet = require("./services/createTweet.js");
const deleteTweet = require("./services/deleteTweet.js");
const getAllTweets = require("./services/getAllTweets.js");
const modifyTweet = require("./services/modifyTweet.js");
const getAllTweetsFromUser = require("./services/getAllTweetsFromUser.js");

const likeTweet = require("./services/likeTweet.js");
const unlikeTweet = require("./services/unlikeTweet.js");
const getUsersWhoLikedTweet = require("./services/getUsersWhoLikedTweet.js");

const { verifyToken } = require('../user/auth.js');

const messages = express.Router();

messages.use(express.json())

messages
    .post("/", verifyToken, createTweet)

    .delete("/", verifyToken, deleteTweet)

    .get("/", verifyToken, getAllTweets)

    .put("/", verifyToken, modifyTweet)

    .get("/get/:userid", verifyToken, getAllTweetsFromUser)

    .post("/like", verifyToken, likeTweet)

    .delete("/like", verifyToken, unlikeTweet)

    .get("/like/:tweetid", verifyToken, getUsersWhoLikedTweet)

    .use((req, res) => {
        res.status(404).json({status : 404, "message": "Page not found"});
    })





module.exports = messages;