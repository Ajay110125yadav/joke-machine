const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  const existing = await User.findOne({ email });
  if (existing) return res.status(400).json({ msg:'User exists' });
  const hash = await bcrypt.hash(password, 10);
  const user = new User({ name, email,password: hash });
  await user.save();
  const token = jwt.sign({ id: user_id }, process.env.JWT_SECRET);
  res.json({ token, user:{id:user._id, name:user.name, email:user.email} })
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ msg: 'No user' });
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(400).json({ msg: "Invalid creds" });
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.json({ token, user:{id:user._id, name:user.name, email:user.email} });
});

module.exports = router;