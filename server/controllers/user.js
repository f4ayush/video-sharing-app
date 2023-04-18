const User = require('../models/user');
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs")

const secret = 'test';

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const oldUser = await User.findOne({ email });

        if (!oldUser) return res.status(404).json({ message: "User doesn't exist" });

        const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

        if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, { expiresIn: "1h" });

        res.status(200).json({ result: oldUser, token });
    } catch (err) {
        res.status(500).json({ message: "Something went wrong" });
    }
};

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
exports.signUp =  async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const oldUser = await User.findOne({ email });

    if (oldUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await User.create({ name, email, password: hashedPassword });

    const token = jwt.sign({ email: result.email, id: result._id }, secret, { expiresIn: "10h" });

    res.status(201).json({ result, token });
} catch (error) {
    res.status(500).json({ message: "Something went wrong" });

    console.log(error);
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


