const pg = require("pg");
const express = require("express");
const app = express();

const port = 3000;
const hostname = "localhost";

app.use(express.static("public_html"))

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

app.get('/getTimes', function(req, res){
    pool.query(
        "SELECT timer FROM timer ORDER BY date DESC LIMIT 30",
    )
    .then(function(response){
        return res.send(response.rows);
    })
});


// -------------------- Login Stuff -------------------- //
const bcrypt = require("bcrypt");

// number of rounds the bcrypt algorithm will use to generate the salt
// the more rounds, the longer it takes
// so the salt will be more secure
// https://github.com/kelektiv/node.bcrypt.js#a-note-on-rounds
const saltRounds = 10;
// const user_env = require("../user_env.json");
// const Pool_user = pg.Pool;
// const pool_user = new Pool(user_env);
// pool_user.connect().then(function () {
//     console.log(`Connected to database ${user_env.database}`);
// });

app.post("/user", function (req, res) {
    let username = req.body.username;
    let plaintextPassword = req.body.plaintextPassword;
    let body2 = req.body;

    // TODO check body has username and plaintextPassword keys
    // TODO check password length >= 5 and <= 36
    // TODO check username length >= 1 and <= 20
    if((!body2.hasOwnProperty('username') || !body2.hasOwnProperty('plaintextPassword')) || 
        (typeof(username) !=='string' || typeof(plaintextPassword) !== 'string') ||
        ((username.length < 1 || username.length > 20) || (plaintextPassword.length < 5 || plaintextPassword.length > 36))
       ){
            return res.status(401).send();
    }

    // TODO check if username already exists
    pool.query(
        "SELECT * FROM users WHERE username = $1",
        [username]
    )
    .then(function (response) {
        // name already exists
        console.log(response.rows.length);
        if(response.rows.length > 0){
            res.status(401).send();
        }
        else{
        bcrypt
            .hash(plaintextPassword, saltRounds)
            .then(function (hashedPassword) {
                pool.query(
                    "INSERT INTO users (username, hashed_password) VALUES ($1, $2)",
                    [username, hashedPassword]
                )
                    .then(function (response) {
                        // account successfully created
                        // if created successfuly send them to the login page
                        // return res.redirect("login.html");
                        res.status(200).send();
                    })
                    .catch(function (error) {
                        console.log(error);
                        res.status(500).send(); // server error
                    });
            })
            .catch(function (error) {
                console.log(error);
                res.status(500).send(); // server error
            });
        }
    })
});

app.post("/auth", function (req, res) {
    let username = req.body.username;
    let plaintextPassword = req.body.plaintextPassword;

    pool.query("SELECT hashed_password FROM users WHERE username = $1", [
        username,
    ])
        .then(function (response) {
            if (response.rows.length === 0) {
                // username doesn't exist
                return res.status(401).send();
            }
            let hashedPassword = response.rows[0].hashed_password;
            bcrypt
                .compare(plaintextPassword, hashedPassword)
                .then(function (isSame) {
                    if (isSame) {
                        // password matched
                        res.status(200).send();
                    } else {
                        // password didn't match
                        res.status(401).send();
                    }
                })
                .catch(function (error) {
                    console.log(error);
                    res.status(500).send(); // server error
                });
        })
        .catch(function (error) {
            console.log(error);
            res.status(500).send(); // server error
        });
});

// -------------------- Login Stuff -------------------- //

app.listen(port, hostname, () => {
    console.log(`Listening at: http://${hostname}:${port}`);
});
