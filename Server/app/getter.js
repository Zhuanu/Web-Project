const { MongoClient, ObjectId } = require('mongodb');
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);


const database = client.db("ProjetWeb");
const users = database.collection("Users");
const connexion = database.collection("Connexion");
const profil = database.collection("Profil");


async function getUserById(userid) {
    const objectID = new ObjectId(userid);
    try {
        return await users.findOne({_id:objectID});;

    } catch(err) {
        console.error(err);
    }
}

async function getConnexionByLogin(login) {
    try { 
        return await connexion.findOne({login:login});

    } catch(err) {
        console.error(err);
    }
}

async function getProfilById(userid) {
    try {
        const objectID = new ObjectId(userid);
        return await profil.findOne({ _id: objectID });

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
    getConnexionByLogin,
    getProfilById
}

