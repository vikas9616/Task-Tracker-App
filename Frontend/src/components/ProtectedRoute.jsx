import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token'); // Check if the user is logged in

  if (!token) {
    // If no token, redirect to login page
    return <Navigate to="/" />;
  }

  return children; // Render the protected component if logged in
};

export default ProtectedRoute;