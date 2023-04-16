const utils = require('../users');
const getter = require('../../getter');

const login = async (req, res) => {
    try {
        const {login, password} = req.body;
        if (password === undefined || login === undefined) {
            res.status(400).json({status : 400, message: "Error : Missing Fields"});
            return;
        }
        if (!(connexion = await getter.getConnexionByLogin(login))) {
            res.status(401).json({status : 401, message: "Error : Unknown User"});
            return;
        }
        if (!await utils.authentification(req.body)) {
            res.status(401).json({status : 401, message: "Error : Invalid Login or Password"});
            return;
        }
        if (connexion.connected) {
            res.status(401).json({status : 401, message: "Error : User already connected"});
            return;
        }
        
        await utils.updateConnected(connexion._id);
        res.status(200).json({status : 200, message: "OK : User logged in", connexion:connexion});

    } catch (err) {
        console.error(err);
        res.status(500).json({status : 500, message: "Error : Internal Server Error"});
    }
}

module.exports = {login}