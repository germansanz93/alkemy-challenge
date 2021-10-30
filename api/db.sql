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

CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    category VARCHAR(255) UNIQUE
);

CREATE TABLE movements (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    mov_date DATE,
    mov_type_id INTEGER REFERENCES movement_types(id),
    mov_description VARCHAR(255),
    mov_category_id INTEGER REFERENCES categories(id),
    amount NUMERIC(10,2),
    created_at TIMESTAMP DEFAULT NOW()
);

-- seed tables

INSERT INTO movement_types (mov_type) VALUES ('Income'), ('Outcome');

INSERT INTO users (name, lastname, email, password) 
VALUES ('Undercover', 'Nerd', 'undercover@nerd.com', '1234'),
       ('Homero', 'Simpson', 'homero@simpson.com', '1234'),
       ('Bart', 'Simpson', 'el@barto.com', '1234');

INSERT INTO categories (category) 
VALUES ('Salary'), 
       ('Food'), 
       ('Transport'), 
       ('Entertainment'), 
       ('Other');

INSERT INTO movements (user_id, mov_date, mov_type_id, mov_description, mov_category_id, amount) 
VALUES (1,'2020-01-01',1,'Initial',1,100),
       (2,'2020-01-10',1,'Salary',1,2000),
       (3,'2020-01-12',2,'Super',2,600),
       (1,'2020-01-15',2,'Grocery',2,60),
       (3,'2020-10-01',2,'Dog food',5,100),
       (1,'2020-10-10',2,'Fuel',5,20),
       (1,'2020-11-12',2,'Super',2,60),
       (2,'2020-11-15',2,'New guitar',5,550),
       (1, '2020-10-01', 1,'Interest',1,50),
       (1, '2020-10-01', 1,'Crypto',1,500);