import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-gray-800 text-white p-4">
      <nav className="container mx-auto flex justify-between">
        <Link to="/" className="text-xl font-bold">Project Swifters</Link>
        <div>
          <Link to="/login" className="mr-4">Login</Link>
          <Link to="/dashboard">Dashboard</Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
