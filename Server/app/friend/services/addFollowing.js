const friends = require('../friends.js');
const getter = require("../../getter.js")


const addFollowing = async (req, res, next) => {
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

        if (myProfil._id.toString() == friendProfil._id.toString()) {
            res.status(400).json({status : 400, message: "Error : You can't follow yourself"});
            return;
        }

        const friendid = await getter.getObjectID(req.params.friendid);
        const result = myProfil.following.find(f => f.toString() == friendid.toString());
        const result2 = friendProfil.followers.find(follower => follower.toString() == user.profil.toString());
        
        
        if (result !== undefined || result2 !== undefined) {
            res.status(400).json({status : 400, message: "Error : You already follow this user"});
            return;
        }

        friends.following(myProfil, friendProfil, user.profil, friendid);

        res.status(200).json({status : 200, message: "OK : You are now following this user"});

    } catch(err) {
        console.error(err);
        res.status(500).json({status : 500, message: "Error : Internal Server Error"});
        // next();
    }
}

module.exports = {addFollowing}