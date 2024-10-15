import React, { useEffect, useState } from 'react';
import { FaUserCircle } from 'react-icons/fa'; // For the profile icon
import { fetchHackathons } from '../service/api';
import { useNavigate } from 'react-router-dom';

// Placeholder component for AdminHackathon
const AdminHome = () => {
  const [hackathons, setHackathons] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getHackathons = async () => {
      try {
        const data = await fetchHackathons(); // Call the Axios function
        setHackathons(data); // Set the fetched data into state
      } catch (err) {
        console.error('Error fetching hackathons:', err);
      }
    };

    getHackathons(); // Trigger the API call on component mount
  }, []);

  // Function to handle click on a hackathon and navigate to its detail page
  const handleNavigate = (id) => {
    navigate(`/admin/hackathon/${id}`); // Navigate to the dynamic route for the specific hackathon
  };

  const createNewHackathon = () => {
    navigate('/admin/create-edit-hackathon');
  }

  const goToProfile = () => {
    navigate('/admin/profile');
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6 relative">
      {/* Profile Icon */}
      <div className="absolute top-6 right-6" onClick={goToProfile}>
        <FaUserCircle size={40} className="text-gray-600 cursor-pointer" />
      </div>

      {/* Organise Hackathon Button */}
      <div className="text-center mb-8">
        <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600" 
        onClick={createNewHackathon}
        >
          Organise New Hackathon
        </button>
      </div>

      {/* List of Hackathons */}
     
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Hackathons Organised till now
        </h2>
        {hackathons.length > 0 ? (
          hackathons.map((hackathon) => (
            <div
              key={hackathon.id}
              className="p-4 bg-white shadow-md rounded-md mb-4 cursor-pointer"
              onClick={() => handleNavigate(hackathon.id)} // On click, navigate to hackathon page
            >
              <h3 className="text-lg font-bold">{hackathon.name}</h3>
              <p className="text-gray-600">{hackathon.description}</p>
            </div>
          ))
        ) : (
          <p className='font-bold text-gray-800'>No hackathons available</p>
        )}
      </div>
    </div>
  );
};

export default AdminHome;
