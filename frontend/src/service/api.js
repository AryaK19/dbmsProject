import axios from 'axios';

const API_URL = "http://localhost:3001";

// Function to get the list of hackathons
export const fetchHackathons = async (id = null) => {
  try {
    const url = id ? `${API_URL}/adminHackathons/${id}` : `${API_URL}/hackathons`; // Conditionally set URL
    const response = await axios.get(url);
    return response.data; // Return the data directly
  } catch (error) {
    console.error('Error fetching hackathons:', error);
    throw error; // Throw the error to be handled in the calling component
  }
};

export const createNewHackathon = async (hackathonData) => {
  try {
    const response = await axios.post(`${API_URL}/hackathons`, hackathonData);
    return response.data; // Return the created hackathon data
  } catch (err) {
    console.error('Error creating hackathon:', err);
    throw err; // Propagate the error
  }
};

export const updateHackathon = async (id, hackathon) => {
  const response = await axios.put(`${API_URL}/hackathons/${id}`, hackathon);
  return response.data;
};

export const deleteHackathon = async (id) => {
  await axios.delete(`${API_URL}/hackathons/${id}`);
};

// Function to add image URLs to the gallery
export const addImagesToGallery = async (hackathonId, imageUrls) => {
  try {
    const response = await axios.post(`${API_URL}/hackathons/${hackathonId}/gallery`, { imageUrls });
    return response.data; // Return the response data
  } catch (err) {
    console.error('Error adding images to gallery:', err);
    throw err; // Propagate the error
  }
};