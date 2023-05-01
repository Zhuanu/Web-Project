const { MongoClient, ObjectId } = require('mongodb');
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);


const database = client.db("ProjetWeb");
const users = database.collection("Users");
const tweets = database.collection("Tweets");

async function createTweet(content, userid) {
    const docTweet = {
        content: content,
        userid: userid,
        date: new Date().toLocaleTimeString() + " - " + new Date().toLocaleDateString(),
    }

    const result = await tweets.insertOne(docTweet);
    return result;
};

async function deleteTweet(tweetId) {
    const result = await tweets.deleteOne({ _id: new ObjectId(tweetId) });
    return result;
}

async function modifyTweet(tweetId, content) {
    const result = await tweets.updateOne({ _id: new ObjectId(tweetId) }, { 
        $set: { 
            content: content ,
            date: new Date().toLocaleTimeString() + " - " + new Date().toLocaleDateString(),
        } });
    return result;
}

async function getAllTweets() {
    return await tweets.find().toArray();
}

async function getAllTweetsFromUser(userid) {
    return await tweets.find({ userid: new ObjectId(userid) }).toArray();
}

async function getTweetById(tweetId) {
    return await tweets.findOne({ _id: new ObjectId(tweetId) });
}

module.exports = {
    createTweet,
    deleteTweet,
    modifyTweet,
    getAllTweets,
    getAllTweetsFromUser,

    getTweetById
}