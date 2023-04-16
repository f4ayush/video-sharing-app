const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  likedVideos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Video' }],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  videos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Video' }]
});

const User = mongoose.model('User', userSchema);

module.exports = User;
