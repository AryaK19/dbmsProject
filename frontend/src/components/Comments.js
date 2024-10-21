import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Comment from './Comment';

const Comments = ({ hackathonId }) => {
  const [comments, setComments] = useState([]);
  const [commentContent, setCommentContent] = useState('');

  useEffect(() => {
    const fetchComments = async () => {
      const response = await axios.get(`http://localhost:3001/comments/${hackathonId}`);
      setComments(response.data);
    };

    fetchComments();
  }, [hackathonId]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:3001/comments', {
      content: commentContent,
      user_id: 1, // Replace with actual user ID
      hackathon_id: hackathonId,
    });
    setCommentContent('');
    const response = await axios.get(`http://localhost:3001/comments/${hackathonId}`);
    setComments(response.data);
  };

  return (
    <div className="comments">
      <form onSubmit={handleCommentSubmit}>
        <input
          type="text"
          value={commentContent}
          onChange={(e) => setCommentContent(e.target.value)}
          placeholder="Add a comment"
        />
        <button type="submit">Comment</button>
      </form>
      <div className="comment-list">
        {comments.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  );
};

export default Comments;