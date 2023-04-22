const jwt = require("jsonwebtoken");

const config = process.env;

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

module.exports = verifyToken;