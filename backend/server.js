const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const storyRoutes = require('./routes/storyRoutes');
const audioRoutes = require('./routes/audioRoutes');
const videoRoutes = require('./routes/videoRoutes');
const stripeRoutes = require('./routes/stripeRoutes');

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
app.use('/api/stripe', stripeRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to Project Swifters API');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
