// Import the Video model
const admin = require('firebase-admin');
const { v4: uuidv4 } = require('uuid');
const Video = require('../models/video');
const User = require('../models/user');

// GET /videos/:id - Get video by ID
exports.getVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }
    res.json(video);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

// POST /videos - Create a new video
exports.createVideo = async (req, res) => {
  const { title, description, category, url, userId } = req.body;
  
  try {
    const video = await Video.create({
      title,
      description,
      category,
      url,
      userId,
    });
    res.status(201).json(video);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

// PUT /videos/:id - Update video by ID
exports.updateVideo = async (req, res) => {
  try {
    const video = await Video.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }
    res.json(video);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

// DELETE /videos/:id - Delete video by ID
exports.deleteVideo = async (req, res) => {
  try {
    const video = await Video.findByIdAndDelete(req.params.id);
    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }
    res.json({ message: 'Video deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};



// GET /featured-videos - Get featured videos
exports.getFeaturedVideos = async (req, res) => {
  try {
    const videos = await Video.find({ isFeatured: true });
    res.status(200).json(videos);
  } catch (err) {
    console.log(err);
    res.status(500).send('Error retrieving featured videos');
  }
};

// GET /search?query= - Search for videos by keyword
exports.searchVideos = async (req, res) => {
  const query = req.query.query;
  try {
    const videos = await Video.find({ $text: { $search: query } });
    res.status(200).json(videos);
  } catch (err) {
    console.log(err);
    res.status(500).send('Error searching for videos');
  }
};

// GET /recommendations - Get recommended videos based on user's interactions
exports.getRecommendedVideos = async (req, res) => {
  const userId = req.query.userId;
  try {
    const user = await User.findById(userId).populate('viewingHistory videosLiked videosDisliked');
    const videosLiked = user.likedVideos;

    // get videos that users who liked the same videos as this user also liked
    const likedVideos = await Video.find({ _id: { $in: likedVideos } });
    const likedVideosUsers = await User.find({ likedVideos: { $in: likedVideos } });
    const similarUsersLikedVideos = await Video.find({ userId: { $in: likedVideosUsers }, _id: { $nin: videosLiked } });

    // combine and return the recommended videos
    const recommendedVideos = [...similarUsersLikedVideos];
    res.status(200).json(recommendedVideos);
  } catch (err) {
    console.log(err);
    res.status(500).send('Error getting recommended videos');
  }
};
