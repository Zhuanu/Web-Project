const utils = require("../messages.js");
const { getUserById } = require("../../getter.js");

const unlikeTweet = async (req, res) => {
    try {
        const userid = req.userid;
        const user = await getUserById(userid);

        if (!user) {
            return res.status(401).json({status : 401, message: "Error : Unknown User"});
        }

        const { tweetId } = req.body;
        await utils.unlikeTweet(tweetId, userid);

        const listUsers = await utils.getLikesFromTweet(tweetId);

        res.status(200).json({status : 200, message: "OK : Tweet Unliked", listUsers: listUsers, state: false})

    } catch (err) {
        console.error(err);
        res.status(500).json({status : 500, message: "Error : Internal Server Error in unlikeTweet"});
    }
};

module.exports = unlikeTweet;