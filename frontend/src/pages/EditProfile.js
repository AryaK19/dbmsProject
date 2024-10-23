import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../Auth/AuthContext';
import { useNavigate } from 'react-router-dom';

const EditProfile = () => {
  const { user: authUser } = useAuth();
  const [user, setUser] = useState({
    name: '',
    email: '',
    imageUrl: '',
    dob: '' // Add DOB to the state
  });
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3001/profile/${authUser.id}`, user, { withCredentials: true });
      navigate('/student/profile');
    } catch (error) {
      console.error('Error updating profile:', error);
      setError('Error updating profile');
    }
  };

  if (loading) {
    return <div className="text-white">Loading...</div>;
  }

  if (error) {
    return <div className="text-white">{error}</div>;
  }

  return (
    <div className="container mx-auto flex flex-col md:flex-row gap-4 mt-24">
      <form onSubmit={handleSubmit} className="md:w-2/3 bg-gray-900 p-6 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold mb-4" style={{ color: '#3cd7b8' }}>Edit Profile</h1>
        <div className="mb-4">
          <label className="block text-gray-300 mb-2" htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={user.name}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-800 text-white"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-300 mb-2" htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-800 text-white"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-300 mb-2" htmlFor="imageUrl">Profile Image URL</label>
          <input
            type="text"
            id="imageUrl"
            name="imageUrl"
            value={user.imageUrl}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-800 text-white"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-300 mb-2" htmlFor="dob">Year of Birth</label>
          <input
            type="number"
            id="dob"
            name="dob"
            value={user.dob}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-800 text-white"
          />
        </div>
        <button type="submit" className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditProfile;