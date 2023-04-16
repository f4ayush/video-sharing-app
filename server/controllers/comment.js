const Comment = require('../models/comment');
// GET /comments/:id - Get comment by ID
exports.getComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    res.status(200).json(comment);
  } catch (err) {
    console.log(err);
    res.status(500).send('Error retrieving comment');
  }
};

// POST /comments - Create a new comment
exports.createComment = async (req, res) => {
  const newComment = new Comment({
    userId: req.body.userId,
    videoId: req.body.videoId,
    text: req.body.text
  });

  try {
    const comment = await newComment.save();
    res.status(201).json(comment);
  } catch (err) {
    console.log(err);
    res.status(500).send('Error creating comment');
  }
};

// PUT /comments/:id - Update comment by ID
exports.updateComment = async (req, res) => {
  try {
    const comment = await Comment.findByIdAndUpdate(req.params.id, { text: req.body.text }, { new: true });
    res.status(200).json(comment);
  } catch (err) {
    console.log(err);
    res.status(500).send('Error updating comment');
  }
};

// DELETE /comments/:id - Delete comment by ID
exports.deleteComment = async (req, res) => {
  try {
    await Comment.findByIdAndDelete(req.params.id);
    res.status(200).send('Comment deleted successfully');
  } catch (err) {
    console.log(err);
    res.status(500).send('Error deleting comment');
  }
};
