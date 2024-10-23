const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../config/database'); // Adjust the path as needed

const router = express.Router();

router.post('/users', async (req, res) => {
  const { name, email, password, dob } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const checkUserQuery = 'SELECT * FROM users WHERE email = ?';
  const insertUserQuery = 'INSERT INTO users (name, email, password, DOB) VALUES (?, ?, ?, ?)';

  db.query(checkUserQuery, [email], (err, results) => {
    if (err) {
      console.error('Error checking user:', err);
      res.json({ success: false, message: 'Error checking user' });
      return;
    }

    if (results.length > 0) {
      res.json({ success: false, message: 'User already exists' });
    } else {
      db.query(insertUserQuery, [name, email, hashedPassword, dob], (err, result) => {
        if (err) {
          console.error('Error inserting user:', err);
          res.json({ success: false, message: 'Error inserting user' });
          return;
        }
        res.json({ success: true, message: 'User created' });
      });
    }
  });
});

router.get('/users', (req, res) => {
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

router.post('/login', (req, res) => {
  console.log('Login request:', req.body);
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

router.get('/auth/status', async (req, res) => {
  if (req.session.user) {
    const user = req.session.user;
    const isAdmin = req.session.isAdmin || false;
    res.json({ success: true, user, isAdmin });
  } else {
    res.json({ success: false, user: null, isAdmin: false });
  }
});

router.get('/profile/:id', (req, res) => {
  const userId = req.params.id;
  const query = 'SELECT * FROM users WHERE id = ?';

  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error('Error fetching user profile:', err);
      res.send('Error fetching user profile');
      return;
    }

    if (results.length > 0) {
      res.json(results[0]);
    } else {
      res.send('User not found');
    }
  });
});


router.put('/profile/:id', (req, res) => {
  const userId = req.params.id;
  const { name, email, imageUrl, dob } = req.body;
  const query = 'UPDATE users SET name = ?, email = ?, profile_image = ?, DOB = ? WHERE id = ?';

  db.query(query, [name, email, imageUrl, dob, userId], (err, result) => {
    if (err) {
      console.error('Error updating profile:', err);
      res.status(500).send('Error updating profile');
      return;
    }
    res.json({ success: true, message: 'Profile updated' });
  });
});

module.exports = router;