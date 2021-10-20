-- postgres sql file

-- create db
CREATE DATABASE alkemy;

-- connect db
\c alkemy;

-- create tables
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    lastname VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    password VARCHAR(255),
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE movement_types (
    id SERIAL PRIMARY KEY,
    mov_type VARCHAR(255) UNIQUE
);

CREATE TABLE movements (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    mov_date DATE,
    mov_type_id INTEGER REFERENCES movement_types(id),
    mov_description VARCHAR(255),
    amount NUMERIC(10,2),
    created_at TIMESTAMP DEFAULT NOW()
);

-- seed tables

INSERT INTO movement_types (mov_type) VALUES ('Income'), ('Outcome');

INSERT INTO users (name, lastname, email, password) 
VALUES ('Undercover', 'Nerd', 'undercover@nerd.com', '1234'),
       ('Homero', 'Simpson', 'homero@simpson.com', '1234'),
       ('Bart', 'Simpson', 'el@barto.com', '1234');

INSERT INTO movements (user_id, mov_date, mov_type_id, mov_description, amount) 
VALUES (1,'2020-01-01',1,'Initial',100),
       (2,'2020-01-10',1,'Salary',2000),
       (3,'2020-01-12',2,'Super',600),
       (1,'2020-01-15',2,'Grocery',60);
