const express = require("express");
const db = require("../config/database"); // Adjust the path as needed

const router = express.Router();

router.post("/hackathons", (req, res) => {
  const {
    name,
    description,
    image_url,
    organisation_name,
    organisation_email,
    date,
    admin_id,
  } = req.body;

  const checkOrganisationQuery =
    "SELECT * FROM organisations WHERE name = ? AND email = ?";
  const insertOrganisationQuery =
    "INSERT INTO organisations (name, email) VALUES (?, ?)";
  const insertHackathonQuery =
    "INSERT INTO hackathons (name, description, image_url, organisation_id, date, admin_id) VALUES (?, ?, ?, ?, ?, ?)";

  db.query(
    checkOrganisationQuery,
    [organisation_name, organisation_email],
    (err, orgResults) => {
      if (err) {
        console.error("Error checking organisation:", err);
        res.send("Error checking organisation");
        return;
      }

      if (orgResults.length > 0) {
        const organisation_id = orgResults[0].id;
        db.query(
          insertHackathonQuery,
          [name, description, image_url, organisation_id, date, admin_id],
          (err, result) => {
            if (err) {
              console.error("Error inserting hackathon:", err);
              res.send("Error inserting hackathon");
              return;
            }
            res.send("Hackathon created");
          }
        );
      } else {
        db.query(
          insertOrganisationQuery,
          [organisation_name, organisation_email],
          (err, orgResult) => {
            if (err) {
              console.error("Error inserting organisation:", err);
              res.send("Error inserting organisation");
              return;
            }
            const organisation_id = orgResult.insertId;
            db.query(
              insertHackathonQuery,
              [name, description, image_url, organisation_id, date, admin_id],
              (err, result) => {
                if (err) {
                  console.error("Error inserting hackathon:", err);
                  res.send("Error inserting hackathon");
                  return;
                }
                res.send("Hackathon created");
              }
            );
          }
        );
      }
    }
  );
});

router.get("/hackathons", (req, res) => {
  const query = "SELECT * FROM hackathons";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching hackathons:", err);
      res.send("Error fetching hackathons");
      return;
    }
    res.json(results);
  });
});

router.get('/hackathons/:id', (req, res) => {
    const hackathonId = req.params.id;
    const query = `
      SELECT h.*, o.name AS organization, o.email AS contact_email, a.contact AS contact_phone, 
             (SELECT COUNT(*) FROM registrations r WHERE r.hackathon_id = h.id) AS participants
      FROM hackathons h
      LEFT JOIN organisations o ON h.organisation_id = o.id
      LEFT JOIN admins a ON h.admin_id = a.id
      WHERE h.id = ?
    `;
  
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

router.delete("/hackathons/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM hackathons WHERE id = ?";

  db.query(query, [id], (err, result) => {
    if (err) {
      console.error("Error deleting hackathon:", err);
      res.send("Error deleting hackathon");
      return;
    }
    res.send();
  });
});

router.put("/hackathons/:id", (req, res) => {
  const { id } = req.params;
  const { name, description, image_url, organisation_id, date, admin_id } =
    req.body;

  const query = `
    UPDATE hackathons 
    SET name = ?, description = ?, image_url = ?, organisation_id = ?, date = ?, admin_id = ? 
    WHERE id = ?
  `;

  db.query(
    query,
    [name, description, image_url, organisation_id, date, admin_id, id],
    (err, result) => {
      if (err) {
        console.error("Error updating hackathon:", err);
        res.send("Error updating hackathon");
        return;
      }
      res.send("Hackathon updated");
    }
  );
});

module.exports = router;
