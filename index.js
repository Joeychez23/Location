const express = require('express');
const app = express();
//const Datastore = require('nedb');
const port = 3000;

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.listen(process.env.PORT || port, () => console.log(`${port}`));