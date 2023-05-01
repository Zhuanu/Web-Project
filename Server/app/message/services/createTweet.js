const { getUserById } = require("../../getter.js");
const utils = require("../messages.js");

const createTweet = async (req, res, next) => {
    try {
        const userid = req.userid;
        const user = await getUserById(userid);

        if (!user) {
            return res.status(401).json({status : 401, message: "Error : Unknown User"});
        }

        const { content } = req.body;

        await utils.createTweet(content, userid);
        const allTweets = await utils.getAllTweets();

        res.status(200).json({status : 200, message: "OK : Tweet successfully created", allTweets: allTweets})
        
    } catch (err) {
        console.error(err);
        res.status(500).json({status : 500, message: "Error : Internal Server Error in createTweet"});
    }


};

module.exports = createTweet;