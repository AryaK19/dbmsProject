const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../config/database'); // Adjust the path as needed

const router = express.Router();

router.post('/admins', async (req, res) => {
  const { name, email, password, contact } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const checkAdminQuery = 'SELECT * FROM admins WHERE email = ?';
  const insertAdminQuery = 'INSERT INTO admins (name, email, password, contact) VALUES (?, ?, ?, ?)';

  db.query(checkAdminQuery, [email], (err, results) => {
    if (err) {
      console.error('Error checking admin:', err);
      res.json({ success: false, message: 'Error checking admin' });
      return;
    }

    if (results.length > 0) {
      res.json({ success: false, message: 'Admin already exists' });
    } else {
      db.query(insertAdminQuery, [name, email, hashedPassword, contact], (err, result) => {
        if (err) {
          console.error('Error inserting admin:', err);
          res.json({ success: false, message: 'Error inserting admin' });
          return;
        }
        res.json({ success: true, message: 'Admin created' });
      });
    }
  });
});

module.exports = router;