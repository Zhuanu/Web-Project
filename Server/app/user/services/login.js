const jwt = require('jsonwebtoken');

const utils = require('../users');
const getter = require('../../getter');
const  { refresh, verifyToken, generateAccessToken, maxAge } = require('../auth');

const login = async (req, res, next) => {
    try {
        const {login, password} = req.body;
        if (password === "" || login === "") {
            return res.status(400).json({status : 400, message: "Error : Missing Fields", error: "header"});
        }
        
        if (!(user = await getter.getUserByLogin(login))) {
            return res.status(401).json({status : 401, message: "Error : Incorrect Login", error: "login"});
        }

        if (!await utils.authentification(req.body)) {
            return res.status(401).json({status : 401, message: "Error : Incorrect Password", error: "mdp"});
        }

        if (user.connexion.connected) {
            return res.status(401).json({status : 401, message: "Error : User already connected", error: "header"});
        }
        
        const accessToken = generateAccessToken(user._id.toString());
        const refreshToken = jwt.sign(user._id.toString(), process.env.REFRESH_SECRET);
        await utils.addRefreshToken(refreshToken, user._id);

        res.cookie('accessToken', accessToken, {httpOnly: true, maxAge: maxAge * 1000});
        await utils.updateConnected(user._id);
        res.status(200).json({status : 200, message: "OK : User logged in", accessToken:accessToken, refreshToken:refreshToken});
        // next();

    } catch (err) {
        console.error(err);
        res.status(500).json({status : 500, message: "Error : Internal Server Error", error: "header"});
    }
}


module.exports = login