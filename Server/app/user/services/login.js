const jwt = require('jsonwebtoken');

const utils = require('../users');
const getter = require('../../getter');
const  { generateAccessToken, maxAge } = require('../auth');

const login = async (req, res) => {
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
        
        const day = 24 * 60 * 60;
        const id = user._id;

        const accessToken = generateAccessToken(user);
        const refreshToken = jwt.sign({user}, process.env.REFRESH_SECRET, {expiresIn: 7 * day});
        await utils.addRefreshToken(refreshToken, id);

        res.cookie('accessToken', accessToken, {httpOnly: true, maxAge: maxAge * 1000});
        res.cookie('refreshToken', refreshToken, {httpOnly: true, maxAge: 7 * day * 1000});
        res.cookie('id', id.toString(), {httpOnly: true})
        await utils.updateConnected(user._id);
        res.status(200).json({status : 200, message: "OK : User logged in", user: user});

    } catch (err) {
        console.error(err);
        res.status(500).json({status : 500, message: "Error : Internal Server Error", error: "header"});
    }
}


module.exports = login