const friends = require('../friends.js');
const { getUserById } = require("../../getter.js");

const deleteFollower = async (req, res, next) => {
    try {
        if (req.userid === undefined || req.params.friendid === undefined) {
            return res.status(400).json({status : 400, message: "Error : Missing Fields"});
        }
        const user = await getUserById(req.userid);
        const friend = await getUserById(req.params.friendid);
        if (!user) {
            return res.status(401).json({status : 401, message: "Error : Unknown User"});
        }
    
        if (!friend) {
            res.status(401).json({status : 401, message: "Error : Unknown Profil"});
            return;
        }

        const friendIndex = user.profil.followers.findIndex(follower => follower.toString() == friend._id.toString());
        const myIndex = friend.profil.following.findIndex(f => f.toString() == user._id.toString());
        if (myIndex == -1 || friendIndex == -1) {
            res.status(400).json({status : 400, message: "Error : This user does not follow you"});
            return;
        }

        friends.remove(user, friendIndex, friend, myIndex);
        const followers = user.profil.followers;
        const result = []
        for (const id of followers) {
            result.push(await getUserById(id.toString()));
        }
        res.status(200).json({status : 200, message: "OK : Follower removed", followers: result});

    } catch(err) {
        console.error(err);
        res.status(500).json({status : 500, message: "Error : Internal Server Error"});
        // next();

    }
}

module.exports = deleteFollower