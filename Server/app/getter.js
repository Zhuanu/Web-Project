const { MongoClient, ObjectId } = require('mongodb');
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);


const database = client.db("ProjetWeb");
const users = database.collection("Users");


async function getUserById(userid) {
    try {
        const objectID = new ObjectId(userid);
        return await users.findOne({_id:objectID});;

    } catch(err) {
        console.error(err);
    }
}

async function getUserByLogin(login) {
    try { 
        return await users.findOne({"connexion.login":login});

    } catch(err) {
        console.error(err);
    }
}

async function getObjectID(userid) {
    try {
        return new ObjectId(userid);

    } catch(err) {
        console.error(err);
    }
}

module.exports = {
    getUserById,
    getObjectID,
    getUserByLogin,
}

