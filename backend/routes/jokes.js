const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const jokes = [
      { id: 1, text: "Why don’t scientists trust atoms? Because they make up everything!" },
      { id: 2, text: "I told my computer I needed a break, and it froze!" },
      { id: 3, text: "Why did the JavaScript developer wear glasses? Because he couldn’t C#." }
    ];
    res.json(jokes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to load jokes" });
  }
});

module.exports = router;
