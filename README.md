# CS375_final_project (Team "One Great Guy and One More Guy")

## Description
Final project that will combine the last 7 weeks of class material to make a website of our choosing. 

Our project will be to make a website that allows users to time their rubiks cubes solves. This website will include options to allows users to create and log in to their accounts which will track their respective solves (time, date, scrambles, etc.). Website will also have functionality to provide statistics regarding timed solves such as Best of 3,5 and 12 avg times. Additional features include a 3D representation of the the scrambled cube, and a page to help users practice their OLL and PLL algorithms. 

Techonolgies/Methods we will use -\
Javascript, CSS, and HTML\
Express\
Node.js\
Chart.js\
Postgres SQL database\
Fetch API\
RESTful web APIs (Node)\
Password hashing\
passport\
ejs\

## How to Clone and Run
Navigate to desired directory in your terminal and run
```
git clone https://github.com/tyler-ostinato/CS375_final_project.git
```
cd into the app folder
```
cd app/
```
run the code on localhost
```
node server.js
```

## env.json
Add an env.json file to the root of this directory and add the following information.

```
{
	"user": "postgres",
	"host": "localhost",
	"database": "rubiks_timer",
	"password": "<yourpassword>",
	"port": 5432
}
```
## Install Dependicies
```
npm install  
```

## Database Setup (Times)
```
psql --username postgres
```
Create a database.
```
CREATE DATABASE rubiks_timer;
```
(add database to env.json file)

(run \l too see your new database)

(logout with \q)

Log into the database.
```
psql --username postgres --dbname rubiks_timer
```
Create a table in the database to store times.
```
CREATE TABLE timer (
    id SERIAL PRIMARY KEY, /* auto incrementing primary key */
    name VARCHAR(50),
    time REAL,
    date VARCHAR(20),
    scramble VARCHAR(80)
);
```
Verify table was added using.
```
SELECT * FROM timer;
```

## Database Setup (User Data)
Log into the database.
```
psql --username postgres --dbname rubiks_timer
```
Create a table in the database to store user data.
```
CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(200) NOT NULL,
    email VARCHAR(200) NOT NULL,
    password VARCHAR(200) NOT NULL,
    UNIQUE (email)
);
```
Verify table was added using.
```
SELECT * FROM users;
```

### Authors
Tyler Ostinato

Jazz Sussman Moss
