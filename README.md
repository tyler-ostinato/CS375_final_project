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
Password hashing

## How to Clone and Run
Navigate to desired directory in your terminal and run
```
git clone https://github.com/tyler-ostinato/CS375_final_project.git
```

## Database Setup
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
    timer REAL,
    date VARCHAR(20),
    scramble VARCHAR(80)
);
```
```
INSERT INTO timer (name, timer, scramble, date) VALUES ('Test', 77.77, "U2 R2 L2 B2 R D2 L2 B' U D2 L' D2 R' B' R2 B R F' B R2", '1646238039');
```
Verify entry was added using.
```
SELECT * FROM timer;
```
### Authors
Tyler Ostinato
Jazz Sussman Moss
