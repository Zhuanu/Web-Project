const jwt = require("jsonwebtoken");
const { userFromRefreshToken } = require('./users');

const config = process.env;

const maxAge = 1 * 1 * 1 * 10;

const generateAccessToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: maxAge
    });
}

const refresh = async (req, res) => {
    const refreshToken = req.body.refreshToken;
    if (refreshToken == null) 
        return res.status(400).json({status : 400, message: "No Refresh Token provided"});

    if (!await userFromRefreshToken(refreshToken)) 
        return res.status(403).json({status : 403, message: "Invalid Refresh Token"});

    jwt.verify(refreshToken, process.env.REFRESH_SECRET, (err, user) => {
        if (err) return res.status(403).json({status : 403, message: "Invalid Refresh Token"});
        const accessToken = generateAccessToken(user);
        res.json({status:"200", message:"Token found", accessToken: accessToken});
    });
}


const verifyToken = (req, res, next) => {
    console.log("cookies : " + req.cookies.accessToken);
    const accessToken = req.cookies.accessToken;

    if (!accessToken) {
        
        return res.status(403).send("A token is required for authentication");
    }

    try {
        jwt.verify(accessToken, config.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).send("Invalid Token");
            }
            console.log(decoded.id);
            req.user = decoded.id; 
            next();
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({status : 500, message: "Error : Internal Server Error", error: "header"});
    }
};

module.exports = {verifyToken, refresh, generateAccessToken, maxAge};