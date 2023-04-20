const utils = require('../users');

const createUser = async (req, res) => {
    try {
        const {login, password, email, dateNaissance} = req.body;

        if (email === undefined, dateNaissance === undefined || password === undefined || login === undefined) {
            return res.status(400).json({status : 400, message: "Error : Missing Fields"});
        }

        if (await utils.isUserExist(req.body.email)) {
            return res.status(403).json({status : 403, message: "Error : User already exist"});
        }

        await utils.createUser(req.body);
        return res.status(201).json({status : 201, message: "OK : User created", user: req.body});

    } catch (err) {
        console.error(err);
        res.status(500).json({status : 500, message: "Error : Internal Server Error"});
    }
}

module.exports = {createUser}