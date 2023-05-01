const express = require("express");
require ("dotenv").config({path: "../.env"});
const cookieParser = require('cookie-parser')

const user = require("./user/routes.js");
const friend = require("./friend/routes.js");
const messages = require("./message/routes.js");

const { MongoClient } = require('mongodb');
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);
const cors = require('cors');


const port = 8000;

const app = express();
app.use(express.json());
app.use(cookieParser())
app.use(cors({origin: "http://localhost:3000", credentials: true}));

app.use('/api/user', user);
app.use('/api/friend', friend);
app.use('/api/messages', messages)
app.get('/cookie', (req, res) => {
    res.json({cookies:req.cookies});
})

const server = app.listen(port, () => {
    console.log(`Serveur actif sur le port ${port}`);
});

process.on('SIGINT', () => {
    client.close();
    server.close();
    console.log("\nMongoDB connection closed");
})