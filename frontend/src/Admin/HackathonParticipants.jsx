import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const HackathonParticipants = () => {
  const { id } = useParams();
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/hackathons/${id}/participants`, { withCredentials: true });
        setParticipants(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching participants:', error);
        setError('Error fetching participants');
        setLoading(false);
      }
    };

    fetchParticipants();
  }, [id]);

  if (loading) {
    return <div className="text-white">Loading...</div>;
  }

  if (error) {
    return <div className="text-white">{error}</div>;
  }

  return (
    <div className="p-6 bg-gray-900 shadow-lg rounded-lg max-w-3xl mx-auto mt-24">
      <h1 className="text-4xl font-bold mb-4" style={{ color: '#3cd7b8' }}>Participants</h1>
      <table className="min-w-full bg-gray-800 text-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border border-gray-700">ID</th>
            <th className="py-2 px-4 border border-gray-700">Name</th>
          </tr>
        </thead>
        <tbody>
          {participants.map(participant => (
            <tr key={participant.id}>
              <th className="py-2 px-4 border border-gray-700">{participant.id}</th>
              <th className="py-2 px-4 border border-gray-700">{participant.name}</th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HackathonParticipants;