const utils = require('../users');

const sessionExpired = async (req, res) => {
    console.log("req.cookies.id", req.cookies.id)
    await utils.updateConnected(req.cookies.id);

    // supprime le cookie accessToken au moment de la deconnexion
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    res.clearCookie('id');

    res.status(200).json({status : 200, message: "OK : User logged out"});
};

module.exports = sessionExpired;