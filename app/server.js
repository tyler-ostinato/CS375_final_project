const pg = require("pg");
const express = require("express");
const app = express();

const port = 3000;
const hostname = "localhost";

const env = require("../env.json");
const Pool = pg.Pool;
const pool = new Pool(env);

// import * as SRScrambler from 'sr-scrambler'
// const scrambler = require("sr-scrambler");


// Source for basic scramble: https://levelup.gitconnected.com/using-javascript-to-scramble-a-rubiks-cube-306f52908f18
function makeScramble(){
    var options = ["F", "R", "U", "B", "L", "D", "F2", "R2", "U2", "B2", "L2", "D2", "F'", "R'", "U'", "B'", "L'", "D'"]
    var scramble = []

    // Add 20 moves to the scramble
    // need to avoid doing parities one after another
    // example: F then F' basically does nothing
    for (var i = 0; i < 20; i++) {
        scramble.push(options[getRandomInt(18)])
    }

    return scramble;
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

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
    // let scramble = jsonObject.scramble;

    // import SRScrambler from 'sr-scrambler'
    const scrambler = require("sr-scrambler");

    var scramble = scrambler.generateScramble(3, 30);
    console.log(scramble);

    pool.query(
        "INSERT INTO timer (name, timer, date, scramble) VALUES($1, $2, $3, $4) RETURNING *",
        [user, time, date, scramble]
    )
    .then(function(response){
        console.log(response.rows);
        return res.sendStatus(200);
    })
})

app.get('/scramble', function(req, res){
    let genScramble = [];
    genScramble = makeScramble();
    console.log(genScramble);
    // return res.sendStatus(200);
    res.json({scramble: genScramble});
    // res.sendStatus(200);
})

app.listen(port, hostname, () => {
    console.log(`Listening at: http://${hostname}:${port}`);
});
