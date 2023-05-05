const utils = require('../users');

const sessionExpired = async (req, res) => {
    await utils.updateConnected(req.cookies.id);

    // supprime le cookie accessToken au moment de la deconnexion
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    res.clearCookie('id');

    res.status(200).json({status : 200, message: "OK : User logged out after session expired"});
};

module.exports = sessionExpired;