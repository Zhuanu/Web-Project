const utils = require("../messages.js");
const { getUserById } = require("../../getter.js");

const getUsersWhoLikedTweet = async (req, res) => {
    try {
        const user = await getUserById(req.userid);

        if (!user) {
            return res.status(401).json({status : 401, message: "Error : Unknown User"});
        }

        const { tweetid } = req.params;
        const listUsers = await utils.getLikesFromTweet(tweetid);

        res.status(200).json({status : 200, message: "OK : List Of Users Who Liked The Tweet", listUsers: listUsers})

    } catch (err) {
        console.error(err);
        res.status(500).json({status : 500, message: "Error : Internal Server Error in getUsersWhoLikedTweet"});
    }
};

module.exports = getUsersWhoLikedTweet;