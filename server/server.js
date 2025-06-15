

require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const connectDB = require('./config/db');

const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');

const app = express();
connectDB();

app.use(cors({
    origin: ['http://localhost:5173','https://blog-mittarv.onrender.com'], // your frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'] // allow JWT header
  }));
app.use(express.json());
app.use(bodyParser.json());

// app.use('/api/auth', authRoutes);
app.use("/api/auth", authRoutes);
app.use('/api/posts', postRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
