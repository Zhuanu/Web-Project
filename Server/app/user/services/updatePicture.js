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



module.exports = upload;