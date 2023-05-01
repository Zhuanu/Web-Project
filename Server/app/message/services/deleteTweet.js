const utils = require("../messages.js");
const  { getUserById } = require("../../getter.js");

const deleteTweet = async (req, res) => {
    try {
        const user = await getUserById(req.userid);

        if (!user) {
            return res.status(401).json({status : 401, message: "Error : Unknown User"});
        }

        const { tweetId } = req.body;
        await utils.deleteTweet(tweetId);
        const allTweets = await utils.getAllTweets();

        res.status(200).json({status : 200, message: "OK : Tweet successfully deleted", allTweets: allTweets})

    } catch (err) {
        console.error(err);
        res.status(500).json({status : 500, message: "Error : Internal Server Error in deleteTweet"});
    }
}

module.exports = deleteTweet;