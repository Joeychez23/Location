const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql');
//const db = require('./config/db');
const port = process.env.PORT || 3000;




app.use(express.static('public'));
app.use(express.json({limit: '1mb'}));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());



const connection = mysql.createConnection({
    host: 'us-cdbr-east-06.cleardb.net',
    user: 'bc7ada4f2cece9',
    password: '084c2219',
    database: 'heroku_e723bcfa51ec52b'
});



app.set('view engine', 'ejs');

console.log("START");

connection.connect(function(err){   
    if(err) throw err;
    console.log("database connected");
    connection.query('SELECT * FROM data WHERE id = "1"', (error, rows) => {
        if (error) {
            console.log('Error');
            connection.end();
        }
        if (!error) {
            console.log('Success');
            console.log(rows);
            connection.end();

        }  
    })
});



/*app.get('/', function(req, res){
    res.render('pages/index');
})*/


app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
    //res.render("Hello World");
});





app.listen(port);
console.log(`listening on port ${port}`);







































































//const mysql = require('mysql');

/*const db = mysql.createConnection({
    host: "us-cdbr-east-06.cleardb.net",
    user: "bc7ada4f2cece9",
    password: "084c2219",
    database: "heroku_e723bcfa51ec52b"
});*/



//app.use(express.static('public'));
//app.use(express.json({limit: '1mb'}));
//app.use(bodyParser.urlencoded({extended: false}));
//app.use(bodyParser.json());
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
/*db.query('SELECT  FROM data WHERE name = "1"', function(err, result) {
    if (err) throw err;
    if (!error) {
        console.log(rows);
    }
})*/
/*
db.connect(function(err){
    if(err) throw err;
    console.log("database connected");
    db.query(`SELECT * FROM data WHERE name = "1"`, function(err, result) {
        if (err) throw err;
        if (!error) {
            console.log(rows);
        }
    })
})




app.get('/', function (req, res) {
    //res.sendFile(__dirname + '/index.html');
    res.render("Hello World");
});
//app.get('/css/index.css', function (req, res) {
    //res.sendFile(__dirname + '/css/index.css');
//});

app.listen(process.env.PORT || port, () => {
    console.log(`${port}`);
    db.connect(function(err){
        if(err) throw err;
        console.log("database connected");
        db.query(`SELECT * FROM data WHERE name = "1"`, function(err, result) {
            if (err) throw err;
            if (!error) {
                console.log(rows);
            }
        })
    })
});*/












/*


app.post('/api', (request, response) => {

    console.log('I got a request');
    console.log(request.body);
    const data = request.body;
    const timestamp = Date.now();
    data.timestamp = timestamp;
    //database.insert(data);
    //console.log(database);
    response.json(data);
});*/