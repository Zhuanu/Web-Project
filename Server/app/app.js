const express = require("express");
require ("dotenv").config({path: "../.env"});

const user = require("./user/routes.js");
const friend = require("./friend/routes.js");

const { MongoClient } = require('mongodb');
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);


const port = 8000;

const app = express();
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