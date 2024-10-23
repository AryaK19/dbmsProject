import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchHackathons, deleteHackathon } from '../service/api';

const AdminHackathon = () => {
  const { id } = useParams();
  const [hackathon, setHackathon] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const getHackathon = async () => {
      try {
        const data = await fetchHackathons(id);
        setHackathon(data);
      } catch (err) {
        console.error('Error fetching hackathon:', err);
      }
    };

    getHackathon();
  }, [id]);

  const handleDelete = async () => {
    try {
      await deleteHackathon(id);
      navigate('/admin');
    } catch (err) {
      console.error('Error deleting hackathon:', err);
    }
  };

  const handleEdit = () => {
    navigate(`/admin/create-edit-hackathon/${id}`);
  };

  const handleViewParticipants = () => {
    navigate(`/admin/hackathon/${id}/participants`);
  };

  return (
    <div className="p-6 bg-gray-900 shadow-lg rounded-lg max-w-3xl mx-auto mt-24">
      {hackathon.image_url && (
        <img
          src={hackathon.image_url}
          alt={`${hackathon.name} Image`}
          className="w-full h-64 object-cover rounded-lg mb-4"
        />
      )}
      {hackathon.name && <h3 className="text-2xl font-bold text-white mb-2">{hackathon.name}</h3>}
      {hackathon.description && <p className="text-gray-300 mb-4">{hackathon.description}</p>}

      <div className="text-gray-300">
        {hackathon.organization && <p><span className="font-semibold">Organization:</span> {hackathon.organization}</p>}
        {hackathon.participants && <p><span className="font-semibold">Participants:</span> {hackathon.participants}</p>}
        {hackathon.date && <p><span className="font-semibold">Date:</span> {new Date(hackathon.date).toLocaleDateString()}</p>}
        {hackathon.time && <p><span className="font-semibold">Time:</span> {hackathon.time}</p>}
      </div>

      <div className="mt-4">
        <h4 className="text-lg font-semibold text-white mb-2">Contact Information</h4>
        {hackathon.contact_email && <p><span className="font-semibold">Email:</span> {hackathon.contact_email}</p>}
        {hackathon.contact_phone && <p><span className="font-semibold">Phone:</span> {hackathon.contact_phone}</p>}
      </div>

      <div className="flex space-x-4 mt-4">
        <button onClick={handleEdit} className="bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600">
          Edit
        </button>
        <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
          Delete
        </button>
        <button onClick={handleViewParticipants} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
          View Participants
        </button>
      </div>
    </div>
  );
};

export default AdminHackathon;