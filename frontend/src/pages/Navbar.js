import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Auth/AuthContext';

const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const goToHomePage = () => {
    navigate('/student');
  };

  const goToProfilePage = () => {
    navigate('/student/profile');
  };

  return (
    <header className="fixed top-0 left-0 w-full p-4 bg-gray-800 flex justify-between items-center z-50 shadow-lg">
      <div className="flex items-center gap-4">
        <img src="/svgs/logo.svg" alt="HackHub Logo" className="w-16 h-16 cursor-pointer" onClick={goToHomePage} />
        <div>
          <h1 className="text-4xl font-bold" style={{ color: '#3cd7b8' }}>HackHub</h1>
          <p className="text-gray-300">Connect with various hackathons and participate to showcase your skills.</p>
        </div>
      </div>
      <div className="flex items-center space-x-2 cursor-pointer" onClick={goToProfilePage}>
        {user ? (
          <>
            <span className="text-gray-300 text-l">{user.name}</span>
            <img src={user.profile_image} alt="Profile" className="w-10 h-10 bg-gray-400 rounded-full" />
          </>
        ) : (
          <span className="text-gray-300 text-l">Loading...</span>
        )}
      </div>
    </header>
  );
};

export default Navbar;