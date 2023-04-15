const User = require('../models/user');

// GET /users/:id - Get user by ID
exports.getUser =  async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate('videos');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.json(user);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: 'Server error' });
  }
};

// POST /users - Create a new user
exports.createUser =  async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }
    user = new User({ name, email, password });
    await user.save();
    return res.json(user);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: 'Server error' });
  }
};

// PUT /users/:id - Update user by ID
exports.updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const { name, email, password } = req.body;
    user.name = name || user.name;
    user.email = email || user.email;
    user.password = password || user.password;
    await user.save();
    return res.json(user);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: 'Server error' });
  }
};


