const fs = require('fs');
const multer = require('multer');
const path = require('path');
const { getUserById } = require('../../getter.js');
const utils = require('../users.js');


// enregistrer dans le répertoire public/uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const dir = '../client/public/uploads/';
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
        cb(null, dir)
    },
    filename: function (req, file, cb) {
        cb(null, req.userid + path.extname(file.originalname))
    }
});

const upload = multer({ storage: storage });

const updatePicture = async (req, res) => {
    const user = getUserById(req.userid);
    if (!user) {
        res.status(400).json({ status: 400, message: "Error: Unknown User" });
    }
    await utils.updatePicture(req.userid, req.body);

    const result = user;
    res.status(200).json({ status: 200, message: "Picture updated", user: result });
};



module.exports = { upload, updatePicture };