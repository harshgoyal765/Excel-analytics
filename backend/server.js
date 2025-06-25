const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./Routes/authRoutes');
const uploadRoutes = require('./Routes/uploadRoutes');
const analysisRoutes = require('./Routes/analysisRoutes');
const aiInsightRoutes = require('./Routes/aiInsightRoutes');
const adminRoutes = require('./Routes/adminRoutes')

require('dotenv').config();

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect("mongodb://localhost:27017/excelAnalytics", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch((err) => console.error("MongoDB connection error:", err));
// Routes
app.use('/api/auth', authRoutes);
app.use('/api/uploads', uploadRoutes);
app.use('/api/analyses', analysisRoutes);
app.use('/api/insights', aiInsightRoutes);
app.use('/api/admin',adminRoutes)

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});