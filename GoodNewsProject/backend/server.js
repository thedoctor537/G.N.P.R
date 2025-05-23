const express = require('express');
const path = require('path');
const app = express();
app.use(express.json());
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
const db = require("../database/server/db");

app.use(express.static(path.join(__dirname, "../public/style")))
console.log(__dirname);

app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, '../public/HTML', 'login.html'))
});

app.post("/login", (req, res) => {
    console.log(req.body);
    const { email, password } = req.body;

    if (!email || !password){
        return res.status(400).json({ error: "All fields are required" });
    }

    res.send("נכנסת למשתמש שלך בהצלחה");
});

app.get("/signup", (req, res) => {
    res.sendFile(path.join(__dirname, '../public/HTML', 'signup.html'))
});

app.post("/signup", (req, res) => {
    const { username, password } = req.body;

    db.run(`INSERT INTO users (username, password) VALUES (?,?)`,
        [username, password]
    );

    if (!email || !password){
        return res.status(400).json({ error: "All fields are required" });
    }

    res.send("נרשמת בהצלחה");
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, '../public/HTML', 'index.html'))
});

app.get("/about", (req, res) => {
    res.sendFile(path.join(__dirname, '../public/HTML', 'about.html'))
});

app.get("/makeContact", (req, res) => {
    res.sendFile(path.join(__dirname, '../public/HTML', 'makeContact.html'))
});

app.listen(3000, () => console.log("Server running on port 3000"));