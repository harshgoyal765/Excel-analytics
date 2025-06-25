const AIInsights = require('../models/AIInsights');

exports.saveInsight = async (req, res) => {
  const { analysis_id, insight_text } = req.body;

  const insight = new AIInsights({ analysis_id, insight_text });

  try {
    await insight.save();
    res.status(201).send('Insight saved');
  } catch (error) {
    console.error(error);
    res.status(400).send('Error saving insight');
  }
};

exports.getInsights = async (req, res) => {
  try {
    const insights = await AIInsights.find().populate('analysis_id');
    res.status(200).send(insights);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching insights');
  }
};
