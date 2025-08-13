const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    favorites: [{ type: String }] // Joke strings store karenge
});

module.exports = mongoose.model('User', UserSchema);
