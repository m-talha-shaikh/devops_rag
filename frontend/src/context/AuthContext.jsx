import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';  // Make sure you have axios installed or use fetch

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if the user is already authenticated when the app loads
    const checkAuthStatus = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
            setIsAuthenticated(false);
            setLoading(false);
            return;
            }

            const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/auth/check`, {
            headers: { Authorization: `Bearer ${token}` },
          });


            if (response.data.isAuthenticated) {
            setUser(response.data.user);
            setIsAuthenticated(true);
            } else {
            setIsAuthenticated(false);
            }
        } catch (error) {
            console.error('Error checking authentication status', error);
            setIsAuthenticated(false);
        } finally {
            setLoading(false);
        }
        };


    checkAuthStatus();
  }, []);

  const signUp = async (fullName, email, password) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/auth/signup`, { fullName, email, password });

    localStorage.setItem('token', response.data.token); // Store the token
    console.log(response.data.token)
    setUser(response.data.user);                       // Set user data
    setIsAuthenticated(true);                          // Mark as authenticated
  } catch (error) {
    console.error('Sign Up Error', error);
    throw error;
  }
};



  const signIn = async (email, password) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/auth/signin`, { email, password });
    console.log(response);

    // Save the JWT token to localStorage
    localStorage.setItem('token', response.data.token);
    console.log('Token saved to localStorage:', response.data.token);
    
    setUser(response.data.user);
    setIsAuthenticated(true);
  } catch (error) {
    console.error('Sign In Error', error);
    throw error;
  }
};


  const signOut = async () => {
    try {
        // Clear token from localStorage
        localStorage.removeItem('token');
        setUser(null);
        setIsAuthenticated(false);
        window.location.href = '/';
    } catch (error) {
        console.error('Sign Out Error', error);
    }
    };


  return (
    <AuthContext.Provider value={{ user, isAuthenticated, loading, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};