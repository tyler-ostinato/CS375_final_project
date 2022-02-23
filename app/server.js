const pg = require("pg");
const express = require("express");
const app = express();

const port = 3000;
const hostname = "localhost";

app.use(express.static("public_html"))

const env = require("../env.json");
const Pool = pg.Pool;
const pool = new Pool(env);

pool.connect().then(function () {
    console.log(`Connected to database ${env.database}`);
});

app.use(express.static("public"));
app.use(express.json());

app.post("/timer", function(req, res){
    let jsonObject = req.body;
    let user = jsonObject.user;
    let time = jsonObject.time;
    let date = jsonObject.date;
    let scramble = jsonObject.scramble;

    pool.query(
        "INSERT INTO timer (name, timer, date, scramble) VALUES($1, $2, $3, $4) RETURNING *",
        [user, time, date, scramble]
    )

    console.log(jsonObject);
    res.status(200);
    res.send();
})

app.listen(port, hostname, () => {
    console.log(`Listening at: http://${hostname}:${port}`);
});
