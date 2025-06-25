const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.register = async (req, res) => {
  const { username, password, email, firstName, lastName, address, country, state, city, pincode } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).send('User already exists');

    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    const user = new User({ username, email, password_hash,firstName,
  lastName,
  address,
  country,
  state,
  city,
  pincode });
    await user.save();

    const token = jwt.sign({ userId: user._id, role:user.role }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    res.status(201).json({
      message: 'User registered',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName, 
        address: user.address, 
        country: user.country, 
        state: state, 
        city: user.city, 
        pincode: user.pincode
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};

exports.getUser = async (req, res) => {
  try {
    const users = await User.find().select('-password_hash');
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send('Error fetching users');
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid email or password' });

    
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' });

    
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
