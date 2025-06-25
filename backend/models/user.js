const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true},
  password_hash: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  
  country: { type: String, required: true },
  state: { type: String, required: true },
  
  pincode: { type: String, required: true },
  role: { type: String, enum: ['admin', 'user'], default: 'user' },
  uploads: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Upload' }],
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.models.User || mongoose.model('User', userSchema);