const utils = require("../messages.js");
const { getUserById } = require("../../getter.js");

const modifyTweet = async (req, res) => {
    try {
        const user = await getUserById(req.userid);

        if (!user) {
            return res.status(401).json({status : 401, message: "Error : Unknown User"});
        };

        const { tweetId, content } = req.body;
        const result = await utils.modifyTweet(tweetId, content);

        if (!result) {
            return res.status(400).json({status : 400, message: "Error : Tweet not found"});
        }

        const newTweet = await utils.getTweetById(tweetId);

        res.status(200).json({status : 200, message: "OK : Tweet successfully modified", newTweet: newTweet});
        
    } catch (err) {
        console.error(err);
        res.status(500).json({status : 500, message: "Error : Internal Server Error in modifyTweet"});
    }
};

module.exports = modifyTweet;