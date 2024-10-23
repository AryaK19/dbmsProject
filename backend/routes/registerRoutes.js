const express = require('express');
const db = require('../config/database'); // Adjust the path as needed

const router = express.Router();

// Register a user for a hackathon
router.post('/hackathons/:hackathonId/register', (req, res) => {
  const { hackathonId } = req.params;
  const { user_id } = req.body;
  const query = `
    INSERT INTO registrations (user_id, hackathon_id, status)
    VALUES (?, ?, 'registered')
  `;

  db.query(query, [user_id, hackathonId], (err, result) => {
    if (err) {
      console.error('Error registering for hackathon:', err);
      res.status(500).send('Error registering for hackathon');
      return;
    }
    res.send('Registered successfully');
  });
});

// Check if a user is registered for a hackathon
router.get('/hackathons/:hackathonId/isRegistered', (req, res) => {
  const { hackathonId } = req.params;
  const { user_id } = req.query;
  const query = `
    SELECT * FROM registrations
    WHERE user_id = ? AND hackathon_id = ?
  `;

  db.query(query, [user_id, hackathonId], (err, results) => {
    if (err) {
      console.error('Error checking registration:', err);
      res.status(500).send('Error checking registration');
      return;
    }
    res.json({ isRegistered: results.length > 0 });
  });
});

module.exports = router;