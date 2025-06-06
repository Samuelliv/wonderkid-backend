
const express = require("express");
const fs = require("fs");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

const DB_FILE = "market_database.json";

function loadMarket() {
    try {
        return JSON.parse(fs.readFileSync(DB_FILE, "utf8"));
    } catch {
        return [];
    }
}

function saveMarket(data) {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

function generateRandomName() {
    const firstNames = ["Leo", "Kylian", "Erling", "Jude", "Pedri", "Florian"];
    const lastNames = ["Almeida", "Gonzalez", "Müller", "Santos", "Nguyen", "Okafor"];
    return firstNames[Math.floor(Math.random() * firstNames.length)] + " " +
           lastNames[Math.floor(Math.random() * lastNames.length)];
}

function generatePlayer() {
    return {
        name: generateRandomName(),
        position: ["Forward", "Midfielder", "Defender", "Goalkeeper"][Math.floor(Math.random()*4)],
        rating: Math.floor(Math.random() * 40) + 60,
        potential: ["S", "A", "B", "C"][Math.floor(Math.random()*4)],
        nationality: ["Brazil", "France", "Germany", "Spain", "Japan", "Argentina"][Math.floor(Math.random()*6)],
        price: "$" + (Math.floor(Math.random()*30)+5) + "M",
        favoriteTeam: ["Barcelona", "Liverpool", "PSG", "AC Milan", "Real Madrid"][Math.floor(Math.random()*5)],
        signed_by: null,
        signed_time: null
    };
}

setInterval(() => {
    let market = loadMarket();
    const newPlayer = generatePlayer();
    market.push(newPlayer);
    saveMarket(market);
    console.log("✅ New player generated:", newPlayer.name);
}, 60000);

app.get("/api/market_data", (req, res) => {
    const market = loadMarket();
    res.json(market);
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
// ping for change
