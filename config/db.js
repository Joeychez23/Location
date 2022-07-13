const mysql = require('mysql');

const db = mysql.createConnection({
    host: "us-cdbr-east-06.cleardb.net",
    user: "bc7ada4f2cece9",
    password: "084c2219",
    database: "heroku_e723bcfa51ec52b"
});

module.exports = db;
