const express = require('express');
const app = express();
//const Datastore = require('nedb');
const port = 3000;

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});
//app.get('/css/index.css', function (req, res) {
    //res.sendFile(__dirname + '/css/index.css');
//});

app.listen(process.env.PORT || port, () => console.log(`${port}`));







app.post('/api', (request, response) => {

    console.log('I got a request');
    console.log(request.body);
    const data = request.body;
    const timestamp = Date.now();
    data.timestamp = timestamp;
    database.insert(data);
    //console.log(database);
    response.json(data);
});