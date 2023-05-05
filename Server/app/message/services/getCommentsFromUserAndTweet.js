const utils = require("../messages.js");
const { getUserById } = require("../../getter.js");

const getCommentsFromUserAndTweet = async (req, res) => {
    try {
        const userid = req.params.userid;
        const user = await getUserById(userid);

        if (!user) {
            return res.status(401).json({status : 401, message: "Error : Unknown User"});
        };

        const commentsFromUser = await utils.getCommentsFromUser(userid);
        if (!commentsFromUser) {
            return res.status(400).json({status : 400, message: "Error : Comment not found"});
        };

        const uniqueTweetIds = [...new Set(commentsFromUser.map(comment => comment.tweetid.toString()))];

        const tweets = uniqueTweetIds.map(async tweetId => {
            const tweet = await utils.getTweetById(tweetId);
            const comments = []
            commentsFromUser.map(comment => {
                if (comment.tweetid.toString() === tweetId) {
                    comments.push(comment);
                }
            })
            return {...tweet, comments: comments};
        })

        const udpateAllComments = async () => {
            const updatedComments = await Promise.all(tweets);
            return updatedComments;
        }

        const result = await udpateAllComments();

        res.status(200).json({status : 200, message: "OK : List Of All Comments From User", commentsFromUser: result});

    } catch (err) {
        console.error(err);
        res.status(500).json({status : 500, message: "Error : Internal Server Error in getAllTweetsFromUser"});
    }
};

module.exports = getCommentsFromUserAndTweet;