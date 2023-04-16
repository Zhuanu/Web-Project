const { MongoClient, ObjectId } = require('mongodb');
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);


const database = client.db("ProjetWeb");
const users = database.collection("Users");
const connexion = database.collection("Connexion");
const profil = database.collection("Profil");

async function remove(myProfil, indexFriend, friendProfil, myIndex) {
    try {
        myProfil.followers.splice(indexFriend, 1);
        friendProfil.following.splice(myIndex, 1);
        profil.updateOne({ _id: myProfil._id }, { $set: { followers: myProfil.followers } });
        profil.updateOne({ _id: friendProfil._id }, { $set: { following: friendProfil.following } });
        
    } catch(err) {
        console.error(err);
    }
}

async function following(myProfil, friendProfil, userid, friendid) {
    try {
        myProfil.following.push(friendid);
        friendProfil.followers.push(userid);
        profil.updateOne({ _id: myProfil._id }, { $set: { following: myProfil.following } });
        profil.updateOne({ _id: friendProfil._id }, { $set: { followers: friendProfil.followers } });

    } catch(err) {
        console.error(err);
    }
}

async function followingOrFollowers(url, myProfil) {
    try {
        const regexp = /^\/([^/]+)\/([^/]+)\/(.*)$/;
        const match = regexp.exec(url);
        if (match) {
            const service = match[2];
            if (service === "following") {
                return service;
            }
            if (service === "followers") {
                return service;
            }
        }
        return undefined;

    } catch(err) {
        console.error(err);
    }
}

module.exports = {
    remove,
    following,
    followingOrFollowers
}