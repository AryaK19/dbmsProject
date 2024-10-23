import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../Auth/AuthContext";

const Hackathon = () => {
  const { id } = useParams();
  const [hackathon, setHackathon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [newReply, setNewReply] = useState({});
  const [isRegistered, setIsRegistered] = useState(false);
  const [gallery, setGallery] = useState([]);
  const { user: authUser } = useAuth();

  const fetchHackathon = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/hackathons/${id}`,
        { withCredentials: true }
      );
      setHackathon(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching hackathon:", error);
      setError("Error fetching hackathon");
      setLoading(false);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/hackathons/${id}/comments`,
        { withCredentials: true }
      );
      setComments(response.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const fetchGallery = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/hackathons/${id}/gallery`,
        { withCredentials: true }
      );
      setGallery(response.data);
    } catch (error) {
      console.error("Error fetching gallery images:", error);
    }
  };

  const checkRegistration = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/hackathons/${id}/isRegistered`,
        {
          params: { user_id: authUser.id },
          withCredentials: true,
        }
      );
      setIsRegistered(response.data.isRegistered);
    } catch (error) {
      console.error("Error checking registration:", error);
    }
  };

  useEffect(() => {
    fetchHackathon();
    fetchComments();
    fetchGallery();
    checkRegistration();
  }, [id]);

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleReplyChange = (commentId, e) => {
    setNewReply({ ...newReply, [commentId]: e.target.value });
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `http://localhost:3001/hackathons/${id}/comments`,
        {
          content: newComment,
          user_id: authUser.id,
        },
        { withCredentials: true }
      );
      setNewComment("");
      fetchComments(); // Refetch comments after posting a new comment
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  const handleReplySubmit = async (commentId, e) => {
    e.preventDefault();
    try {
      await axios.post(
        `http://localhost:3001/comments/${commentId}/replies`,
        {
          reply: newReply[commentId],
        },
        { withCredentials: true }
      );
      setNewReply({ ...newReply, [commentId]: "" });
      fetchComments(); // Refetch comments after posting a new reply
    } catch (error) {
      console.error("Error posting reply:", error);
    }
  };

  const handleRegister = async () => {
    try {
      await axios.post(
        `http://localhost:3001/hackathons/${id}/register`,
        { user_id: authUser.id },
        { withCredentials: true }
      );
      setIsRegistered(true);
    } catch (error) {
      console.error("Error registering for hackathon:", error);
    }
  };

  if (loading) {
    return <div className="text-white">Loading...</div>;
  }

  if (error) {
    return <div className="text-white">{error}</div>;
  }

  if (!hackathon) {
    return <div className="text-white">Hackathon not found</div>;
  }

  // Ensure hackathon object has all necessary properties
  const {
    image_url = "",
    name = "",
    organization = "",
    description = "",
    contact_email = "",
    contact_phone = "",
    participants = 0,
    date = "",
  } = hackathon;

  return (
    <div className="container mx-auto flex flex-col md:flex-row gap-4 mt-24">
      {/* Left Container */}
      <div className="md:w-2/3  p-6 rounded-lg shadow-lg">
        <div className="md:w-4/3 bg-gray-900 p-6 rounded-lg shadow">
          <img
            src={image_url}
            alt={name}
            className="w-full h-64 object-cover rounded-lg mb-4"
          />
          <h1 className="text-4xl font-bold mb-4" style={{ color: "#3cd7b8" }}>
            {name}
          </h1>
          <h2 className="text-2xl font-semibold mb-2">
            Organized by {organization}
          </h2>
          <p className="text-gray-300 mb-4">{description}</p>
          {!isRegistered ? (
            <button
              onClick={handleRegister}
              className="mt-4 bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600"
            >
              Participate
            </button>
          ) : (
            <p className="mt-4 text-teal-500">You have already participated in this hackathon.</p>
          )}
        </div>
        {/* Gallery Section */}
        <div className="md:w-4/3 bg-gray-900 p-6 rounded-lg shadow-lg mt-8">
          <h2
            className="text-2xl font-semibold mb-4"
            style={{ color: "#3cd7b8" }}
          >
            Gallery
          </h2>
          <div className="flex overflow-x-scroll space-x-4">
            {gallery.map((image) => (
              <img
                key={image.id}
                src={image.image_url}
                alt="Hackathon"
                className="w-64 h-64 object-cover rounded-lg"
              />
            ))}
          </div>
        </div>
        {/* Comments Section */}
        <div className="md:w-4/3 bg-gray-900 p-6 rounded-lg shadow-lg mt-8">
          <h2
            className="text-2xl font-semibold mb-4"
            style={{ color: "#3cd7b8" }}
          >
            Comments
          </h2>
          {comments.map((comment) => (
            <div key={comment.id} className="mb-4">
              <p className="text-gray-300">{comment.content}</p>
              {comment.replies &&
                comment.replies.map((reply, index) => (
                  <div key={index} className="ml-4 mt-2">
                    <p className="text-gray-400">{reply.reply}</p>
                  </div>
                ))}
              <form
                onSubmit={(e) => handleReplySubmit(comment.id, e)}
                className="mt-2 flex items-center"
              >
                <textarea
                  value={newReply[comment.id] || ""}
                  onChange={(e) => handleReplyChange(comment.id, e)}
                  className="w-full p-1 rounded bg-gray-800 text-white mb-1 text-sm"
                  placeholder="Add a reply..."
                  rows="1"
                />
                <button
                  type="submit"
                  className="bg-teal-500 text-white px-2 py-1 rounded hover:bg-teal-600 text-xs ml-2"
                >
                  Reply
                </button>
              </form>
            </div>
          ))}
          <form onSubmit={handleCommentSubmit} className="mt-4">
            <textarea
              value={newComment}
              onChange={handleCommentChange}
              className="w-full p-2 rounded bg-gray-800 text-white mb-2"
              placeholder="Add a comment..."
            />
            <button
              type="submit"
              className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600"
            >
              Post Comment
            </button>
          </form>
        </div>
      </div>

      {/* Right Container */}
      <div className="md:w-1/4 bg-gray-800 p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold mb-2">Contact Details</h3>
        <p className="text-gray-300 mb-4">Email: {contact_email}</p>
        <p className="text-gray-300 mb-4">Phone: {contact_phone}</p>
        <h3 className="text-xl font-semibold mb-2">Participants</h3>
        <p className="text-gray-300 mb-4">{participants} participants</p>
        <h3 className="text-xl font-semibold mb-2">Date</h3>
        <p className="text-gray-300 mb-4">{date}</p>
      </div>
    </div>
  );
};

export default Hackathon;