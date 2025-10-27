const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');

dotenv.config();

const app = express();

connectDB();

app.use(cors());
app.use(helmet());
app.use(compression());
app.use(express.json({ extended: false }));

app.use('/api/auth', require('./routes/auth'));
app.use('/api/profiles', require('./routes/profiles'));
app.use('/api/stories', require('./routes/stories'));
app.use('/api/analytics', require('./routes/analytics'));

app.get('/api/health', (req, res) => res.status(200).send('OK'));

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
