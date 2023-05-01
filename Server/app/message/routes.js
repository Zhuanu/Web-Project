const express = require("express");

const createTweet = require("./services/createTweet.js");
const deleteTweet = require("./services/deleteTweet.js");
const getAllTweets = require("./services/getAllTweets.js");
const modifyTweet = require("./services/modifyTweet.js");
const getAllTweetsFromUser = require("./services/getAllTweetsFromUser.js");

const { verifyToken } = require('../user/auth.js');

const messages = express.Router();

messages.use(express.json())

messages
    .post("/", verifyToken, createTweet)

    .delete("/", verifyToken, deleteTweet)

    .get("/", verifyToken, getAllTweets)

    .put("/", verifyToken, modifyTweet)

    .get("/get/:userid", verifyToken, getAllTweetsFromUser)





module.exports = messages;