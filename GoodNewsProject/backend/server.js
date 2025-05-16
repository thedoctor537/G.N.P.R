const express = require('express');
const path = require('path');
const app = express();
app.use(express.json());
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

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

    res.send("User logged in!");
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, '../public/HTML', 'index.html'))
});

app.listen(3000, () => console.log("Server running on port 3000"));