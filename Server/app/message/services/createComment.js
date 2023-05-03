const utils = require('../messages');
const { getUserById } = require('../../getter');

const createComment = async (req, res) => {
    try {
        const userid = req.userid;
        const user = await getUserById(userid);

        if (!user) {
            return res.status(401).json({status : 401, message: "Error : Unknown User"});
        }
        const { text, tweetid } = req.body;

        await utils.createComment(tweetid, text, userid);
        const commentsFromTweet = await utils.getCommentsFromTweet(tweetid);

        res.status(200).json({status : 200, message: "OK : Comment successfully created", commentsFromTweet: commentsFromTweet})

    } catch (err) {
        console.error(err);
        res.status(500).json({status : 500, message: "Error : Internal Server Error in createComment"});
    }
};

module.exports = createComment;