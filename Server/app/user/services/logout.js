const utils = require('../users');
const getter = require('../../getter');


module.exports = logout = async (req, res) => {
    try {
        const userid = req.params.userid;
        if (userid === undefined) {
            return res.status(400).json({status : 400, message: "Error : Missing Fields"});
        }

        const user = await getter.getUserById(userid);
        if (!user) {
            return res.status(401).json({status : 401, message: "Error : Unknown User"});
        }

        if (!user.connexion.connected) {
            return res.status(401).json({status : 401, message: "Error : User already logged out"});
        }

        // supprime le cookie accessToken au moment de la deconnexion
        res.clearCookie('accessToken');
        await utils.removeRefreshToken(user._id);
        await utils.updateConnected(user._id);
        res.status(200).json({status : 200, message: "OK : User logged out"});

    } catch(err) {
        console.error(err);
        res.status(500).json({status : 500, message: "Error : Internal Server Error"});
    }
}