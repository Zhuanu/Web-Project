const express = require("express");
const jwt = require("jsonwebtoken");

const user = require("./user/routes.js");
const friend = require("./friend/routes.js");

const app = express();


// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb://localhost:27017/?directConnection=true&serverSelectionTimeoutMS=2000";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const { MongoClient } = require('mongodb');
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);


const port = 8000;

app.use(express.json());

app.use('/api/user', user);
app.use('/api/friend', friend);

const server = app.listen(port, () => {
    console.log(`Serveur actif sur le port ${port}`);
});

process.on('SIGINT', () => {
    client.close();
    server.close();
    console.log("\nMongoDB connection closed");
})