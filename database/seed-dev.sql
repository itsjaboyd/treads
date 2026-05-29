CREATE DATABASE treadsdb;

\c treadsdb

CREATE TABLE IF NOT EXISTS users (
 id SERIAL PRIMARY KEY,
 username VARCHAR(50),
 name VARCHAR(50),
 email VARCHAR(50) UNIQUE
);

CREATE TABLE IF NOT EXISTS roles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50)
);

INSERT INTO users (name, username, email) VALUES
 ('Alpha', 'mralpha', 'alpha@example.com'),
 ('Beta', 'betaguy', 'beta@example.com'),
 ('Gamma', 'gammagirl', 'gamma@example.com')
ON CONFLICT (email) DO NOTHING;

INSERT INTO roles (id, name) VALUES
  (1, 'admin'),
  (2, 'moderator'),
  (3, 'user')
ON CONFLICT (ID) DO NOTHING;