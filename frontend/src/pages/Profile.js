import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../Auth/AuthContext';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user: authUser } = useAuth();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/profile/${authUser.id}`, { withCredentials: true });
        setUser(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching profile:', error);
        setError('Error fetching profile');
        setLoading(false);
      }
    };

    fetchProfile();
  }, [authUser.id]);

  const handleEdit = () => {
    navigate('/student/edit-profile');
  };

  if (loading) {
    return <div className="text-white">Loading...</div>;
  }

  if (error) {
    return <div className="text-white">{error}</div>;
  }

  if (!user) {
    return <div className="text-white">User not found</div>;
  }

  return (
    <div className="container mx-auto flex flex-col md:flex-row gap-4 mt-24">
      {/* Left Container */}
      <div className="md:w-2/3 bg-gray-900 p-6 rounded-lg shadow-lg">
        <img
          src={user.imageUrl || 'https://via.placeholder.com/600x400'}
          alt={user.name}
          className="w-full h-64 object-cover rounded-lg mb-4"
        />
        <h1 className="text-4xl font-bold mb-4" style={{ color: '#3cd7b8' }}>
          {user.name}
        </h1>
        <h2 className="text-2xl font-semibold mb-2">Email</h2>
        <p className="text-gray-300 mb-4">{user.email}</p>
        <h3 className="text-xl font-semibold mb-2">Bio</h3>
        <p className="text-gray-300 mb-4">{user.bio || 'No bio available'}</p>
        <button onClick={handleEdit} className="mt-4 bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600">
          Update Details
        </button>
      </div>

      {/* Right Container */}
      <div className="md:w-1/4 bg-gray-800 p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold mb-2">Contact Details</h3>
        <p className="text-gray-300 mb-4">Phone: {user.phone || 'No phone available'}</p>
        <h3 className="text-xl font-semibold mb-2">Location</h3>
        <p className="text-gray-300 mb-4">{user.location || 'No location available'}</p>
      </div>
    </div>
  );
};

export default Profile;