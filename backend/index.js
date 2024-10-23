const express = require('express');
const cors = require('cors');
const session = require('express-session');
const userRoutes = require('./routes/userRoutes.js');
const adminRoutes = require('./routes/adminRoutes.js');
const hackathonRoutes = require('./routes/hackathonRoutes.js');
const commentRoutes = require('./routes/commentRoutes.js');
const registerRoutes = require('./routes/registerRoutes.js');
const galleryRoutes = require('./routes/galleryRoutes.js');
const db = require('./config/database'); // Ensure this is correctly imported
const app = express();
const port = 3001;

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use(session({
  key: 'session_cookie_name',
  secret: 'session_cookie_secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24
  }
}));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/', userRoutes);
app.use('/', adminRoutes);
app.use('/', hackathonRoutes);
app.use('/', commentRoutes);
app.use('/', registerRoutes);
app.use('/', galleryRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});