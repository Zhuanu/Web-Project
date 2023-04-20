const friends = require('../friends.js');
const getter = require("../../getter.js");

const addFollowing = async (req, res, next) => {
    try {
        if (req.params.userid === undefined || req.params.friendid === undefined) {
            return res.status(400).json({status : 400, message: "Error : Missing Fields"});
        }

        if (req.params.userid == req.params.friendid) {
            return res.status(400).json({status : 400, message: "Error : You can't follow yourself"});
        }
    
        const user = await getter.getUserById(req.params.userid);
        const friend = await getter.getUserById(req.params.friendid);

        if (!user) {
            return res.status(401).json({status : 401, message: "Error : Unknown User"});
        }
    
        if (!friend) {
            res.status(401).json({status : 401, message: "Error : Unknown Profil"});
            return;
        }
    

        const result = user.profil.following.find(f => f.toString() == friend._id.toString());
        const result2 = friend.profil.followers.find(follower => follower.toString() == user._id.toString());


        if (result !== undefined || result2 !== undefined) {
            res.status(400).json({status : 400, message: "Error : You already follow this user"});
            return;
        }
    
        friends.following(user, friend);
    
        res.status(200).json({status : 200, message: "OK : You are now following this user"});
    
    } catch(err) {
        console.error(err);
        res.status(500).json({status : 500, message: "Error : Internal Server Error"});
        // next();
    }
        
}

module.exports = addFollowing;