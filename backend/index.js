const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcrypt');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const app = express();
const port = 3001;

// Middleware
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000', // Allow requests from this origin
  credentials: true // Allow credentials (cookies)
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

// Session store
const sessionStore = new MySQLStore({}, db);

// Session middleware
app.use(session({
  key: 'session_cookie_name',
  secret: 'session_cookie_secret',
  store: sessionStore,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 // 1 day
  }
}));

// Routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// User Routes
app.post('/users', async (req, res) => {
  const { name, email, password, dob } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const checkUserQuery = 'SELECT * FROM users WHERE email = ?';
  const insertUserQuery = 'INSERT INTO users (name, email, password, DOB) VALUES (?, ?, ?, ?)';

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
      db.query(insertUserQuery, [name, email, hashedPassword, dob], (err, result) => {
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
  const query = 'SELECT *, calculate_age(DOB) AS age FROM users';
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
  const { email, password } = req.body;
  const adminQuery = 'SELECT * FROM admins WHERE email = ?';
  const userQuery = 'SELECT * FROM users WHERE email = ?';

  // First, check if the user is an admin
  db.query(adminQuery, [email], async (err, adminResults) => {
    if (err) {
      console.error('Error fetching admin:', err);
      res.status(500).send('Error fetching admin');
      return;
    }

    if (adminResults.length > 0) {
      const admin = adminResults[0];
      const isPasswordValid = await bcrypt.compare(password, admin.password);
      if (isPasswordValid) {
        req.session.user = admin; // Save admin in session
        req.session.isAdmin = true; // Mark as admin
        res.status(200).json({ user: admin, isAdmin: true });
      } else {
        res.status(401).send('Invalid credentials');
      }
    } else {
      // If not an admin, check if the user is a regular user
      db.query(userQuery, [email], async (err, userResults) => {
        if (err) {
          console.error('Error fetching user:', err);
          res.status(500).send('Error fetching user');
          return;
        }

        if (userResults.length > 0) {
          const user = userResults[0];
          const isPasswordValid = await bcrypt.compare(password, user.password);
          if (isPasswordValid) {
            req.session.user = user; // Save user in session
            req.session.isAdmin = false; // Mark as non-admin
            res.status(200).json({ user, isAdmin: false });
          } else {
            res.status(401).send('Invalid credentials');
          }
        } else {
          res.status(404).send('User not found');
        }
      });
    }
  });
});

app.get('/auth/status', async (req, res) => {
  if (req.session.user) {
    const user = req.session.user;
    const isAdmin = req.session.isAdmin || false;
    res.status(200).json({ user, isAdmin });
  } else {
    res.status(200).json({ user: null, isAdmin: false });
  }
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

// Get hackathon by ID
app.get('/hackathons/:id', (req, res) => {
  const hackathonId = req.params.id;
  const query = 'SELECT * FROM hackathons WHERE id = ?'; // Assuming 'id' is the column name in the database

  db.query(query, [hackathonId], (err, results) => {
    if (err) {
      console.error('Error fetching hackathon:', err);
      res.status(500).send('Error fetching hackathon');
      return;
    }

    if (results.length > 0) {
      res.status(200).json(results[0]); // Return the specific hackathon
    } else {
      res.status(404).send('Hackathon not found');
    }
  });
});

// Delete hackathon by ID
app.delete('/hackathons/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM hackathons WHERE id = ?';
  
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('Error deleting hackathon:', err);
      return res.status(500).send('Error deleting hackathon');
    }
    res.status(204).send(); // No content
  });
});

// Update hackathon by ID
app.put('/hackathons/:id', (req, res) => {
  const { id } = req.params;
  const { name, description, image_url, organization, participants, date, time, contact_email, contact_phone } = req.body;

  const query = `
    UPDATE hackathons 
    SET name = ?, description = ?, image_url = ?, organization = ?, participants = ?, date = ?, time = ?, contact_email = ?, contact_phone = ? 
    WHERE id = ?
  `;

  db.query(query, [name, description, image_url, organization, participants, date, time, contact_email, contact_phone, id], (err, result) => {
    if (err) {
      console.error('Error updating hackathon:', err);
      return res.status(500).send('Error updating hackathon');
    }
    res.status(200).send('Hackathon updated');
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});