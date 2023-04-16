const bcrypt = require('bcrypt');


const { MongoClient, ObjectId } = require('mongodb');
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);


const database = client.db("ProjetWeb");
const users = database.collection("Users");
const connexion = database.collection("Connexion");
const profil = database.collection("Profil");


async function createUser(info) {
    try {
        const {login, password, pseudo, email, dateNaissance } = info;
        
        const mdp = await bcrypt.hash(password, 10);

        const docConnexion = { password:mdp, login:login, connected:false };
        const docProfils = { pseudo:pseudo, followers:[], following:[], posts:[] , picture:"" };

        const result1 = await connexion.insertOne(docConnexion);
        const result2 = await profil.insertOne(docProfils);

        const docUsers = { email:email, dateNaissance:dateNaissance, profil:result2.insertedId, privateMess:[], connexion:result1.insertedId };
        const result = await users.insertOne(docUsers);

    } catch(err) {
        console.error(err);
    }
}


async function authentification(info) {
    try {
        const {login, password} = info;
        found = await connexion.findOne({ login:login });
        let foundConnexion = "";
        if (found) {
            foundConnexion = await bcrypt.compare(password, found.password);
        }
        return foundConnexion;

    } catch(err) {
        console.error(err);
    }
}


async function isUserExist(info){
    try {
        const { email, login } = info;
        const foundUser = await users.findOne({ email: email });
        const foundConnexion = await connexion.findOne({ login: login });
        return foundUser || foundConnexion;

    } catch (err) {
        console.error(err);
    }
}


async function deleteUser(userid) { 
    try {
        const objectID = new ObjectId(userid);
        const result = await users.findOneAndDelete({_id:objectID});
        await profil.deleteOne({_id:result.value.profil});
        await connexion.deleteOne({_id:result.value.connexion});
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


async function updateConnected(connexion_id) {
    try {
        const result = await connexion.findOne({_id:connexion_id});
        return connexion.updateOne({_id:connexion_id}, {$set: {connected: !result.connected}})

    } catch(err) {
        console.error(err);
    }
}


module.exports = {
    createUser,
    isUserExist,
    authentification,
    deleteUser,
    nbUsers,
    updateConnected
};