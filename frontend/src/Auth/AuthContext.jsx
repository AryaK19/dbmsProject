import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const Context = createContext();

export const useAuth = () => useContext(Context);

export default function AuthContext({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await axios.get('http://localhost:3001/auth/status', { withCredentials: true });
        if (response.status === 200) {
          setUser(response.data.user);
          setIsAdmin(response.data.isAdmin);
          setLogin();
        } else {
          setLogout();
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
        setLogout();
      }
    };

    checkAuthStatus();
  }, []);

  const setLogin = () => {
    setIsAuthenticated(true);
    setLoading(false);
  };

  const setLogout = () => {
    setIsAuthenticated(false);
    setLoading(false);
    setUser(null);
    setIsAdmin(false);
  };

  // Context value
  const value = {
    isAuthenticated,
    loading,
    setLogin,
    setLogout,
    user,
    isAdmin,
    setUser
  };

  return (
    <Context.Provider value={value}>
      {children}
    </Context.Provider>
  );
}