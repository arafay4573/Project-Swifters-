import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8 text-primary">Login</h1>
      <form onSubmit={handleSubmit} className="bg-card-bg p-8 rounded-lg shadow-lg">
        <div className="mb-4">
          <label htmlFor="email" className="block text-text-sub mb-2">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-dark-bg border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password"className="block text-text-sub mb-2">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-dark-bg border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <button type="submit" className="w-full bg-primary text-dark-bg py-2 rounded-lg font-semibold hover:bg-opacity-80 transition-colors">
          Login
        </button>
      </form>
      <p className="text-center mt-4">
        Don't have an account? <Link to="/register" className="text-primary hover:underline">Register</Link>
      </p>
    </div>
  );
};

export default Login;
