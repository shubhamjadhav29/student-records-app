const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const studentRoutes = require('./routes/students');

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/studentDB')
  .then(() => console.log('MongoDB connected ✅'))
  .catch(err => console.error('MongoDB Error ❌:', err));

// ✅ Middlewares
app.use(cors()); // Only ONE declaration here
app.use(express.json());

// ✅ Routes
app.use('/api/students', studentRoutes);

module.exports = app;
