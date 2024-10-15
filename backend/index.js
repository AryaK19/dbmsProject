const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();
const port = 3001;

// Middleware
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000' // Allow requests from this origin
}));

// MySQL connection
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

// Routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// User Routes
app.post('/users', (req, res) => {
  const { name, email, profile_image } = req.body;
  const checkUserQuery = 'SELECT * FROM users WHERE email = ?';
  const insertUserQuery = 'INSERT INTO users (name, email, profile_image) VALUES (?, ?, ?)';

  db.query(checkUserQuery, [email], (err, results) => {
    if (err) {
      console.error('Error checking user:', err);
      res.status(500).send('Error checking user');
      return;
    }

    if (results.length > 0) {
      // User already exists
      res.status(200).json(results[0]);
    } else {
      // Insert new user
      db.query(insertUserQuery, [name, email, profile_image], (err, result) => {
        if (err) {
          console.error('Error inserting user:', err);
          res.status(500).send('Error inserting user');
          return;
        }
        res.status(201).send('User created');
      });
    }
  });
});

app.get('/users', (req, res) => {
  const query = 'SELECT * FROM users';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching users:', err);
      res.status(500).send('Error fetching users');
      return;
    }
    res.status(200).json(results);
  });
});

app.post('/login', (req, res) => {
  const { email } = req.body;
  const query = 'SELECT * FROM users WHERE email = ?';
  db.query(query, [email], (err, results) => {
    if (err) {
      console.error('Error fetching user:', err);
      res.status(500).send('Error fetching user');
      return;
    }
    if (results.length > 0) {
      res.status(200).json(results[0]);
    } else {
      res.status(404).send('User not found');
    }
  });
});

// Hackathon Routes
app.post('/hackathons', (req, res) => {
  const { name, description, image_url, organization, participants, date, time, contact_email, contact_phone } = req.body;
  const query = 'INSERT INTO hackathons (name, description, image_url, organization, participants, date, time, contact_email, contact_phone) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
  db.query(query, [name, description, image_url, organization, participants, date, time, contact_email, contact_phone], (err, result) => {
    if (err) {
      console.error('Error inserting hackathon:', err);
      res.status(500).send('Error inserting hackathon');
      return;
    }
    res.status(201).send('Hackathon created');
  });
});

app.get('/hackathons', (req, res) => {
  const query = 'SELECT * FROM hackathons';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching hackathons:', err);
      res.status(500).send('Error fetching hackathons');
      return;
    }
    res.status(200).json(results);
  });
});
// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});