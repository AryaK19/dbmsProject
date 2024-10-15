import React from 'react';
import { Link } from 'react-router-dom';


const hackathons = [
  { id: 1, name: 'Hackathon 1', description: 'Description for Hackathon 1', imageUrl: 'https://via.placeholder.com/150' },
  { id: 2, name: 'Hackathon 2', description: 'Description for Hackathon 2', imageUrl: 'https://via.placeholder.com/150' },
  { id: 3, name: 'Hackathon 3', description: 'Description for Hackathon 3sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss', imageUrl: 'https://via.placeholder.com/150' },
];

const Home = () => {
  return (

      <main className="bg-gray-900 p-6 rounded-lg shadow-lg mt-24">
        <h2 className="text-2xl font-semibold mb-4" style={{ color: '#3cd7b8' }}>Available Hackathons</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {hackathons.map(hackathon => (
            <div key={hackathon.id} className="bg-gray-800 p-4 rounded-lg shadow-inner">
              <img src={hackathon.imageUrl} alt={hackathon.name} className="w-full h-64 object-cover rounded-lg mb-4" />
              <h3 className="text-lg font-semibold mb-2" style={{ color: '#3cd7b8' }}>{hackathon.name}</h3>
              <p className="text-gray-300">{hackathon.description}</p>
              <Link to={`/hackathon/${hackathon.id}`}>
                <button className="mt-4 bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600">Know More</button>
              </Link>
            </div>
          ))}
        </div>
      </main>

  );
};

export default Home;