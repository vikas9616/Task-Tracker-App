import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    console.log('Dark mode state:', darkMode); // Debugging log
    if (darkMode) {
      document.documentElement.classList.add('dark'); // Add 'dark' class to <html>
      console.log('Dark mode enabled'); // Debugging log
    } else {
      document.documentElement.classList.remove('dark'); // Remove 'dark' class from <html>
      console.log('Dark mode disabled'); // Debugging log
    }
  }, [darkMode]);

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);