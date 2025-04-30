import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';

const Header = () => {
  const { darkMode, setDarkMode } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear the token
    navigate('/'); // Redirect to login page
  };

  return (
    <nav className="p-4 bg-gray-200 dark:bg-gray-800 flex justify-between text-gray-800 dark:text-gray-200">
      <div className="space-x-4">
        {/* <Link to="/">Login</Link> */}
        {/* <Link to="/signup">Signup</Link> */}
        <Link to="/dashboard" className='font-bold text-2xl'>Dashboard</Link>
      </div>
      <div className="flex items-center space-x-4">
        <button
          onClick={() => setDarkMode(!darkMode)} // Toggle dark mode
          className="bg-blue-500 text-white px-2 py-1 rounded"
        >
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-2 py-1 rounded"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Header;