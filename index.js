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
    database: 'heroku_e723bcfa51ec52b',
    multipleStatements: true
});


//connection.connect(function(err) {
    //if(err)throw err;
    //else {
        //console.log("Connection Successful");
    //}
//})



app.set('view engine', 'ejs');

console.log("START");










/*app.get('/', function(req, res){
    res.render('pages/index');
})*/






/*
connection.connect(function(err){   
    if(err) throw err;
    console.log("database connected"); //WHERE id = "1"
    connection.query('SELECT * FROM data WHERE id = "1"', (error, rows) => {
        if (error) {
            console.log('error');
            connection.end();
        }
        if (!error) {
            console.log('Success');

            //for(let i = 0; i < rows.length(); i++) {
                //console.log(rows);
            //}
            //console.log(array);
            let id = rows[0].id
            console.log(id);
            connection.end();
            //console.log(rows.getString("city_name"));

        }  
    })
});
*/



//insert
/*
connection.connect(function(err){   
    if(err) throw err;
    let data = {
        id: 5, 
        lat: 31.230416,
        lon: 121.473701,
        city_name: 'Shanghai',
        weather: 'Broken clouds',
        temp: 92
    }
    console.log("database connected");
    var sql = "SET @id = ?;SET @lat = ?;SET @lon = ?;SET @city_name = ?;SET @weather = ?;SET @temp = ?; \
    CALL dataAddOrEdit(@id,@lat,@lon,@city_name,@weather,@temp);";
    connection.query(sql, [data.id, data.lat, data.lon, data.city_name, data.weather, data.temp], (error, rows, fields) => {
        if (error) {
            console.log(error);
            connection.end();
        }
        if (!error) {
            console.log(rows);
            rows.forEach(element => {
                if(element.constructor == Array);

            })
            console.log('Success');
            connection.end();

        }  
    })
});

*/





/*
app.get('/', function(req, res){
    res.render('pages/index');
})*/


app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
    //res.render("Hello World");
});










app.listen(port);
console.log(`listening on port ${port}`);









app.post('/api', (request, response) => {
    let data = request.body;
    try{
        connection.connect(function(err){   
            if(err) {
                connection.end();}
            console.log("database connected");
            var sql = "SET @id = ?;SET @lat = ?;SET @lon = ?;SET @city_name = ?;SET @weather = ?;SET @temp = ?; \
            CALL dataAddOrEdit(@id,@lat,@lon,@city_name,@weather,@temp);";
            connection.query(sql, [data.id, data.lat, data.lon, data.city_name, data.weather, data.temp], (error, rows, fields) => {
                if (error) {
                    //console.log(error);
                    connection.end();
                }
                if (!error) {
                    console.log(rows);
                    rows.forEach(element => {
                    if(element.constructor == Array);
                    })
                    console.log(request.body);
                    //const data = request.body;
                    const timestamp = Date.now();
                    data.timestamp = timestamp;
                    response.json(data);
                    console.log('Success');
                    connection.end();
                }    
            })
            //connection.end();
        });
    } 
    catch(error) {
        try{
            connection.connect(function(err){   
                if(err) {}
                    //connection.end();}
                console.log("database connected");
                var sql = "SET @id = ?;SET @lat = ?;SET @lon = ?;SET @city_name = ?;SET @weather = ?;SET @temp = ?; \
                CALL dataAddOrEdit(@id,@lat,@lon,@city_name,@weather,@temp);";
                connection.query(sql, [data.id, data.lat, data.lon, data.city_name, data.weather, data.temp], (error, rows, fields) => {
                    if (error) {
                        //console.log(error);
                        connection.end();
                    }
                    if (!error) {
                        console.log(rows);
                        rows.forEach(element => {
                        if(element.constructor == Array);
                        })
                        console.log(request.body);
                        //const data = request.body;
                        const timestamp = Date.now();
                        data.timestamp = timestamp;
                        response.json(data);
                        console.log('Success');
                        connection.end();
                    }    
                })
                //connection.end();
            });
        } catch (error) {
            connection.connect(function(err){   
                if(err) {}
                    //connection.end();}
                console.log("database connected");
                var sql = "SET @id = ?;SET @lat = ?;SET @lon = ?;SET @city_name = ?;SET @weather = ?;SET @temp = ?; \
                CALL dataAddOrEdit(@id,@lat,@lon,@city_name,@weather,@temp);";
                connection.query(sql, [data.id, data.lat, data.lon, data.city_name, data.weather, data.temp], (error, rows, fields) => {
                    if (error) {
                        //console.log(error);
                        connection.end();
                    }
                    if (!error) {
                        console.log(rows);
                        rows.forEach(element => {
                        if(element.constructor == Array);
                        })
                        console.log(request.body);
                        //const data = request.body;
                        const timestamp = Date.now();
                        data.timestamp = timestamp;
                        response.json(data);
                        console.log('Success');
                        connection.end();
                    }    
                })
                //connection.end();
            });
        }

    }
    //connection.end();
});





























































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