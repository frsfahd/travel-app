// AuthContext.js
import { useState, useEffect, createContext, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState('');

  const login = async (email, password) => {
    try {
      const response = await axios.post('/api/login', { email, password });
      if (response.status === 200) {
        localStorage.setItem('jwt-token', JSON.stringify(response.data.token));
        return { error: null, token: response.data.token };
      }
      return { error: response.data.message, token: null };
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  };

  const verify = async () => {
    const clientToken = JSON.parse(localStorage.getItem('jwt-token'));
    try {
      const response = await axios.get(`/api/token/${clientToken}`);
      if (response.status === 200) {
        setUser(response.data.user);
        return true;
      } else {
        localStorage.removeItem('jwt-token');
        return false;
      }
    } catch (error) {
      console.error('Error verifying token:', error);
      localStorage.removeItem('jwt-token');
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('jwt-token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, verify }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
