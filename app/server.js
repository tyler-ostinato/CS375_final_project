const pg = require("pg");
const express = require("express");
const app = express();

const port = 3000;
const hostname = "localhost";

const env = require("../env.json");
const Pool = pg.Pool;
const pool = new Pool(env);

// Source for basic scramble: https://levelup.gitconnected.com/using-javascript-to-scramble-a-rubiks-cube-306f52908f18
// Parity issue: https://levelup.gitconnected.com/javascript-rubiks-cube-scrambler-part-2-an-improved-algorithm-e279c3731c99
function makeScramble(){
    let numOptions = [0,1,2,3,4,5]
    let scramble = []

    let bad = true
    let length = 20; // 20 moves

    while (bad) {
        scramble = []
        for (let i = 0; i < length; i++) {
            scramble.push(numOptions[getRandomInt(6)])
        }
        // check if moves directly next to each other are the same letter
        for (let i = 0; i < length - 1; i++) {
            if (scramble[i] == scramble[i + 1]) {
                bad = true
                break
            } else {
                bad = false
            }
        }
    }

    let options = ["F", "F2", "F'", "R", "R2", "R'", "U", "U2", "U'", "B", "B2", "B'", "L", "L2", "L'", "D", "D2", "D'"];
    let scrambleMoves = [];

    for (let i = 0; i < 20; i++) {
        switch (scramble[i]) {
            case 0:
                move = options[getRandomInt(3)] // 0,1,2
                scrambleMoves.push(move)
                break
            case 1:
                move = options[getRandomIntBetween(3, 6)] // 3,4,5
                scrambleMoves.push(move)
                break
            case 2:
                move = options[getRandomIntBetween(6, 9)] // 6,7,8
                scrambleMoves.push(move)
                break
            case 3:
                move = options[getRandomIntBetween(9, 12)] // 9,10,11
                scrambleMoves.push(move)
                break
            case 4:
                move = options[getRandomIntBetween(12, 15)] // 12,13,14
                scrambleMoves.push(move)
                break
            case 5:
                move = options[getRandomIntBetween(15, 18)] // 15,16,17
                scrambleMoves.push(move)
                break
        }
    }

    return scrambleMoves;
}

function getRandomInt(max) {
    // returns up to max - 1
    return Math.floor(Math.random() * Math.floor(max))
}

function getRandomIntBetween(min, max) { // return a number from min to max - 1. Ex. 3, 9 returns 3 - 8
    return Math.floor(Math.random() * (max - min) + min)
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
    let scramble = jsonObject.scramble;

    pool.query(
        "INSERT INTO timer (name, timer, scramble, date) VALUES($1, $2, $3, $4) RETURNING *",
        [user, time, scramble, date]
    )
    .then(function(response){
        console.log(response.rows);
        return res.sendStatus(200);
    })
});

app.get('/scramble', function(req, res){
    let genScramble = [];
    genScramble = makeScramble();
    res.json({scramble: genScramble});
});

app.get('/getBestOfThree', function(req, res){
    pool.query(
        "SELECT timer FROM timer ORDER BY date DESC LIMIT 3",
    )
    .then(function(response){
        // console.log(response.rows);
        return res.send(response.rows);
    })
});

app.get('/getBestOfFive', function(req, res){
    pool.query(
        "SELECT timer FROM timer ORDER BY date DESC LIMIT 5",
    )
    .then(function(response){
        // console.log(response.rows);
        return res.send(response.rows);
    })
});

app.get('/getBestOfTwelve', function(req, res){
    pool.query(
        "SELECT timer FROM timer ORDER BY date DESC LIMIT 12",
    )
    .then(function(response){
        // console.log(response.rows);
        return res.send(response.rows);
    })
});

app.get('/getMostRecent', function(req, res){
    pool.query(
        "SELECT timer FROM timer ORDER BY date DESC LIMIT 1",
    )
    .then(function(response){
        // console.log(response.rows);
        return res.send(response.rows);
    })
});

app.listen(port, hostname, () => {
    console.log(`Listening at: http://${hostname}:${port}`);
});
