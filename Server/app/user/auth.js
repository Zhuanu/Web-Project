const jwt = require("jsonwebtoken");

const config = process.env;

const verifyToken = (req, res, next) => {
    console.log("body : " + req.body.accessToken);
    console.log("headers : " + req.headers["x-access-token"]);
    const accessToken = req.body.accessToken || (req.headers["x-access-token"]);

    if (!accessToken) {
        return res.status(403).send("A token is required for authentication");
    }

    try {
        const decoded = jwt.verify(accessToken, config.JWT_SECRET);
        console.log(decoded);
        req.connexion = decoded; 
        next();

    } catch (err) {
        return res.status(401).send("Invalid Token");
    }

    // res.status(200).send("OK : User logged in welcome");
};

module.exports = verifyToken;