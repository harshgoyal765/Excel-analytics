const mongoose = require('mongoose');

const uploadHistorySchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  file_name: { type: String, required: true },
  upload_date: { type: Date, default: Date.now },
  file_path: { type: String, required: true },
  parsed_data: [{}],
},
{ timestamps: true });

module.exports = mongoose.model('UploadHistory', uploadHistorySchema);