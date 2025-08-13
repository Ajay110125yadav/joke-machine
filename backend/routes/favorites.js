const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware to check token
function authMiddleware(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: "No token" });
    try {
        const decoded = jwt.verify(token, 'secretkey');
        req.userId = decoded.id;
        next();
    } catch {
        res.status(401).json({ error: "Invalid token" });
    }
}

// Add joke to favorites
router.post('/add', authMiddleware, async (req, res) => {
    const { joke } = req.body;
    if (!joke) return res.status(400).json({ error: "No joke provided" });

    try {
        const user = await User.findById(req.userId);
        if (!user) return res.status(404).json({ error: "User not found" });

        if (!user.favorites.includes(joke)) {
            user.favorites.push(joke);
            await user.save();
        }
        res.json({ message: "Joke added to favorites", favorites: user.favorites });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get favorites
router.get('/', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        if (!user) return res.status(404).json({ error: "User not found" });
        res.json({ favorites: user.favorites });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
