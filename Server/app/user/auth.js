const jwt = require("jsonwebtoken");

const config = process.env;

const verifyToken = (req, res, next) => {
    console.log("cookies : " + req.cookies.accessToken);
    const accessToken = req.cookies.accessToken;

    if (!accessToken) {
        return res.status(403).send("A token is required for authentication");
    }

    try {
        const decoded = jwt.verify(accessToken, config.JWT_SECRET);
        console.log(decoded.id);
        req.user = decoded.id; 
        next();

    } catch (err) {
        return res.status(401).send("Invalid Token");
    }
};

module.exports = verifyToken;