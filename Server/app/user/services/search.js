const getter = require('../../getter');

const search = async (req, res) => {
    let userid = req.userid
    try {

        if (userid === undefined) {
            return res.status(400).json({status : 400, message: "Error : Missing Fields"});
        }
        
        if (!(await getter.getUserById(userid))) {
            return res.status(401).json({status : 401, message: "Error : Unknown User"});
        }

        const search = req.query.pseudo;
        if (search == "") {
            return res.status(200).json({status : 200, message: "Aucun utilisateur trouvé", users: []});
        }

        const regex = new RegExp(search, 'i');
        const users = await getter.getUsersByPseudo(regex);

        return res.status(200).json({status : 200, message: "Utilisateurs trouvés par la recherche", users: users});

    } catch(err) {
        console.error(err);
        res.status(500).json({status : 500, message: "Error : Internal Server Error"});
    }
};

module.exports = search;