const express = require("express");

const createTweet = require("./services/createTweet.js");
const deleteTweet = require("./services/deleteTweet.js");
const getAllTweets = require("./services/getAllTweets.js");
const modifyTweet = require("./services/modifyTweet.js");
const getAllTweetsFromUser = require("./services/getAllTweetsFromUser.js");

const likeTweet = require("./services/likeTweet.js");
const unlikeTweet = require("./services/unlikeTweet.js");
const getUsersWhoLikedTweet = require("./services/getUsersWhoLikedTweet.js");


const createComment = require("./services/createComment.js");
const deleteComment = require("./services/deleteComment.js");
const modifyComment = require("./services/modifyComment.js");
const getCommentsFromTweet = require("./services/getCommentsFromTweet.js");

const getAllTweetsFromUserAndFirstComment = require("./services/getAllTweetsFromUserAndFirstComment.js");

const { verifyToken } = require('../user/auth.js');
const getCommentsFromUserAndTweet = require("./services/getCommentsFromUserAndTweet.js");

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

    .post("/comment", verifyToken, createComment)

    .delete("/comment", verifyToken, deleteComment)

    .put("/comment", verifyToken, modifyComment)

    .get("/comment/:tweetid", verifyToken, getCommentsFromTweet)

    .get("/get/:userid/tweet", verifyToken, getAllTweetsFromUserAndFirstComment)

    .get("/get/:userid/comment", verifyToken, getCommentsFromUserAndTweet)

    .use((req, res) => {
        res.status(404).json({status : 404, "message": "Page not found"});
    })





module.exports = messages;