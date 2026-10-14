require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const studentRoutes = require('./routes/studentRoutes');

const app = express();

// CORS: only allow your Netlify frontend (comma-separated list supported) + local dev
const allowed = (process.env.FRONTEND_URL || '')
  .split(',').map((s) => s.trim().replace(/\/$/, '')).filter(Boolean);
if (process.env.NODE_ENV !== 'production') {
  allowed.push('http://localhost:3000', 'http://localhost:5500', 'http://127.0.0.1:5500', 'http://localhost:8080');
}

app.use(cors({
  origin(origin, cb) {
    if (!origin || allowed.includes(origin)) return cb(null, true);
    cb(new Error('Not allowed by CORS'));
  }
}));
app.use(express.json());

app.get('/', (req, res) => res.json({ success: true, message: 'Student API is running' }));
app.use('/api/students', studentRoutes);

app.use((req, res) => res.status(404).json({ success: false, message: 'Route not found' }));
app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(err.message === 'Not allowed by CORS' ? 403 : 500)
     .json({ success: false, message: err.message === 'Not allowed by CORS' ? 'CORS blocked' : 'Server error' });
});

const PORT = process.env.PORT || 5000;
connectDB().then(() => app.listen(PORT, () => console.log('API running on port ' + PORT)));
