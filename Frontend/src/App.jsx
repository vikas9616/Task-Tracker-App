import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import { ThemeProvider } from './contexts/ThemeContext';
import Dashboard from './pages/Dashboard';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage.jsx';
const App = () => {
  return (
    <>
    <ThemeProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<LoginPage
           />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/dashboard" element={<ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>} />
        </Routes>
        <ToastContainer position="top-center" />
      </Router>
    </ThemeProvider>
    </>
  );
};

export default App;