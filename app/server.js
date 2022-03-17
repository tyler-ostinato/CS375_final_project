// Setup of login/registration -
// Video: https://www.youtube.com/watch?v=vxu1RrR0vbw
// Source code: https://github.com/conorbailey90/node-js-passport-login-postgresql

const pg = require("pg");
const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const session = require("express-session");
const flash = require("express-flash");
const passport = require("passport");
const path = require("path");

const initializePassport = require("./passportConfig");

initializePassport(passport);

const port = 3000;
const hostname = "localhost";

const env = require("../env.json");
const Pool = pg.Pool;
const pool = new Pool(env);

let user; // Store the current user in the session for the database

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../app/public_html/views'))
app.use(express.urlencoded({extended: false}));

app.use(session ({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
}));

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) =>{
    res.render('index')
});

app.get("/users/register", checkAuthenticated, (req, res) => {
    res.render("register");
})

app.get("/users/login", checkAuthenticated, (req, res) => {
    res.render("login");
})

app.get("/users/dashboard", checkNotAuthenticated, (req, res) => {
    res.render("dashboard", { user: req.user.name });
    user = req.user.name;
})

app.get("/users/logout", (req, res) => {
    req.logout();
    req.flash("success_msg", "You have logged out.")
    res.redirect("/users/login");
});

app.post('/users/register', async (req, res) =>{
    let { name, email, password, password2} = req.body;

    let errors = [];

    if(!name || !email || !password || !password2){
        errors.push({message: "Please enter all fields."});
    }

    if(password.length < 6){
        errors.push({message: "Password should be atleast 6 characters."});
    }

    if(password !== password2){
        errors.push({message: "Passwords do not match."});
    }

    if (errors.length > 0) {
        res.render("register", { errors, name, email, password, password2 });
    }
    else{
        //Form validation has passed
        let hashedPassword = await bcrypt.hash(password, 10);
        // console.log(hashedPassword);

        pool.query(
            `SELECT * FROM users
            WHERE email = $1`, [email], (err, results) => {
                if (err){
                    throw err
                }
                // console.log(results.rows);

                if(results.rows.length > 0){
                    errors.push({ message: "Email already registered." });
                    res.render("register", { errors });
                }
                else{
                    // There are no users in the database with specified email
                    pool.query(
                        `INSERT INTO users (name, email, password)
                        VALUES ($1, $2, $3)
                        RETURNING id, password`, [name, email, hashedPassword], (err, results) => {
                            if(err){
                                throw err;
                            }
                            // console.log(results.rows);
                            req.flash('success_msg', "You are now registered. Please log in.");
                            res.redirect('/users/login');
                        }
                    );
                }
            }
        );
    }
});

app.post("/users/login", passport.authenticate('local', {
    successRedirect: '/users/dashboard',
    failureRedirect: 'users/login',
    failureFlash: true,
}));

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect("/users/dashboard");
    }
    next();
}

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/users/login");
}

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

app.use(express.static("public_html"));
app.use(express.json());

app.post("/timer", function(req, res){
    let jsonObject = req.body;
    let time = jsonObject.time;
    let date = jsonObject.date;
    let scramble = jsonObject.scramble;

    console.log("user");
    console.log(user);

    pool.query(
        "INSERT INTO timer (name, time, scramble, date) VALUES($1, $2, $3, $4) RETURNING *",
        [user, time, scramble, date]
    )
    .then(function(response){
        // console.log(response.rows);
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
        "SELECT time FROM timer ORDER BY date DESC LIMIT 30",
    )
    .then(function(response){
        // console.log(response.rows);
        return res.send(response.rows);
    })
});

app.listen(port, hostname, () => {
    console.log(`Listening at: http://${hostname}:${port}`);
});