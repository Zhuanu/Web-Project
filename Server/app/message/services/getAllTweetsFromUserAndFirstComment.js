const utils = require("../messages.js");
const { getUserById } = require("../../getter.js");

const getAllTweetsFromUserAndFirstComment = async (req, res) => {
    try {
        const userid = req.params.userid;
        const user = await getUserById(userid);

        if (!user) {
            return res.status(401).json({status : 401, message: "Error : Unknown User"});
        };

        const tweetOfUser = await utils.getAllTweetsFromUser(userid);
        if (!tweetOfUser) {
            return res.status(400).json({status : 400, message: "Error : Tweet not found"});
        }

        const updateTweetWithComment = async (tweet) => {
            const comment = await utils.getCommentsFromTweet(tweet._id);
            return {...tweet, comments: comment};
        }
          
        const updateAllTweetsWithComment = async () => {
            const updatedTweets = await Promise.all(tweetOfUser.map(updateTweetWithComment));
            return updatedTweets;
        }
          
        const result = await updateAllTweetsWithComment();
        res.status(200).json({status : 200, message: "OK : List Of All Tweets From User", tweetOfUser: result});

    } catch (err) {
        console.error(err);
        res.status(500).json({status : 500, message: "Error : Internal Server Error in getAllTweetsFromUser"});
    }
};

module.exports = getAllTweetsFromUserAndFirstComment;