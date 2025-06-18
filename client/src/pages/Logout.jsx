// src/pages/Logout.jsx or inside your Logout function

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear user session/token if stored
    localStorage.removeItem('token');
    // You can also clear any other auth-related data here

    // Redirect to homepage
    navigate('/');
  }, [navigate]);

  return null; // No UI needed, just a redirect
}
