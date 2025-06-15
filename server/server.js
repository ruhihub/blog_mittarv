// // require('dotenv').config();
// // const express = require('express');
// // const bodyParser = require('body-parser');
// // const mongoose = require('mongoose');
// // const cors = require('cors');
// // const connectDB = require('./config/db');

// // const authRoutes = require('./routes/authRoutes');
// // const postRoutes = require('./routes/postRoutes');

// // const app = express();
// // connectDB();

// // app.use(cors({
// //     origin: ['http://localhost:3000', 'http://localhost:5173']
// // }));
// // app.use(express.json());
// // app.use(bodyParser.json());

// // // app.use('/api/auth', authRoutes);
// // app.use("/api/auth", authRoutes);
// // app.use('/api/posts', postRoutes);

// // const PORT = process.env.PORT || 5000;
// // app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


// require('dotenv').config();
// const express = require('express');
// const bodyParser = require('body-parser');
// const mongoose = require('mongoose');
// // const cors = require('cors');
// const connectDB = require('./config/db');

// const authRoutes = require('./routes/authRoutes');
// const postRoutes = require('./routes/postRoutes');

// const app = express();
// connectDB();

// // CORS setup
// const cors = require('cors');

// app.use(cors({
//   origin: 'http://localhost:5173', // your frontend URL
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   credentials: true // allow cookies, authorization headers, etc.
// }));

// // app.options('*', cors()); // allow preflight

// // Middleware
// app.use(express.json());
// app.use(bodyParser.json());

// // Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/posts', postRoutes);

// // Server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

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
    origin: ['http://localhost:5173'], // your frontend
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
