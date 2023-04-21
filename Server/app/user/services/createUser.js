const utils = require('../users');

module.exports = createUser = async (req, res) => {
    try {
        const {login, password, email, dateNaissance} = req.body;
        
        if (email === "", dateNaissance === "" || password === "" || login === "") {
            return res.status(400).json({status : 400, message: "Error : Missing Fields", error: "header"});
        }

        if (await utils.isUserExist(req.body.email)) {
            return res.status(403).json({status : 403, message: "Error : Email already used", error: "email"});
        }

        if (await utils.isLoginExist(req.body.login)) {
            return res.status(403).json({status : 403, message: "Error : Login already used", error: "login"});
        }

        await utils.createUser(req.body);
        return res.status(201).json({status : 201, message: "User successfully created, Welcome, You can now Log In", user: req.body});

    } catch (err) {
        console.error(err);
        res.status(500).json({status : 500, message: "Error : Internal Server Error"});
    }
}
