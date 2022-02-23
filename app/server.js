const pg = require("pg");
const express = require("express");
const app = express();

const port = 3000;
const hostname = "localhost";

const env = require("../env.json");
const Pool = pg.Pool;
const pool = new Pool(env);

pool.connect().then(function () {
    console.log(`Connected to database ${env.database}`);
});

app.use(express.static("public_html"))
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
    .then(function(response){
        console.log(response.rows);
        return res.sendStatus(200);
    })
})

app.listen(port, hostname, () => {
    console.log(`Listening at: http://${hostname}:${port}`);
});
