const { getUserById } = require('../../getter');
const utils = require('../users');
const fs = require('fs');
const multer = require('multer');
const path = require('path');


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
    try {
        const userid = req.userid
        const picture = req.file.filename;



        const result = await utils.updatePicture(userid, picture);
        // result à effacer
        res.status(200).json({status : 200, message: "OK : Picture updated"});

    } catch (err) {
        res.status(500).json({status : 500, message: "Error : Internal Server Error"});
    }
}

module.exports = { updatePicture, upload };