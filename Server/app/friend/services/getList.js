const getter = require("../../getter.js")
const friends = require('../friends.js');

const getList = async (req, res) => {
    try {
        if (req.params.userid === undefined) {
            return res.status(400).json({status : 400, message: "Error : Missing Fields"});
        }

        const user = await getter.getUserById(req.params.userid);

        if (!user) {
            return res.status(401).json({status : 401, message: "Error : Unknown User"});
        }

        const inURL = await friends.followingOrFollowers(req.path);

        if (inURL === undefined) {
            return res.status(400).json({status : 400, message: "Error : Bad request"});
        }
        
        const list = user.profil[inURL];

        res.status(200).json({status : 200, message: "OK : Follower list", list});

    } catch(err) {
        console.error(err);
        res.status(500).json({status : 500, message: "Error : Internal Server Error"});
        // next();
    }
}

module.exports = getList