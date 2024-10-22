const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcrypt');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const userRoutes = require('./routes/userRoutes.js');
const adminRoutes = require('./routes/adminRoutes.js');
const hackathonRoutes = require('./routes/hackathonRoutes.js');
const commentRoutes = require('./routes/commentRoutes.js');
const app = express();
const port = 3001;

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Jyotikadam@123',
  database: 'hackathon_db'
});

db.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

const sessionStore = new MySQLStore({}, db);

app.use(session({
  key: 'session_cookie_name',
  secret: 'session_cookie_secret',
  store: sessionStore,
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

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});