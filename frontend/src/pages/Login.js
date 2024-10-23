import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../Auth/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const {setUser, setIsAdmin} = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/login', { email, password }, { withCredentials: true });
      if (response.status === 200) {
        console.log('Logged in');
        console.log(response.data);
        setUser(response.data.user);
        setIsAdmin(response.data.isAdmin);
        if (response.data.isAdmin) {
          navigate('/admin');
        } else {
          
          navigate('/student');
        }
      }
    } catch (error) {
      console.error('Error logging in:', error);
      alert('Invalid credentials');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4" style={{ color: '#3cd7b8' }}>Login</h1>
        <form onSubmit={handleLogin}>
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
          <button
            type="submit"
            className="mt-4 bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600"
          >
            Login
          </button>
        </form>
        <button
          onClick={() => navigate('/register')}
          className="mt-4 bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default Login;