const utils = require('../users');

const deleteUser = async (req, res) => {
    const userid = req.params.userid;
    try {
        if (userid === undefined) {
            res.status(400).json({status : 400, message: "Error : Missing Fields"});
            return;
        }

        const success = utils.deleteUser(userid);
        if (success) {
            res.status(200).json({status : 200, message: "OK : User deleted"});
            return;
        } 

        res.status(401).json({status : 401, message: "Error : Unknown User"});

    } catch(err) {
        console.error(err);
        res.status(500).json({status : 500, message: "Error : Internal Server Error"});
    }
}

module.exports = {deleteUser}