const friends = require('../friends.js');
const getter = require("../../getter.js");

const deleteFollowing = async (req, res, next) => {
    try {
        if (req.params.userid === undefined || req.params.friendid === undefined) {
            res.status(400).json({status : 400, message: "Error : Missing Fields"});
            return;
        }

        const user = await getter.getUserById(req.params.userid);
        const myProfil = await getter.getProfilById(user.profil.toString());
        const friendProfil = await getter.getProfilById(req.params.friendid);

        if (!myProfil || !friendProfil) {
            res.status(401).json({status : 401, message: "Error : Unknown User"});
            return;
        }

        // remove friend from my array Followers and remove me from his array Following
        const friendid = await getter.getObjectID(req.params.friendid);
        const friendIndex = myProfil.following.findIndex(f => f.toString() == friendid.toString());
        const myIndex = friendProfil.followers.findIndex(follower => follower.toString() == user.profil.toString());

        if (myIndex == -1 || friendIndex == -1) {
            res.status(400).json({status : 400, message: "Error : This user does not follow you"});
            return;
        }

        friends.remove(friendProfil, myIndex, myProfil, friendIndex);
        res.status(200).json({status : 200, message: "OK : Follower removed"});

    } catch(err) {
        console.error(err);
        res.status(500).json({status : 500, message: "Error : Internal Server Error"});
        // next();

    }

}

module.exports = {deleteFollowing}