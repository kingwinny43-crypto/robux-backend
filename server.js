const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

let users = {};

// Home
app.get("/", (req, res) => {
    res.send("Backend is running!");
});

// Login
app.post("/login", (req, res) => {
    const { username } = req.body;

    if (!users[username]) {
        users[username] = {
            coins: 0
        };
    }

    res.json({
        username,
        coins: users[username].coins
    });
});

// Get user
app.get("/user/:username", (req, res) => {
    const username = req.params.username;

    if (!users[username]) {
        users[username] = {
            coins: 0
        };
    }

    res.json(users[username]);
});

// Add coins
app.post("/add-coins", (req, res) => {
    const { username, coins } = req.body;

    if (!users[username]) {
        users[username] = {
            coins: 0
        };
    }

    users[username].coins += coins;

    res.json({
        success: true,
        coins: users[username].coins
    });
});

// Exchange
app.post("/exchange", (req, res) => {
    const { username } = req.body;

    if (!users[username]) {
        return res.json({
            success: false,
            message: "User not found"
        });
    }

    if (users[username].coins < 1000) {
        return res.json({
            success: false,
            message: "Need 1000 coins"
        });
    }

    users[username].coins -= 1000;

    res.json({
        success: true,
        message: "Exchange successful!"
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});
