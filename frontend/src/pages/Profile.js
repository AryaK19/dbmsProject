import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [hackathons, setHackathons] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    profile_image: '',
    DOB: ''
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      const userId = localStorage.getItem('userId'); // Assuming userId is stored in localStorage
      const userResponse = await axios.get(`http://localhost:3001/users/${userId}`);
      setUser(userResponse.data);
      setFormData({
        name: userResponse.data.name,
        email: userResponse.data.email,
        profile_image: userResponse.data.profile_image,
        DOB: userResponse.data.DOB
      });

      const hackathonsResponse = await axios.get(`http://localhost:3001/users/${userId}/hackathons`);
      setHackathons(hackathonsResponse.data);
    };

    fetchUserProfile();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem('userId');
    await axios.put(`http://localhost:3001/users/${userId}`, formData);
    setEditMode(false);
    const userResponse = await axios.get(`http://localhost:3001/users/${userId}`);
    setUser(userResponse.data);
  };

  return (
    <div className="p-4 bg-black min-h-screen">
      <Navbar />
      <main className="bg-gray-900 p-6 rounded-lg shadow-lg mt-24">
        <h2 className="text-2xl font-semibold mb-4" style={{ color: '#3cd7b8' }}>Profile</h2>
        {user && (
          <div>
            {editMode ? (
              <form onSubmit={handleFormSubmit}>
                <div>
                  <label>Name:</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label>Email:</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label>Profile Image URL:</label>
                  <input
                    type="text"
                    name="profile_image"
                    value={formData.profile_image}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label>Date of Birth:</label>
                  <input
                    type="date"
                    name="DOB"
                    value={formData.DOB}
                    onChange={handleInputChange}
                  />
                </div>
                <button type="submit">Save</button>
                <button type="button" onClick={() => setEditMode(false)}>Cancel</button>
              </form>
            ) : (
              <div>
                <p>Name: {user.name}</p>
                <p>Email: {user.email}</p>
                <img src={user.profile_image} alt="Profile" />
                <p>Date of Birth: {user.DOB}</p>
                <button onClick={() => setEditMode(true)}>Edit Profile</button>
              </div>
            )}
          </div>
        )}
        {/* <h3 className="text-xl font-semibold mb-4" style={{ color: '#3cd7b8' }}>Registered Hackathons</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {hackathons.map(registration => (
            <div key={registration.Hackathon.id} className="bg-gray-800 p-4 rounded-lg shadow-inner">
              <img src={registration.Hackathon.image_url} alt={registration.Hackathon.name} className="w-full h-64 object-cover rounded-lg mb-4" />
              <h3 className="text-lg font-semibold mb-2" style={{ color: '#3cd7b8' }}>{registration.Hackathon.name}</h3>
              <p className="text-gray-300">{registration.Hackathon.description}</p>
            </div>
          ))}
        </div> */}
      </main>
    </div>
  );
};

export default Profile;