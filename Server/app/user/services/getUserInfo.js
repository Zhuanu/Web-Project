const { nbUsers, getUsers } = require('../users');
const { getUserById } = require('../../getter');

const getUserInfo = async (req, res) => {
        try {
            const user = await getUserById(req.userid);
            const count = await nbUsers();
            const users = await getUsers();

            const f = user.profil.following;
            const following = JSON.stringify(f)


            const newUsers = []
            for (const usr of users) {
                if (!following.includes(usr._id.toString()) && usr._id.toString() !== req.userid) {
                    newUsers.push(usr)
                }
            }

            return res.status(200).json({status : 200, message: count + " users registered", users: newUsers});

        } catch (err) {
            console.error(err);
            res.status(500).json({status : 500, message: "Error : Internal Server Error"});
        }    
}

module.exports = getUserInfo;