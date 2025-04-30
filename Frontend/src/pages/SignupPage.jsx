import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { signup } from '../services/api';

const SignupPage = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', country: '' });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(form);
      toast.success('Signup successful!');
      navigate('/');
    } catch {
      toast.error('Signup failed!');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg p-12 bg-white dark:bg-gray-800 rounded-lg shadow-lg"
      >
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-8">Signup</h2>
        {['name', 'email', 'password', 'country'].map((field) => (
          <input
            key={field}
            name={field}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            type={field === 'password' ? 'password' : 'text'}
            value={form[field]}
            onChange={handleChange}
            required
            className="block w-full mb-6 p-4 border border-gray-300 dark:border-gray-700 rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          />
        ))}
        <button
          type="submit"
          className="w-full p-4 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Signup
        </button>
        <p className="mt-8 text-center text-gray-600 dark:text-gray-400">
          Already have an account?{' '}
          <Link to="/" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignupPage;