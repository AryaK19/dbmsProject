const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');
const CommentReply = require('../models/CommentReply');

// Create a new comment
router.post('/', async (req, res) => {
  try {
    const { content, user_id, hackathon_id } = req.body;
    const comment = await Comment.create({ content, user_id, hackathon_id });
    res.status(201).json(comment);
  } catch (error) {
    console.error('Error creating comment:', error);
    res.status(500).send('Error creating comment');
  }
});

// Get comments for a hackathon
router.get('/:hackathon_id', async (req, res) => {
  try {
    const { hackathon_id } = req.params;
    const comments = await Comment.findAll({ where: { hackathon_id } });
    res.status(200).json(comments);
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).send('Error fetching comments');
  }
});

// Create a reply to a comment
router.post('/reply', async (req, res) => {
  try {
    const { comment_id, reply } = req.body;
    const commentReply = await CommentReply.create({ comment_id, reply });
    res.status(201).json(commentReply);
  } catch (error) {
    console.error('Error creating reply:', error);
    res.status(500).send('Error creating reply');
  }
});

// Get replies for a comment
router.get('/replies/:comment_id', async (req, res) => {
  try {
    const { comment_id } = req.params;
    const replies = await CommentReply.findAll({ where: { comment_id } });
    res.status(200).json(replies);
  } catch (error) {
    console.error('Error fetching replies:', error);
    res.status(500).send('Error fetching replies');
  }
});

module.exports = router;