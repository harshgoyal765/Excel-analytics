const mongoose = require('mongoose');

const aiInsightsSchema = new mongoose.Schema({
  analysis_id: { type: mongoose.Schema.Types.ObjectId, ref: 'AnalysisResults', required: true },
  insight_text: { type: String, required: true },
  generated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.models.AIInsights || mongoose.model('AIInsights', aiInsightsSchema);
