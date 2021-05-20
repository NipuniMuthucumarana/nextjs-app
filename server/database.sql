CREATE DATABASE my-app;

CREATE TABLE register (
    id SERIAL PRIMARY KEY,   
    firstname VARCHAR(255),
	lastname VARCHAR(255),
	email VARCHAR(255),
	username VARCHAR(255),
	password VARCHAR(255)
	
);