const express = require('express');
const app = express();
app.use(express.json());

app.post("/login", (req, res) => {
    const { email, password } = req.body;

    if (!email || !password){
        return res.status(400).json({ error: "All fields are required" });
    }

    res.send("User logged in!");
});

app.listen(3000, () => console.log("Server running on port 3000"));