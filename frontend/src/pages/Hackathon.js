import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';

const hackathons = [
  { id: 1, name: 'Hackathon 1', description: 'Description for Hackathon 1', imageUrl: 'https://via.placeholder.com/600x400', organization: 'Tech Innovators', rules: ['Rule 1', 'Rule 2', 'Rule 3'], prizes: ['1st Prize: $1000', '2nd Prize: $500', '3rd Prize: $250'], contact: { email: 'contact@hackathon.com', phone: '+1234567890' }, participants: 150, date: '2023-12-01', time: '10:00 AM - 6:00 PM', timetable: ['10:00 AM - Opening Ceremony', '11:00 AM - Coding Begins', '1:00 PM - Lunch Break', '2:00 PM - Coding Resumes', '5:00 PM - Project Submission', '6:00 PM - Closing Ceremony'] },
  { id: 2, name: 'Hackathon 2', description: 'Description for Hackathon 2', imageUrl: 'https://via.placeholder.com/600x400', organization: 'Tech Innovators', rules: ['Rule 1', 'Rule 2', 'Rule 3'], prizes: ['1st Prize: $1000', '2nd Prize: $500', '3rd Prize: $250'], contact: { email: 'contact@hackathon.com', phone: '+1234567890' }, participants: 150, date: '2023-12-01', time: '10:00 AM - 6:00 PM', timetable: ['10:00 AM - Opening Ceremony', '11:00 AM - Coding Begins', '1:00 PM - Lunch Break', '2:00 PM - Coding Resumes', '5:00 PM - Project Submission', '6:00 PM - Closing Ceremony'] },
  { id: 3, name: 'Hackathon 3', description: 'Description for Hackathon 3sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss', imageUrl: 'https://via.placeholder.com/600x400', organization: 'Tech Innovators', rules: ['Rule 1', 'Rule 2', 'Rule 3'], prizes: ['1st Prize: $1000', '2nd Prize: $500', '3rd Prize: $250'], contact: { email: 'contact@hackathon.com', phone: '+1234567890' }, participants: 150, date: '2023-12-01', time: '10:00 AM - 6:00 PM', timetable: ['10:00 AM - Opening Ceremony', '11:00 AM - Coding Begins', '1:00 PM - Lunch Break', '2:00 PM - Coding Resumes', '5:00 PM - Project Submission', '6:00 PM - Closing Ceremony'] },
];

const Hackathon = () => {
  const { id } = useParams();
  const hackathon = hackathons.find(h => h.id === parseInt(id));

  return (
    <div className="p-4 bg-black min-h-screen text-white">
      <Navbar />
      <div className="container mx-auto flex flex-col md:flex-row gap-4 mt-24">
        {/* Left Container */}
        <div className="md:w-2/3 bg-gray-900 p-6 rounded-lg shadow-lg">
          <img src={hackathon.imageUrl} alt={hackathon.name} className="w-full h-64 object-cover rounded-lg mb-4" />
          <h1 className="text-4xl font-bold mb-4" style={{ color: '#3cd7b8' }}>{hackathon.name}</h1>
          <h2 className="text-2xl font-semibold mb-2">Organized by {hackathon.organization}</h2>
          <p className="text-gray-300 mb-4">{hackathon.description}</p>
          <h3 className="text-xl font-semibold mb-2">Rules</h3>
          <ul className="list-disc list-inside mb-4">
            {hackathon.rules.map((rule, index) => (
              <li key={index} className="text-gray-300">{rule}</li>
            ))}
          </ul>
          <h3 className="text-xl font-semibold mb-2">Prizes</h3>
          <ul className="list-disc list-inside mb-4">
            {hackathon.prizes.map((prize, index) => (
              <li key={index} className="text-gray-300">{prize}</li>
            ))}
          </ul>
          <button className="mt-4 bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600">Participate</button>
        </div>

        {/* Right Container */}
        <div className="md:w-1/4 bg-gray-800 p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-2">Contact Details</h3>
          <p className="text-gray-300 mb-4">Email: {hackathon.contact.email}</p>
          <p className="text-gray-300 mb-4">Phone: {hackathon.contact.phone}</p>
          <h3 className="text-xl font-semibold mb-2">Participants</h3>
          <p className="text-gray-300 mb-4">{hackathon.participants} participants</p>
          <h3 className="text-xl font-semibold mb-2">Date & Time</h3>
          <p className="text-gray-300 mb-4">{hackathon.date}</p>
          <p className="text-gray-300 mb-4">{hackathon.time}</p>
          <h3 className="text-xl font-semibold mb-2">Timetable</h3>
          <ul className="list-disc list-inside mb-4">
            {hackathon.timetable.map((event, index) => (
              <li key={index} className="text-gray-300">{event}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Hackathon;