require("./app/app.js");

require ("dotenv").config({path: '../.env'});

process.env.JWT_SECRET = "secret";
