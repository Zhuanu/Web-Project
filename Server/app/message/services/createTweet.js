const { getUserById } = require("../../getter.js");

const createTweet = async (req, res, next) => {
    try {
        const user = await getUserById(req.userid);

        if (!user) {
            return res.status(401).json({status : 401, message: "Error : Unknown User"});
        }
        
    } catch (err) {
        console.error(err);
        res.status(500).json({status : 500, message: "Error : Internal Server Error in createTweet"});
    }


};

module.exports = createTweet;