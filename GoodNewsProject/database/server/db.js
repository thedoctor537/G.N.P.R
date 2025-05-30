const sqlite3 = require("sqlite3");
const path = require("path");
const Module = require("module");
const db = new sqlite3.Database(path.join(__dirname, "db", "users.db"));
const db2 = new sqlite3.Database(path.join(__dirname, "db", "requests.db"))

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
    )`);
});

db2.serialize(() => {
  db2.run(`CREATE TABLE IF NOT EXISTS requests(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    fullName TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT NOT NULL
  )`);
});

Module.exports = { db, db2 };