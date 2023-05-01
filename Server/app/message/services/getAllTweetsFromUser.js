const utils = require("../messages.js");
const { getUserById } = require("../../getter.js");

const getAllTweetsFromUser = async (req, res) => {
    try {
        const userid = req.params.userid;
        const user = await getUserById(userid);

        if (!user) {
            return res.status(401).json({status : 401, message: "Error : Unknown User"});
        };

        const result = await utils.getAllTweetsFromUser(userid);

        if (!result) {
            return res.status(400).json({status : 400, message: "Error : Tweet not found"});
        }

        res.status(200).json({status : 200, message: "OK : List Of All Tweets From User", tweetOfUser: result});

    } catch (err) {
        console.error(err);
        res.status(500).json({status : 500, message: "Error : Internal Server Error in getAllTweetsFromUser"});
    }
};

module.exports = getAllTweetsFromUser;