const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const FavSchema = new Schema({
  user: {type: Schema.Types.ObjectId, ref: 'User', required: true },
  setup: String,
  punchline: String,
  fullText: String,
  createdAt: { type: Date, deafult: Date.now }
});
module.exports = mongoose.model('Favorite', FavSchema);