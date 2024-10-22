const express = require("express");
const db = require("../config/database"); // Adjust the path as needed

const router = express.Router();

// Fetch comments for a hackathon
router.get("/hackathons/:hackathonId/comments", (req, res) => {
  const { hackathonId } = req.params;
  const query = `
    SELECT c.id AS comment_id, c.content, cr.reply 
    FROM comments c
    LEFT JOIN comments_reply cr ON c.id = cr.comment_id
    WHERE c.hackathon_id = ?
  `;

  db.query(query, [hackathonId], (err, results) => {
    if (err) {
      console.error("Error fetching comments:", err);
      res.status(500).send("Error fetching comments");
      return;
    }

    // Group replies under their respective comments
    const comments = {};
    results.forEach(row => {
      if (!comments[row.comment_id]) {
        comments[row.comment_id] = {
          id: row.comment_id,
          content: row.content,
          replies: []
        };
      }
      if (row.reply) {
        comments[row.comment_id].replies.push({
          reply: row.reply
        });
      }
    });

    res.json(Object.values(comments));
  });
});

// Post a new comment
router.post("/hackathons/:hackathonId/comments", (req, res) => {
  const { hackathonId } = req.params;
  const { content, user_id } = req.body;
  const query = `
    INSERT INTO comments (content, user_id, hackathon_id)
    VALUES (?, ?, ?)
  `;

  db.query(query, [content, user_id, hackathonId], (err, result) => {
    if (err) {
      console.error("Error posting comment:", err);
      res.status(500).send("Error posting comment");
      return;
    }
    res.json({
      id: result.insertId,
      content,
      user_id,
      hackathon_id: hackathonId,
    });
  });
});

// Post a reply to a comment
router.post("/comments/:commentId/replies", (req, res) => {
  const { commentId } = req.params;
  const { reply } = req.body;
  const query = `
    INSERT INTO comments_reply (comment_id, reply)
    VALUES (?, ?)
  `;

  db.query(query, [commentId, reply], (err, result) => {
    if (err) {
      console.error("Error posting reply:", err);
      res.status(500).send("Error posting reply");
      return;
    }
    res.json({ comment_id: commentId, reply });
  });
});

module.exports = router;