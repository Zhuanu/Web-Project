const bcrypt = require('bcrypt');
const { getObjectID } = require('../getter');

const { MongoClient, ObjectId } = require('mongodb');
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

const database = client.db("ProjetWeb");
const users = database.collection("Users");

async function createUser(info) {
    try {
        const {login, password, pseudo, email, dateNaissance } = info;
        
        const mdp = await bcrypt.hash(password, 10);

        const docUsers = { 
            email: email, 
            dateNaissance: dateNaissance, 
            profil: {
                pseudo: pseudo, 
                followers: [], 
                following: [], 
                posts: [], 
                picture: "",
                creationDate: new Date().toDateString()
            },
            connexion: {
                password: mdp, 
                login: login, 
                connected: false,
                refreshToken: ""
            },
            privateMess: []
        };

        const result = await users.insertOne(docUsers);

    } catch(err) {
        console.error(err);
    }
}

async function authentification(info) {
    try {
        const {login, password} = info;
        const found = await users.findOne({ "connexion.login": login });
        let foundConnexion = "";
        if (found) {
            foundConnexion = await bcrypt.compare(password, found.connexion.password);
        }
        return foundConnexion;

    } catch(err) {
        console.error(err);
    }
}

async function isUserExist(email){
    try {
        return await users.findOne({ email: email });

    } catch (err) {
        console.error(err);
    }
}

async function isLoginExist(login){
    try {
        return await users.findOne({ "connexion.login": login });

    } catch (err) {
        console.error(err);
    }
}

async function deleteUser(userid) { 
    try {
        const objectID = new ObjectId(userid);
        const result = await users.findOneAndDelete({_id:objectID});
        return result.value != null;

    } catch(err) {
        console.error(err);
    }
}

async function nbUsers() {
    try {
        return await users.countDocuments();

    } catch(err) {
        console.error(err);
    }
}

async function getUsers() {
    try {
        return await users.find().toArray();

    } catch(err) {
        console.error(err);
    }
}

async function updateConnected(userid) {
    try {
        const ObjectID = new ObjectId(userid);
        const user = await users.findOne({ "_id": ObjectID });
        return await users.updateOne(
            { "_id": ObjectID },
            { $set: { "connexion.connected": !user.connexion.connected } })

    } catch(err) {
        console.error(err);
    }
}

async function updatePicture(userid, picture) {
    const objectID = new ObjectId(userid);
    return await users.findOneAndUpdate({ "_id": objectID }, { $set: { "profil.picture": picture } });
}

async function updateBio(userid, bio) {
    const objectID = new ObjectId(userid);
    return await users.findOneAndUpdate({ "_id": objectID }, { $set: { "profil.bio": bio } });
}

async function updateUsername(userid, username) {
    const objectID = new ObjectId(userid);
    return await users.findOneAndUpdate({ "_id": objectID }, { $set: { "profil.pseudo": username } });
}

async function updateEmail(userid, email) {
    const objectID = new ObjectId(userid);
    return await users.findOneAndUpdate({ "_id": objectID }, { $set: { "email": email } });
}

async function updatePassword(userid, password) {
    const objectID = new ObjectId(userid);
    const mdp = await bcrypt.hash(password, 10);
    return await users.findOneAndUpdate({ "_id": objectID }, { $set: { "connexion.password": mdp }})
}


async function addRefreshToken(refreshToken, userid) {
    const objectID = new ObjectId(userid);
    return await users.findOneAndUpdate({ "_id": objectID }, { $set: { "connexion.refreshToken": refreshToken } });
}

async function userFromRefreshToken(refreshToken) {
    return await users.findOne({ "connexion.refreshToken": refreshToken });
}

async function removeRefreshToken(userid) {
    const objectID = new ObjectId(userid);
    return await users.findOneAndUpdate({ "_id": objectID }, { $set: { "connexion.refreshToken": "" } });
}

module.exports = {
    createUser,
    isUserExist,
    isLoginExist,
    authentification,
    deleteUser,
    nbUsers,
    getUsers,

    updateConnected,
    updatePicture,
    updateBio,
    updateUsername,
    updateEmail,
    updatePassword,

    addRefreshToken,
    userFromRefreshToken,
    removeRefreshToken
};
