const utils = require("../messages.js");
const { getUserById } = require("../../getter.js");

const likeTweet = async (req, res) => {
    try {
        const userid = req.userid;
        const user = await getUserById(userid);

        if (!user) {
            return res.status(401).json({status : 401, message: "Error : Unknown User"});
        }

        const { tweetId } = req.body;
        await utils.likeTweet(tweetId, userid);

        const listUsers = await utils.getLikesFromTweet(tweetId);

        res.status(200).json({status : 200, message: "OK : Tweet Liked", listUsers: listUsers, state: true})

    } catch (err) {
        console.error(err);
        res.status(500).json({status : 500, message: "Error : Internal Server Error in likeTweet"});
    }
};

module.exports = likeTweet;