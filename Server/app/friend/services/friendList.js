const getter = require("../../getter.js")
const friends = require('../friends.js');

const friendGetList = async (req, res) => {
    try {
        if (req.params.userid === undefined || req.params.friendid === undefined) {
            res.status(400).json({status : 400, message: "Error : Missing Fields"});
            return;
        }

        const user = await getter.getUserById(req.params.userid);
        if (!user) {
            res.status(401).json({status : 401, message: "Error : Unknown User"});
            return;
        }

        const myProfil = await getter.getProfilById(user.profil.toString());

        const friendProfil = await getter.getProfilById(req.params.friendid);
        if (!friendProfil) {
            res.status(401).json({status : 401, message: "Error : Unknown Profil"});
            return;
        }

        const inURL = await friends.followingOrFollowers(req.path);
        if (inURL === undefined) {
            res.status(400).json({status : 400, message: "Error : Bad request"});
            return;
        }

        const index = myProfil[inURL].findIndex(f => f.toString() == friendProfil._id.toString());
        if (index == -1) {
            res.status(400).json({status : 400, message: "Error : This user does not follow you"});
            return;
        }

        const list = friendProfil[inURL];

        res.status(200).json({status : 200, message: "OK : Follower list", list});

    } catch(err) {
        console.error(err);
        res.status(500).json({status : 500, message: "Error : Internal Server Error"});
        // next();
    }
}

module.exports = {friendGetList}