import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Comment = ({ comment }) => {
  const [replies, setReplies] = useState([]);
  const [replyContent, setReplyContent] = useState('');

  useEffect(() => {
    const fetchReplies = async () => {
      const response = await axios.get(`http://localhost:3001/comments/replies/${comment.id}`);
      setReplies(response.data);
    };

    fetchReplies();
  }, [comment.id]);

  const handleReplySubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:3001/comments/reply', {
      comment_id: comment.id,
      reply: replyContent,
    });
    setReplyContent('');
    const response = await axios.get(`http://localhost:3001/comments/replies/${comment.id}`);
    setReplies(response.data);
  };

  return (
    <div className="comment">
      <p>{comment.content}</p>
      <form onSubmit={handleReplySubmit}>
        <input
          type="text"
          value={replyContent}
          onChange={(e) => setReplyContent(e.target.value)}
          placeholder="Add a reply"
        />
        <button type="submit">Reply</button>
      </form>
      <div className="replies">
        {replies.map((reply) => (
          <div key={reply.id} className="reply">
            <p>{reply.reply}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comment;