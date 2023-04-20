const utils = require('../users');

const getUserInfo = async (req, res) => {
        try {
            const count = await utils.nbUsers();
            return res.status(200).json({status : 200, message: count + " users registered"});

        } catch (err) {
            console.error(err);
            res.status(500).json({status : 500, message: "Error : Internal Server Error"});
        }    
}

module.exports = {getUserInfo}