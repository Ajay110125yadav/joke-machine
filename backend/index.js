const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

//Root route
app.get('/', (req, res) => {
  res.send("Joke Machine Backend is running!");
});

app.get("/joke", (req, res) => {
  const jokes = [
    { setup: "Why don’t scientists trust atoms?", punchline: "Because they make up everything!" },
    { setup: "I told my computer I needed a break,", punchline: "and it froze!" },
    { setup: "Why did the JavaScript developer wear glasses?", punchline: "Because he couldn’t C#." }
  ];
  // Random joke select
  const randomIndex = Math.floor(Math.random() * jokes.length);
  res.json(jokes[randomIndex]);
});

// Render environment port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
