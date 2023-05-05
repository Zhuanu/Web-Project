const { MongoClient, ObjectId } = require('mongodb');
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);


const database = client.db("ProjetWeb");
const users = database.collection("Users");
const tweets = database.collection("Tweets");
const likes = database.collection("Likes");
const comments = database.collection("Comments");



async function createTweet(content, userid) {
    const docTweet = {
        content: content,
        userid: new ObjectId(userid),
        date: new Date(),
    }

    await tweets.insertOne(docTweet);
};

async function deleteTweet(tweetId) {
    await tweets.deleteOne({ _id: new ObjectId(tweetId) });
    await likes.deleteMany({ tweetid: new ObjectId(tweetId) });
    await comments.deleteMany({ tweetid: new ObjectId(tweetId) });
}

async function modifyTweet(tweetId, content) {
    const result = await tweets.updateOne({ _id: new ObjectId(tweetId) }, { 
        $set: { 
            content: content ,
            date: new Date(),
        } 
    });
    const tweet = await tweets.findOne({ _id: new ObjectId(tweetId) });
    const user = await users.findOne({ _id: new ObjectId(tweet.userid) });
    const tweetModified = { ...tweet, pseudo: user.profil.pseudo, picture: user.profil.picture };
    return tweetModified;
}

async function getAllTweets() {
    const allTweets = await tweets.find().toArray();
    const allTweetsFinal = [];

    for (const tweet of allTweets) {
        const user = await users.findOne({ _id: new ObjectId(tweet.userid) });
        const tweetModified = { ...tweet, pseudo: user.profil.pseudo, picture: user.profil.picture };
        allTweetsFinal.unshift(tweetModified);
    }

    return allTweetsFinal;
}

async function getAllTweetsFromUser(userid) {
    const tweetOfUser = await tweets.find({ userid: new ObjectId(userid) }).toArray();
    const tweetOfUserFinal = [];

    for (const tweet of tweetOfUser) {
        const user = await users.findOne({ _id: new ObjectId(tweet.userid) });
        const tweetModified = { ...tweet, pseudo: user.profil.pseudo, picture: user.profil.picture };
        tweetOfUserFinal.unshift(tweetModified);
    }

    return tweetOfUserFinal;
}

async function getTweetsFromTweet(tweetid) {
    const tweet = await tweets.find({ _id: new ObjectId(tweetid) }).toArray();
    return tweet;
}




async function likeTweet(tweetId, userid) {
    const docLike = {
        tweetid: new ObjectId(tweetId),
        userid: new ObjectId(userid),
    }

    await likes.insertOne(docLike);
}

async function unlikeTweet(tweetId, userid) {
    await likes.deleteOne({ tweetid: new ObjectId(tweetId), userid: new ObjectId(userid) });
}

async function getLikesFromTweet(tweetid) {
    const objectId = new ObjectId(tweetid)
    const result = await likes.find(
      { tweetid: objectId },
      { projection: { _id: 0, userid: 1 } }
    ).toArray();
    
    return result ? result.map((like) => like.userid) : [];
}

async function likeComment(commentId, userid) {
    const docLike = {
        commentid: new ObjectId(commentId),
        userid: new ObjectId(userid),
    }

    await likes.insertOne(docLike);
}

async function unlikeComment(commentId, userid) {
    await likes.deleteOne({ commentid: new ObjectId(commentId), userid: new ObjectId(userid) });
}

async function getLikesFromComment(commentid) {
    const objectId = new ObjectId(commentid)
    const result = await likes.find(
      { commentid: objectId },
      { projection: { _id: 0, userid: 1} }
    ).toArray();
    
    return result ? result.map((like) => like.userid) : [];
}




async function getTweetById(tweetId) {
    const tweet = await tweets.findOne({ _id: new ObjectId(tweetId) });
    const user = await users.findOne({ _id: new ObjectId(tweet.userid) });
    const tweetModified = { ...tweet, pseudo: user.profil.pseudo, picture: user.profil.picture };
    return tweetModified;
}



async function createComment(tweetId, text, userid) {
    const docComment = {
        tweetid: new ObjectId(tweetId),
        text: text,
        userid: new ObjectId(userid),
        date: new Date(),
    }

    await comments.insertOne(docComment);
}

async function deleteComment(commentid) {
    await comments.deleteOne({ _id: new ObjectId(commentid) });
    await likes.deleteMany({ commentid: new ObjectId(commentid) });
}

async function modifyComment(commentid, text) {
    await comments.updateOne({ _id: new ObjectId(commentid) }, {
        $set: {
            text: text,
            date: new Date(),
        }
    });
    const comment = await comments.findOne({ _id: new ObjectId(commentid) });
    const user = await users.findOne({ _id: new ObjectId(comment.userid) });
    const commentModified = { ...comment, pseudo: user.profil.pseudo, picture: user.profil.picture };
    return commentModified;
}

async function getCommentsFromTweet(tweetid) {
    const commentaires = await comments.find({ tweetid: new ObjectId(tweetid) }).toArray();
    const commentsFinal = [];

    for (const comment of commentaires) {
        const user = await users.findOne({ _id: new ObjectId(comment.userid) });
        const commentModified = { ...comment, pseudo: user.profil.pseudo, picture: user.profil.picture };
        commentsFinal.unshift(commentModified);
    }

    return commentsFinal;
}

async function getCommentsFromUser(userid) {
    const commentaires = await comments.find({ userid: new ObjectId(userid) }).toArray();
    const commentsFinal = [];

    for (const comment of commentaires) {
        const user = await users.findOne({ _id: new ObjectId(comment.userid) });
        const commentModified = { ...comment, pseudo: user.profil.pseudo, picture: user.profil.picture };
        commentsFinal.unshift(commentModified);
    }

    return commentsFinal;
 }
  

module.exports = {
    createTweet,
    deleteTweet,
    modifyTweet,
    getAllTweets,
    getAllTweetsFromUser,
    getTweetsFromTweet,

    likeTweet,
    unlikeTweet,
    getLikesFromTweet,
    likeComment,
    unlikeComment,
    getLikesFromComment,

    getTweetById,

    createComment,
    deleteComment,
    modifyComment,
    getCommentsFromTweet,
    getCommentsFromUser
}