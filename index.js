const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const db = require('./config/db');
const port = 3000;

app.use(express.static('public'));
//app.use(express.json({limit: '1mb'}));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
/*app.get('/', (req, res) => {
    db.query("SELECT = FROM data", (err, result) => {
        if (err) {
            console.log(err);
        }

        res.send(result);
    })
})*/
//const database = new Datastore('database.db');
//database.loadDatabase();

app.get('/', function (req, res) {
    /*let sql = "SELECT * FROM DATA";
    db.query(sql, function(err, result) {
        if (err) throw err;
        res.send(result);
    })*/
    //res.sendFile(__dirname + '/index.html');
    res.send("Hello World");
});
//app.get('/css/index.css', function (req, res) {
    //res.sendFile(__dirname + '/css/index.css');
//});

app.listen(process.env.PORT || port, () => {
    console.log(`${port}`);
    db.connect(function(err){
        if(err) throw err;
        console.log("database connected");
    })
});















app.post('/api', (request, response) => {

    console.log('I got a request');
    console.log(request.body);
    const data = request.body;
    const timestamp = Date.now();
    data.timestamp = timestamp;
    //database.insert(data);
    //console.log(database);
    response.json(data);
});