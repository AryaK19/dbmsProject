import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dob, setDob] = useState('');
  const [contact, setContact] = useState('');
  const [userType, setUserType] = useState('student'); // Default to student
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const endpoint = userType === 'admin' ? 'http://localhost:3001/admins' : 'http://localhost:3001/users';
    const payload = userType === 'admin' ? { name, email, password, contact } : { name, email, password, dob };
    try {
      const response = await axios.post(endpoint, payload);
      if (response.data.success) {
        navigate('/login'); 
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error('Error registering:', error);
      alert('Registration failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4" style={{ color: '#3cd7b8' }}>Register</h1>
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label className="block text-gray-300">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          {userType === 'student' && (
            <div className="mb-4">
              <label className="block text-gray-300">Year of Birth</label>
              <input
                type="number"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                required
              />
            </div>
          )}
          {userType === 'admin' && (
            <div className="mb-4">
              <label className="block text-gray-300">Contact (Phone)</label>
              <input
                type="text"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                required
              />
            </div>
          )}
          <div className="mb-4">
            <label className="block text-gray-300">Register as</label>
            <select
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              required
            >
              <option value="student">Student</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button
            type="submit"
            className="mt-4 bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600"
          >
            Register
          </button>
        </form>
        <button
          onClick={() => navigate('/login')}
          className="mt-4 bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Back to Login
        </button>
      </div>
    </div>
  );
};

export default Register;