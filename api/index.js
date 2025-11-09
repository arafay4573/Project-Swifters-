const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const storyRoutes = require('./routes/storyRoutes');
const audioRoutes = require('./routes/audioRoutes');
const videoRoutes = require('./routes/videoRoutes');
const paddleRoutes = require('./routes/paddleRoutes');

dotenv.config();

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/stories', storyRoutes);
app.use('/api/audio', audioRoutes);
app.use('/api/video', videoRoutes);
app.use('/api/paddle', paddleRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to Project Swifters API');
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on port ${process.env.PORT || 5000}`);
})

module.exports = app;
