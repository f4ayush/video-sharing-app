const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  duration: { type: Number, required: true },
  size: { type: Number, required: true },
  URL: { type: String, required: true },
  uploader: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  likesCount:{type: Number},
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
});

const Video = mongoose.model('Video', videoSchema);

module.exports = Video;
