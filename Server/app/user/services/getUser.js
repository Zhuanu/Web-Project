const getter = require('../../getter');

module.exports = getUser = async (req, res, next) => {
    const userid = req.params.userid;
    try {
        if (userid === undefined) {
            return res.status(400).json({status : 400, message: "Error : Missing Fields"});
        }
        if (!(user = await getter.getUserById(userid))) {
            return res.status(401).json({status : 401, message: "Error : Unknown User"});
        }
        
        return res.status(200).json(user);

    } catch(err) {
        console.error(err);
        res.status(500).json({status : 500, message: "Error : Internal Server Error"});
    }
}