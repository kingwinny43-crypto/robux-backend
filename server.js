const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

let coins = 0;

app.get("/", (req, res) => {
    res.send("Backend is running!");
});

app.get("/coins", (req, res) => {
    res.json({
        coins: coins
    });
});

app.post("/watch-ad", (req, res) => {
    coins += 50;

    res.json({
        success: true,
        coins: coins
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});