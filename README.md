# CS375_final_project

## Description
--

## How to Clone and Run
--

## Database Setup
psql --username postgres

CREATE DATABASE <DATABSE NAME>;

(add database to env.json file)

(run \l too see your new datbase)

(logout with \q)

psql --username postgres --dbname <DATABASE NAME>

CREATE TABLE timer (
    id SERIAL PRIMARY KEY, /* auto incrementing primary key */
    name VARCHAR(50),
    timer REAL,
    scramble VARCHAR(80)
);

INSERT INTO timer (name, timer, scramble) VALUES ('Test', 77.77, 'Fi D B2 D L Ui Di Bi R U2 R U2 B2 L B2 Ri D2 B2 D2 Ri F');

SELECT * FROM timer;

### Authors
Tyler Ostinato
Jazz Sussman Moss