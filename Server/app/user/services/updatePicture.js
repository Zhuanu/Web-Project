const utils = require('../users');
// const fs = require('fs');

const updatePicture = async (req, res) => {
    try {
        
        // const deleteFile = async (fileName) => {
        //     fs.unlink(`public/${fileName}`, (err) => {
        //         if (err) return console.log(err);
        //         console.log(`File ${fileName} deleted`);
        //     })
        // }


        const {picture, fileName, file} = req.body;
        if (picture === undefined || fileName === undefined || file === undefined) {
            return res.status(400).json({status : 400, message: "Error : Missing Fields"});
        }

        const user = req.user

        const oldPicture = user.profil.picture
        // await fs.writeFile(picture, file.buffer, (err) => {
        //     if (err) {
        //         console.error(err);
        //         return res.status(500).json({status : 500, message: "Error : Error in writing file"});
        //     }
        //     console.log(`File ${fileName} successfully written\n`);
        //     deleteFile(oldPicture, (err) => {
        //         if (err) {
        //             console.error(err);
        //             return res.status(500).json({status : 500, message: "Error : Error in deleting file"});
        //         }
        //     });
        // });

        const result = await utils.updatePicture(user._id, fileName);
        // result à effacer
        res.status(200).json({status : 200, message: "OK : Picture updated", result: result, oldPicture: oldPicture});

    } catch (err) {
        res.status(500).json({status : 500, message: "Error : Internal Server Error"});
    }
}

module.exports = updatePicture