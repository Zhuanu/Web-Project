const utils = require('../messages');
const { getUserById } = require('../../getter');

const modifyComment = async (req, res) => {
    try {
        const userid = req.userid;
        const user = await getUserById(userid);

        if (!user) {
            return res.status(401).json({status : 401, message: "Error : Unknown User"});
        }

        const { commentid, text } = req.body;

        const modifiedComment = await utils.modifyComment(commentid, text);

        res.status(200).json({status : 200, message: "OK : Comment successfully modified", modifiedComment: modifiedComment})

    } catch (err) {
        console.error(err);
        res.status(500).json({status : 500, message: "Error : Internal Server Error in modifyComment"});
    }
};

module.exports = modifyComment;