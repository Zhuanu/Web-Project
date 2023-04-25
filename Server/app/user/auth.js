const jwt = require("jsonwebtoken");
// const { userFromRefreshToken } = require('./users');

const config = process.env;

const maxAge = 1 * 1 * 1 * 10;

const generateAccessToken = (user) => {
    return jwt.sign({user}, process.env.JWT_SECRET, {
        expiresIn: maxAge
    });
}

const refresh = (req, res, next) => {
    const refreshToken = req.cookies.refreshToken;
    if (refreshToken == null) {
        // res.clearCookie("accessToken");
        // res.clearCookie("refreshToken");
        return res.redirect("/api/user/sessionExpired");
    }

    jwt.verify(refreshToken, process.env.REFRESH_SECRET, (err, decoded) => {
        if (err) {
            res.clearCookie("accessToken");
            res.clearCookie("refreshToken");
            return res.redirect("/api/user/sessionExpired");
        }
        const accessToken = generateAccessToken(decoded.user);
        next(accessToken)
    });
}


const verifyToken = (req, res, next) => {
    let accessToken = req.cookies.accessToken;
    if (!accessToken) {
        refresh(req, res, (newAccessToken) => {
            console.log("newAccessToken : ", newAccessToken)
            res.cookie("accessToken", newAccessToken, {httpOnly: true, maxAge: maxAge * 1000})
            jwt.verify(newAccessToken, config.JWT_SECRET, (err, decoded) => {
                if (err) {
                    res.status(401).send("Invalid Token");
                }
                req.user = decoded.user; 
                next();
            });
        })

    } else {
        console.log("accessToken dans le else : ", accessToken)
        try {
            return jwt.verify(accessToken, config.JWT_SECRET, (err, decoded) => {
                if (err) {
                    return res.status(401).send("Invalid Token");
                }
                req.user = decoded.user; 
                next();
            });

        } catch (err) {
            console.error(err);
            res.status(500).json({status : 500, message: "Error : Internal Server Error", error: "header"});
        }
    }   
};

module.exports = {verifyToken, refresh, generateAccessToken, maxAge};