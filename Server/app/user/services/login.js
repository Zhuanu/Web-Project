const jwt = require('jsonwebtoken');

const utils = require('../users');
const getter = require('../../getter');

const maxAge = 1 * 1 * 1 * 10;

// const createToken = (id) => {
//     return jwt.sign({id}, process.env.JWT_SECRET, {
//         expiresIn: maxAge
//     });
// }

const generateAccessToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: maxAge
    });
}

const refresh = async (req, res) => {
    const refreshToken = req.body.refreshToken;
    if (refreshToken == null) return res.status(400).json({status : 400, message: "No Refresh Token provided"});
    if (!await utils.getRefreshToken(refreshToken)) return res.status(403).json({status : 403, message: "Invalid Refresh Token"});
    jwt.verify(refreshToken, process.env.REFRESH_SECRET, (err, connexion) => {
        if (err) return res.status(403).json({status : 403, message: "Invalid Refresh Token"});
        const accessToken = generateAccessToken(connexion);
        res.json({status:"200", message:"Token found", accessToken: accessToken});
    });
    return accessToken;
}

const login = async (req, res, next) => {
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
        
        const accessToken = generateAccessToken(connexion._id.toString());
        const refreshToken = jwt.sign(connexion._id.toString(), process.env.REFRESH_SECRET);
        await utils.addRefreshToken(refreshToken, connexion._id);
        // console.log(connexion)
        res.cookie('accessToken', accessToken, {httpOnly: true, maxAge: maxAge});
        await utils.updateConnected(connexion._id);
        // res.status(200).json({status : 200, message: "OK : User logged in", accessToken:accessToken, refreshToken:refreshToken});
        next();

    } catch (err) {
        console.error(err);
        res.status(500).json({status : 500, message: "Error : Internal Server Error"});
    }
}

module.exports = {login, refresh}