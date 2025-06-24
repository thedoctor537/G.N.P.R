const express = require('express');
const session = require("express-session");
const path = require('path');
const app = express();
app.use(express.json());
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
const { db, db2 } = require("../database/server/db");

app.use(express.static(path.join(__dirname, "../public")))
console.log(__dirname);

app.use(session({
  secret: "secretkey",
  resave: false,
  saveUninitialized: false,
}));

app.get("/user-status", (req, res) => {
  res.json({ loggedIn: !!req.session?.user });
});

app.get("/logout", (req, res) => {
  req.session.destroy(err => {
    if (err) return res.status(500).send("שגיאה בהתנתקות");
    res.redirect("/");
  });
});

app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, '../public/HTML', 'login.html'))
});

app.post("/login", (req, res) => {
    console.log(req.body);
    const { email2, password2 } = req.body;

    if (!email2 || !password2){
        return res.status(400).json({ error: "!יש למלא את כל השדות" });
    }

    db.get(`SELECT * FROM users WHERE email = ? AND password = ?`, [email2, password2], (err, user) => {
    if (err) return res.status(500).send("שגיאה בשרת");
    if (!user) return res.redirect("/signup");

     req.session.user = { email: user.email, id: user.id };
     
     res.redirect("/news");
  });
});

app.get("/signup", (req, res) => {
    res.sendFile(path.join(__dirname, '../public/HTML', 'signup.html'))
});

app.post("/signup", (req, res) => {
  const { email, password, password3 } = req.body;
  console.log(req.body);

  if (password != password3) {
    return res.send("סיסמה לא תקינה");
  }

  db.get(`SELECT * FROM users WHERE email = ?`, [email], (err, row) => {
    if (err) {
      return res.send("שגיאה בבדיקה");
    }

    if (row) {
      return res.redirect("/login");
    }

    db.run(
      `INSERT INTO users (email, password) VALUES (?, ?)`,
      [email, password],
      function (err) {
        if (err) {
          return res.send("שגיאה בהכנסת המשתמש");
        }
        return  res.redirect("/news");
      }
    );
  });
});
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, '../public/HTML', 'index.html'))
});

app.get("/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) return res.send("שגיאה בהתנתקות");
        res.redirect("/");
    });
});


app.get("/about", (req, res) => {
    res.sendFile(path.join(__dirname, '../public/HTML', 'about.html'))
});

app.get("/news", (req, res) => {
    res.sendFile(path.join(__dirname, '../public/HTML', 'news.html'))
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
      res.redirect("/makeContact");
    }
  );
});


app.listen(3000, () => console.log("Server running on port 3000"));