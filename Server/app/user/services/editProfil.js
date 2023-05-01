const { getUserById } = require("../../getter");
const { updateBio, updateEmail, updatePassword, updateUsername } = require("../users");

const editProfil = async (req, res) => {
    const { username, email, password , bio} = req.body;
    const userid = req.userid;

    try {
        const user = await getUserById(userid);
        if (!user) {
            return res.status(401).json({ status: 401, message: "Error : Unknown User" });
        }

        if (username) {
            await updateUsername(userid, username);
        }

        if (email) {
            await updateEmail(userid, email);
        }

        if (bio) {
            await updateBio(userid, bio);
        }

        if (password) {
            await updatePassword(userid, password);
        }

        const result = await getUserById(userid);
        return res.status(200).json({ status: 200, message: "User updated", user: result});

    } catch (err) {
        console.error(err);
        res.status(500).json({ status: 500, message: "Error : Internal Server Error" });
    }
};

module.exports = editProfil;