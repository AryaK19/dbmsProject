const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcrypt');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
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

app.post('/users', async (req, res) => {
  const { name, email, password, dob } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const checkUserQuery = 'SELECT * FROM users WHERE email = ?';
  const insertUserQuery = 'INSERT INTO users (name, email, password, DOB) VALUES (?, ?, ?, ?)';

  db.query(checkUserQuery, [email], (err, results) => {
    if (err) {
      console.error('Error checking user:', err);
      res.send('Error checking user');
      return;
    }

    if (results.length > 0) {
      res.json(results[0]);
    } else {
      db.query(insertUserQuery, [name, email, hashedPassword, dob], (err, result) => {
        if (err) {
          console.error('Error inserting user:', err);
          res.send('Error inserting user');
          return;
        }
        res.send('User created');
      });
    }
  });
});

app.get('/users', (req, res) => {
  const query = 'SELECT *, calculate_age(DOB) AS age FROM users';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching users:', err);
      res.send('Error fetching users');
      return;
    }
    res.json(results);
  });
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const adminQuery = 'SELECT * FROM admins WHERE email = ?';
  const userQuery = 'SELECT * FROM users WHERE email = ?';

  db.query(adminQuery, [email], async (err, adminResults) => {
    if (err) {
      console.error('Error fetching admin:', err);
      res.send('Error fetching admin');
      return;
    }

    if (adminResults.length > 0) {
      const admin = adminResults[0];
      const isPasswordValid = await bcrypt.compare(password, admin.password);
      if (isPasswordValid) {
        req.session.user = admin;
        req.session.isAdmin = true;
        res.json({ user: admin, isAdmin: true });
      } else {
        res.send('Invalid credentials');
      }
    } else {
      db.query(userQuery, [email], async (err, userResults) => {
        if (err) {
          console.error('Error fetching user:', err);
          res.send('Error fetching user');
          return;
        }

        if (userResults.length > 0) {
          const user = userResults[0];
          const isPasswordValid = await bcrypt.compare(password, user.password);
          if (isPasswordValid) {
            req.session.user = user;
            req.session.isAdmin = false;
            res.json({ user, isAdmin: false });
          } else {
            res.send('Invalid credentials');
          }
        } else {
          res.send('User not found');
        }
      });
    }
  });
});

app.get('/auth/status', async (req, res) => {
  if (req.session.user) {
    const user = req.session.user;
    const isAdmin = req.session.isAdmin || false;
    res.json({ success: true, user, isAdmin });
  } else {
    res.json({ success: false, user: null, isAdmin: false });
  }
});

app.post('/admins', async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const checkAdminQuery = 'SELECT * FROM admins WHERE email = ?';
  const insertAdminQuery = 'INSERT INTO admins (name, email, password) VALUES (?, ?, ?)';

  db.query(checkAdminQuery, [email], (err, results) => {
    if (err) {
      console.error('Error checking admin:', err);
      res.send('Error checking admin');
      return;
    }

    if (results.length > 0) {
      res.json(results[0]);
    } else {
      db.query(insertAdminQuery, [name, email, hashedPassword], (err, result) => {
        if (err) {
          console.error('Error inserting admin:', err);
          res.send('Error inserting admin');
          return;
        }
        res.send('Admin created');
      });
    }
  });
});

app.post('/hackathons', (req, res) => {
  const { name, description, image_url, organization, participants, date, time, contact_email, contact_phone } = req.body;

  const query = 'INSERT INTO hackathons (name, description, image_url, organization, participants, date, time, contact_email, contact_phone) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
  db.query(query, [name, description, image_url, organization, participants, date, time, contact_email, contact_phone], (err, result) => {
    if (err) {
      console.error('Error inserting hackathon:', err);
      res.send('Error inserting hackathon');
      return;
    }
    res.send('Hackathon created');
  });
});

app.get('/hackathons', (req, res) => {
  const query = 'SELECT * FROM hackathons';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching hackathons:', err);
      res.send('Error fetching hackathons');
      return;
    }
    res.json(results);
  });
});

app.get('/hackathons/:id', (req, res) => {
  const hackathonId = req.params.id;
  const query = 'SELECT * FROM hackathons WHERE id = ?';

  db.query(query, [hackathonId], (err, results) => {
    if (err) {
      console.error('Error fetching hackathon:', err);
      res.send('Error fetching hackathon');
      return;
    }

    if (results.length > 0) {
      res.json(results[0]);
    } else {
      res.send('Hackathon not found');
    }
  });
});

app.delete('/hackathons/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM hackathons WHERE id = ?';
  
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('Error deleting hackathon:', err);
      res.send('Error deleting hackathon');
      return;
    }
    res.send();
  });
});

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
      res.send('Error updating hackathon');
      return;
    }
    res.send('Hackathon updated');
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});