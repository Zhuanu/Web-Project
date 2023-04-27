const getter = require("../../getter.js")
const friends = require('../friends.js');

const getFollowing = async (req, res) => {
    try {
        if (req.userid === undefined) {
            return res.status(400).json({status : 400, message: "Error : Missing Fields"});
        }

        const user = await getter.getUserById(req.userid);
        if (!user) {
            return res.status(401).json({status : 401, message: "Error : Unknown User"});
        }
        
        const list = user.profil.following;

        const result = []
        for (const id of list) {
            const friend = await getter.getUserById(id);
            result.push({id: id, pseudo: friend.profil.pseudo})
        }

        res.status(200).json({status : 200, message: "OK : Follower list", following: result});

    } catch(err) {
        console.error(err);
        res.status(500).json({status : 500, message: "Error : Internal Server Error"});
        // next();
    }
}

module.exports = getFollowing