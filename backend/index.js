const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/jokes", (req, res) => {
  const jokes = [
    { id: 1, text: "Why don’t scientists trust atoms? Because they make up everything!" },
    { id: 2, text: "I told my computer I needed a break, and it froze!" },
    { id: 3, text: "Why did the JavaScript developer wear glasses? Because he couldn’t C#." }
  ];
  res.json(jokes);
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
