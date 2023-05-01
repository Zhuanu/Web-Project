const { MongoClient, ObjectId } = require('mongodb');
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);


const database = client.db("ProjetWeb");
const users = database.collection("Users");
const tweets = database.collection("Tweets");

const createTweet = async (tweet, userid, date) => {
    const tweet = {
        message: req.body.message,
        image: req.body.image,
    };

    const docTweet = {
        tweet: tweet,
        user: userid,
        date: date,
        comments: [],
        likes: [],
    }

    const result = await user.tweets.insertOne(docTweet);
};

module.exports = {
    createTweet
}