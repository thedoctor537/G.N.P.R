const express = require('express');
const path = require('path');
const app = express();
app.use(express.json());
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
const { db, db2 } = require("../database/server/db");

app.use(express.static(path.join(__dirname, "../public/style")))
console.log(__dirname);

app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, '../public/HTML', 'login.html'))
});

app.post("/login", (req, res) => {
    console.log(req.body);
    const { email, password } = req.body;

    if (!email || !password){
        return res.status(400).json({ error: "!יש למלא את כל השדות" });
    }

    res.send("נכנסת למשתמש שלך בהצלחה");

    db.get(`SELECT * FROM users WHERE email = ? AND password = ?`, [email, password], (err, user) => {
    if (err) return res.status(500).send("שגיאה בשרת");
    if (!user) return res.status(401).send("אימייל או סיסמה לא נכונים");

    res.send(`שלום ${email}, התחברת בהצלחה!`);
  });
});

app.get("/signup", (req, res) => {
    res.sendFile(path.join(__dirname, '../public/HTML', 'signup.html'))
});

app.post("/signup", (req, res) => {
  const { email, password, password2 } = req.body;
  console.log(req.body);

  if (password !== password2) {
    return res.send("סיסמה לא תקינה");
  }

  db.get(`SELECT * FROM users WHERE email = ?`, [email], (err, row) => {
    if (err) {
      return res.send("שגיאה בבדיקה");
    }

    if (row) {
      return res.send("שם המשתמש כבר קיים");
    }

    db.run(
      `INSERT INTO users (email, password) VALUES (?, ?)`,
      [email, password],
      function (err) {
        if (err) {
          return res.send("שגיאה בהכנסת המשתמש");
        }
        return res.send("נרשמת בהצלחה!");
      }
    );
  });
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

app.post("/makeContact", (req, res) => {
  console.log(req.body);
  const { fullName, phone, email, message } = req.body;

  if (!fullName || !phone || !email || !message) {
    return res.status(400).json({ error: "!יש למלא את כל השדות" });
  }

  db2.run(
    `INSERT INTO requests (fullName, phone, email, message) VALUES (?, ?, ?, ?)`,
    [fullName, phone, email, message],
    function (err) {
      if (err) {
        return res.status(500).send("אירעה שגיאה בעת שמירת הבקשה");
      }
      res.send("בקשתך נשלחה בהצלחה, נחזור אליך בהקדם האפשרי.");
    }
  );
});


app.listen(3000, () => console.log("Server running on port 3000"));