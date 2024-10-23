const express = require("express");
const db = require("../config/database"); // Adjust the path as needed

const router = express.Router();

// Fetch images for a hackathon
router.get("/hackathons/:hackathonId/gallery", (req, res) => {
  const { hackathonId } = req.params;
  const query = `
    SELECT * FROM gallery
    WHERE hackathon_id = ?
  `;

  db.query(query, [hackathonId], (err, results) => {
    if (err) {
      console.error("Error fetching gallery images:", err);
      res.status(500).send("Error fetching gallery images");
      return;
    }
    res.json(results);
  });
});

router.post('/hackathons/:hackathonId/gallery', (req, res) => {
  const { hackathonId } = req.params;
  const { imageUrls } = req.body; // Expecting an array of image URLs

  const values = imageUrls.map(url => [hackathonId, url]);
  const query = 'INSERT INTO gallery (hackathon_id, image_url) VALUES ?';

  db.query(query, [values], (err, result) => {
    if (err) {
      console.error('Error adding images to gallery:', err);
      res.status(500).send('Error adding images to gallery');
      return;
    }
    res.send('Images added to gallery successfully');
  });
});

module.exports = router;