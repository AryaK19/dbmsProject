import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { createNewHackathon, fetchHackathons, updateHackathon } from '../service/api';

const CreateEditHackathon = () => {
  const { id } = useParams(); // Get hackathon ID from URL params (if editing)
  const navigate = useNavigate();
  
  const [hackathon, setHackathon] = useState({
    name: '',
    description: '',
    image_url: '',
    organization: '',
    participants: 0,
    date: '',
    time: '',
    contact_email: '',
    contact_phone: '',
  });

  useEffect(() => {
    if (id) {
      const getHackathon = async () => {
        try {
          const data = await fetchHackathons(id);
          setHackathon(data);
        } catch (err) {
          console.error('Error fetching hackathon:', err);
        }
      };

      getHackathon();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHackathon({ ...hackathon, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await updateHackathon(id, hackathon);
      } else {
        await createNewHackathon(hackathon);
      }
      navigate('/admin'); 
    } catch (err) {
      console.error('Error saving hackathon:', err);
    }
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg max-w-3xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">{id ? 'Edit Hackathon' : 'Create Hackathon'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="name">Name</label>
          <input 
            type="text" 
            name="name" 
            id="name" 
            value={hackathon.name} 
            onChange={handleChange} 
            className="w-full border rounded-md p-2" 
            required 
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="description">Description</label>
          <textarea 
            name="description" 
            id="description" 
            value={hackathon.description} 
            onChange={handleChange} 
            className="w-full border rounded-md p-2" 
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="image_url">Image URL</label>
          <input 
            type="text" 
            name="image_url" 
            id="image_url" 
            value={hackathon.image_url} 
            onChange={handleChange} 
            className="w-full border rounded-md p-2" 
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="organization">Organization</label>
          <input 
            type="text" 
            name="organization" 
            id="organization" 
            value={hackathon.organization} 
            onChange={handleChange} 
            className="w-full border rounded-md p-2" 
            required 
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="participants">Participants</label>
          <input 
            type="number" 
            name="participants" 
            id="participants" 
            value={hackathon.participants} 
            onChange={handleChange} 
            className="w-full border rounded-md p-2" 
            required 
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="date">Date</label>
          <input 
            type="date" 
            name="date" 
            id="date" 
            value={hackathon.date} 
            onChange={handleChange} 
            className="w-full border rounded-md p-2" 
            required 
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="time">Time</label>
          <input 
            type="text" 
            name="time" 
            id="time" 
            value={hackathon.time} 
            onChange={handleChange} 
            className="w-full border rounded-md p-2" 
            required 
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="contact_email">Contact Email</label>
          <input 
            type="email" 
            name="contact_email" 
            id="contact_email" 
            value={hackathon.contact_email} 
            onChange={handleChange} 
            className="w-full border rounded-md p-2" 
            required 
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="contact_phone">Contact Phone</label>
          <input 
            type="text" 
            name="contact_phone" 
            id="contact_phone" 
            value={hackathon.contact_phone} 
            onChange={handleChange} 
            className="w-full border rounded-md p-2" 
            required 
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
          {id ? 'Update Hackathon' : 'Create Hackathon'}
        </button>
      </form>
    </div>
  );
};

export default CreateEditHackathon;
