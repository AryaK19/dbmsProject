import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { createNewHackathon, fetchHackathons, updateHackathon, addImagesToGallery } from '../service/api';
import { useAuth } from '../Auth/AuthContext';

const CreateEditHackathon = () => {
  const { id } = useParams(); // Get hackathon ID from URL params (if editing)
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [hackathon, setHackathon] = useState({
    name: '',
    description: '',
    image_url: '',
    organisation_name: '',
    organisation_email: '',
    date: '',
    admin_id: user.id,
  });

  const [galleryImages, setGalleryImages] = useState(['']); // State to manage gallery images

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

  const handleGalleryChange = (index, value) => {
    const newGalleryImages = [...galleryImages];
    newGalleryImages[index] = value;
    setGalleryImages(newGalleryImages);
  };

  const addGalleryImageField = () => {
    setGalleryImages([...galleryImages, '']);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await updateHackathon(id, hackathon);
        await addImagesToGallery(id, galleryImages); // Ensure images are added when updating
      } else {
        const newHackathon = await createNewHackathon(hackathon);
        await addImagesToGallery(newHackathon.id, galleryImages);
      }
      navigate('/admin'); 
    } catch (err) {
      console.error('Error saving hackathon:', err);
    }
  };

  return (
    <div className="p-6 bg-gray-900 shadow-lg rounded-lg max-w-3xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4 text-white">{id ? 'Edit Hackathon' : 'Create Hackathon'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-300" htmlFor="name">Name</label>
          <input 
            type="text" 
            name="name" 
            id="name" 
            value={hackathon.name} 
            onChange={handleChange} 
            className="w-full border rounded-md p-2 bg-gray-800 text-white" 
            required 
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-300" htmlFor="description">Description</label>
          <textarea 
            name="description" 
            id="description" 
            value={hackathon.description} 
            onChange={handleChange} 
            className="w-full border rounded-md p-2 bg-gray-800 text-white" 
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-300" htmlFor="image_url">Image URL</label>
          <input 
            type="text" 
            name="image_url" 
            id="image_url" 
            value={hackathon.image_url} 
            onChange={handleChange} 
            className="w-full border rounded-md p-2 bg-gray-800 text-white" 
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-300" htmlFor="organisation_name">Organization Name</label>
          <input 
            type="text" 
            name="organisation_name" 
            id="organisation_name" 
            value={hackathon.organisation_name} 
            onChange={handleChange} 
            className="w-full border rounded-md p-2 bg-gray-800 text-white" 
            required 
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-300" htmlFor="organisation_email">Organization Email</label>
          <input 
            type="email" 
            name="organisation_email" 
            id="organisation_email" 
            value={hackathon.organisation_email} 
            onChange={handleChange} 
            className="w-full border rounded-md p-2 bg-gray-800 text-white" 
            required 
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-300" htmlFor="date">Date</label>
          <input 
            type="date" 
            name="date" 
            id="date" 
            value={hackathon.date} 
            onChange={handleChange} 
            className="w-full border rounded-md p-2 bg-gray-800 text-white" 
            required 
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-300" htmlFor="gallery">Gallery Images</label>
          {galleryImages.map((url, index) => (
            <div key={index} className="flex mb-2">
              <input 
                type="text" 
                value={url} 
                onChange={(e) => handleGalleryChange(index, e.target.value)} 
                className="w-full border rounded-md p-2 bg-gray-800 text-white mr-2" 
              />
              <button type="button" onClick={addGalleryImageField} className="bg-teal-500 text-white px-2 py-1 rounded-md hover:bg-teal-600">
                Add
              </button>
            </div>
          ))}
        </div>
        <button type="submit" className="bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600">
          {id ? 'Update Hackathon' : 'Create Hackathon'}
        </button>
      </form>
    </div>
  );
};

export default CreateEditHackathon;