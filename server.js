const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let users = {}; // temporary storage (we upgrade later to database)

app.post("/login", (req, res) => {
    const { username } = req.body;

    if (!users[username]) {
        users[username] = { coins: 0 };
    }

    res.json({ username, coins: users[username].coins });
});

app.post("/add-coins", (req, res) => {
    const { username, coins } = req.body;

    if (!users[username]) users[username] = { coins: 0 };

    users[username].coins += coins;

    res.json({ success: true, coins: users[username].coins });
});

app.get("/user/:username", (req, res) => {
    const user = users[req.params.username];

    res.json(user || { coins: 0 });
});

app.listen(3000, () => {
    console.log("Backend running on port 3000");
});