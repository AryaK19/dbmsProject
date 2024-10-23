import React, { useEffect, useState } from 'react';
import { FaUserCircle } from 'react-icons/fa'; // For the profile icon
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../Auth/AuthContext';

const AdminHome = () => {
  const [hackathons, setHackathons] = useState([]);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const getHackathons = async () => {
      try {
         const response = await axios.get(`http://localhost:3001/adminHackathons/${user.id}`)// Call the Axios function
        setHackathons(response.data); // Set the fetched data into state
      } catch (err) {
        console.error('Error fetching hackathons:', err);
      }
    };

    getHackathons();
  }, []);

  const handleNavigate = (id) => {
    navigate(`/admin/hackathon/${id}`); 
  };

  const createNewHackathon = () => {
    navigate('/admin/create-edit-hackathon');
  }

  const goToProfile = () => {
    navigate('/admin/profile');
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Navbar */}
      <nav className="bg-gray-800 p-4 flex justify-between items-center">
        <Link to="/" className="text-white text-lg font-semibold">Admin Dashboard</Link>
        <div className="flex items-center">
          <button 
            className="bg-teal-500 text-white py-2 px-4 rounded-md hover:bg-teal-600 mr-4"
            onClick={createNewHackathon}
          >
            Organise New Hackathon
          </button>
          <FaUserCircle size={40} className="text-gray-300 cursor-pointer" onClick={goToProfile} />
        </div>
      </nav>

      <main className="p-6 rounded-lg shadow-lg mt-8">
        <h2 className="text-2xl font-semibold mb-4 text-center" style={{ color: '#3cd7b8' }}>
          Hackathons Organised till now
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {hackathons.length > 0 ? (
            hackathons.map((hackathon) => (
              <div
                key={hackathon.id}
                className="bg-gray-800 p-4 rounded-lg shadow-inner cursor-pointer"
                onClick={() => handleNavigate(hackathon.id)} // On click, navigate to hackathon page
              >
                <h3 className="text-lg font-semibold mb-2" style={{ color: '#3cd7b8' }}>{hackathon.name}</h3>
                <p className="text-gray-300">{hackathon.description}</p>
              </div>
            ))
          ) : (
            <p className='font-bold text-gray-300'>No hackathons available</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminHome;