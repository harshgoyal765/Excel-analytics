const User = require('../models/user');
const UploadHistory = require('../models/UploadHistory');

exports.getAllUsers = async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Access denied' });
  const users = await User.find().select('-password_hash');
  res.json(users);
};

exports.getAllUploads = async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Access denied' });
  const uploads = await UploadHistory.find().populate('user_id', 'username email');
  res.json(uploads);
};
