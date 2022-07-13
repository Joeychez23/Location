const express = require('express');
const app = express();
//const Datastore = require('nedb');
const port = 3000;

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});
app.get('/css/index.css', function (req, res) {
    res.sendFile(__dirname + '/css/index.css');
});

app.listen(process.env.PORT || port, () => console.log(`${port}`));