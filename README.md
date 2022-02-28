# CS375_final_project (Team "One Great Guy and One More Guy")

## Description
Final project that will combine the last 7 weeks of class material to make a website of our choosing. 

Our project will be to make a website that allows users to time their rubiks cubes solves. This website will include options to allows users to create and log in to their accounts which will track their respective solves (time, date, scrambles, etc.). Website will also have functionality to provide statistics regarding timed solves such as Best of 3,5 and 12 avg times. Additional features include a 3D representation of the the scrambled cube, and a page to help users practice their OLL and PLL algorithms. 

Techonolgies/Methods we will use -\
Javascript, CSS, and HTML\
Express\
Node.js\
D3.js\
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
CREATE DATABASE <DATABSE NAME>;
```
(add database to env.json file)

(run \l too see your new datbase)

(logout with \q)

Log into the database.
```
psql --username postgres --dbname <DATABASE NAME>
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
INSERT INTO timer (name, timer, date, scramble) VALUES ('Test', 77.77, '2/23/2022 @ 10:23am', 'Fi D B2 D L Ui Di Bi R U2 R U2 B2 L B2 Ri D2 B2 D2 Ri F');
```
Verify entry was added using.
```
SELECT * FROM timer;
```
### Authors
Tyler Ostinato
Jazz Sussman Moss
