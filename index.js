const express = require('express');
const bodyParser = require('body-parser');
const app = express();
//require('dotenv').config();
const mysql = require('mysql');
//const db = require('./config/db');
const port = process.env.PORT || 3000;


//heroku logs --tail

//weather
const api_key = "293a3bc9a37743dfb48df9cfd0d44dc1";

app.use(express.static('public'));
app.use(express.json({limit: '1mb'}));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

let connection = mysql.createConnection({
    host: 'us-cdbr-east-06.cleardb.net',
    user: 'bc7ada4f2cece9',
    password: '084c2219',
    database: 'heroku_e723bcfa51ec52b',
    multipleStatements: true,
    insecureAuth: true
});


//let connection;

function handleDisconnect() {
    connection = mysql.createConnection({
        host: 'us-cdbr-east-06.cleardb.net',
        user: 'bc7ada4f2cece9',
        password: '084c2219',
        database: 'heroku_e723bcfa51ec52b',
        multipleStatements: true,
        insecureAuth : true
    });
                                                    // Recreate the connection, since
                                                    // the old one cannot be reused.
  
    connection.connect(function(err) {              // The server is either down
      if(err) {                                     // or restarting (takes a while sometimes).
        console.log('error when connecting to db:', err);
        setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
      }                                     // to avoid a hot loop, and to allow our node script to
    });                                     // process asynchronous requests in the meantime.
                                            // If you're also serving http, display a 503 error.
    connection.on('error', function(err) {
      console.log('db error', err);
      if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
        handleDisconnect();                         // lost due to either server restart, or a
      } else {                                      // connnection idle timeout (the wait_timeout
        throw err;                                  // server variable configures this)
      }
    });
}
  
handleDisconnect();



app.set('view engine', 'ejs');

console.log("START");






app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
    //res.render("Hello World");
});



app.get('/api_key', (request, response) => {
    //console.log(api_key);
    const data = api_key;
    //console.log(data);
    response.json(data);
});







app.listen(port);
console.log(`listening on port ${port}`);









app.post('/api', (request, response) => {
    let data = request.body;
    try{
            
    var sql = "SET @id = ?;SET @lat = ?;SET @lon = ?;SET @city_name = ?;SET @weather = ?;SET @temp = ?;SET @lastUpdated = ?;SET @parameter = ?;SET @unit = ?;SET @value = ?; SET @name = ?;SET @base64 = ?; \
    CALL dataAddOrEdit(@id,@lat,@lon,@city_name,@weather,@temp,@lastUpdated,@parameter,@unit,@value,@name,@base64);";
    connection.query(sql, [data.id, data.lat, data.lon, data.city_name, data.weather, data.temp, data.air.lastUpdated, data.air.parameter, data.air.unit, data.air.value, data.name, data.image64], (error, rows, fields) => {
        if (error) {
            //console.log(error);
            //connection.end();
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
        //connection.end();
        }    
    })
} catch (error) {
    var sql = "SET @id = ?;SET @lat = ?;SET @lon = ?;SET @city_name = ?;SET @weather = ?;SET @temp = ?; SET @name = ?;SET @base64 = ?; \
    CALL dataAddOrEdit(@id,@lat,@lon,@city_name,@weather,@temp,@name,@base64);";
    connection.query(sql, [data.id, data.lat, data.lon, data.city_name, data.weather, data.temp, data.name, data.image64], (error, rows, fields) => {
        if (error) {
            //console.log(error);
            //connection.end();
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
        //connection.end();
        }    
    })
}
});







































/*
let data = {
    id: 0, 
    lat: 31.230416,
    lon: 121.473701,
    city_name: 'Shanghai',
    weather: 'Broken clouds',
    temp: 92
}




//let data = request.body;

try{
            
    var sql = "SET @id = ?;SET @lat = ?;SET @lon = ?;SET @city_name = ?;SET @weather = ?;SET @temp = ?; \
    CALL dataAddOrEdit(@id,@lat,@lon,@city_name,@weather,@temp);";
    connection.query(sql, [data.id, data.lat, data.lon, data.city_name, data.weather, data.temp], (error, rows, fields) => {
        if (error) {
            //console.log(error);
            //connection.end();
        }
        if (!error) {
        console.log(rows);
        rows.forEach(element => {
        if(element.constructor == Array);
        })
        //console.log(request.body);
        //const data = request.body;
        const timestamp = Date.now();
        data.timestamp = timestamp;
        //response.json(data);
        console.log('Success');
        //connection.end();
        }    
    });
} catch (error) {
    var sql = "SET @id = ?;SET @lat = ?;SET @lon = ?;SET @city_name = ?;SET @weather = ?;SET @temp = ?; \
    CALL dataAddOrEdit(@id,@lat,@lon,@city_name,@weather,@temp);";
    connection.query(sql, [data.id, data.lat, data.lon, data.city_name, data.weather, data.temp], (error, rows, fields) => {
        if (error) {
            //console.log(error);
            //connection.end();
        }
        if (!error) {
        console.log(rows);
        rows.forEach(element => {
        if(element.constructor == Array);
        })
        //console.log(request.body);
        //const data = request.body;
        const timestamp = Date.now();
        data.timestamp = timestamp;
        //response.json(data);
        console.log('Kinda Success');
        //connection.end();
        }    
    })
}

*/




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


















            //connection.end();
    /*
    catch(error) {
        try{
            //connection.connect(function(err){   
                //if(err) {
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
                        //connection.end();
                    }    
                })
                //connection.end();
            //});

        }catch (error) {
            //connection.destroy();
            const timestamp = Date.now();
            data.timestamp = timestamp;
            response.json(data);
        }
            /*
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
            */
        //}

    //}
    //connection.end();
//});














//handleDisconnect();














































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