const User = require('../models/User');
const jwt = require('jsonwebtoken');

const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  console.log(req.body)
  try {
    const user = await User.create({ name, email, password });
    res.status(201).json({ _id: user._id, name: user.name, email: user.email, token: generateToken(user._id) });
    console.log("agasgdha")
  } catch (error) {
    res.status(400).json({ message: 'Error creating user', error });
  }
};

const authUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.json({ _id: user._id, name: user.name, email: user.email, token: generateToken(user._id) });
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
};

module.exports = { registerUser, authUser };
