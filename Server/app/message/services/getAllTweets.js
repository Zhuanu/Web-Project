const utils = require("../messages.js");
const { getUserById } = require("../../getter.js");

const getAllTweets = async (req, res) => {
    try {
        const user = await getUserById(req.userid);

        if (!user) {
            return res.status(401).json({status : 401, message: "Error : Unknown User"});
        }

        const allTweets = await utils.getAllTweets();

        res.status(200).json({status : 200, message: "OK : List Of All Tweets", allTweets: allTweets})

    } catch (err) {
        console.error(err);
        res.status(500).json({status : 500, message: "Error : Internal Server Error in getAllTweets"});
    }
};

module.exports = getAllTweets;