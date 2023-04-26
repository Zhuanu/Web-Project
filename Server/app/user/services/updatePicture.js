const { getUserById } = require('../../getter');
const utils = require('../users');
const fs = require('fs');

const updatePicture = async (req, res) => {
    try {
        
        const deleteFile = async (fileName) => {
            fs.unlink(`public/${fileName}`, (err) => {
                if (err) return console.log(err);
                console.log(`File ${fileName} deleted`);
            })
        }

        // const { filePath, fileName, file } = req.body;
        // if (filePath === undefined || fileName === undefined || file === undefined) {
        //     return res.status(400).json({status : 400, message: "Error : Missing Fields"});
        // }

        const picture = req.body.picture

        const userid = req.userid
        const user = await getUserById(userid);

        const oldPicture = user.profil.picture

        const pictureUrl = `/uploads/${picture.path}`;

        // await fs.writeFile(`public${pictureUrl}`, picture.buffer, (err) => {
        //     if (err) {
        //         console.error(err);
        //         return res.status(500).json({status : 500, message: "Error : Error in writing file"});
        //     }
        //     console.log(`File ${fileName} successfully written\n`);
        //     // deleteFile(oldPicture, (err) => {
        //     //     if (err) {
        //     //         console.error(err);
        //     //         return res.status(500).json({status : 500, message: "Error : Error in deleting file"});
        //     //     }
        //     // });
        // });

        await fs.writeFile("../client/a.txt", "Hello World", (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({status : 500, message: "Error : Error in writing file"});
            }
            console.log(`File a.txt successfully written\n`);
        });


        const result = await utils.updatePicture(userid, picture);
        // result à effacer
        res.status(200).json({status : 200, message: "OK : Picture updated", result: result, oldPicture: oldPicture});

    } catch (err) {
        res.status(500).json({status : 500, message: "Error : Internal Server Error"});
    }
}

module.exports = updatePicture