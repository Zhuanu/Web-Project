const utils = require('../users');

module.exports = deleteUser = async (req, res) => {
    const userid = req.params.userid;
    try {
        if (userid === undefined) {
            return res.status(400).json({status : 400, message: "Error : Missing Fields"});
        }

        const success = utils.deleteUser(userid);
        if (success) {
            return res.status(200).json({status : 200, message: "OK : User deleted"});
        } 

        return res.status(401).json({status : 401, message: "Error : Unknown User"});

    } catch(err) {
        console.error(err);
        res.status(500).json({status : 500, message: "Error : Internal Server Error"});
    }
}