const { MongoClient, ObjectId } = require('mongodb');
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);


const database = client.db("ProjetWeb");
const users = database.collection("Users");

async function remove(user, friendIndex, friend, myIndex) {
    try {
        const deleteFollower = user.profil.followers
        deleteFollower.splice(friendIndex, 1);

        const deleteFollowing = friend.profil.following
        deleteFollowing.splice(myIndex, 1);

        await users.updateOne({ _id: user._id }, { $set: { "profil.followers": deleteFollower } });
        await users.updateOne({ _id: friend._id }, { $set: { "profil.following": deleteFollowing } });
        
    } catch(err) {
        console.error(err);
    }
}

async function following(user, friend) {
    try {
        const newFollowing = user.profil.following
        newFollowing.push(friend._id);
        
        const newFollower = friend.profil.followers
        newFollower.push(user._id);

        await users.updateOne({ _id: user._id }, { $set: { "profil.following": newFollowing } });
        await users.updateOne({ _id: friend._id }, { $set: { "profil.followers": newFollower } });

    } catch(err) {
        console.error(err);
    }
}

module.exports = {
    remove,
    following
}