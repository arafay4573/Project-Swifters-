import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Star, User, LogOut } from 'lucide-react';
import AuthContext from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-card-bg shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center space-x-2">
            <BookOpen className="text-primary" size={28} />
            <span className="text-xl font-bold text-text-main">Project Swifters</span>
          </Link>
          <div className="flex items-center space-x-4">
            <Link to="/pricing" className="text-text-sub hover:text-primary transition-colors">Pricing</Link>
            {user ? (
              <>
                <Link to="/story-form" className="text-text-sub hover:text-primary transition-colors">Create Story</Link>
                <Link to="/dashboard" className="text-text-sub hover:text-primary transition-colors">Dashboard</Link>
                <Link to="/profile" className="text-text-sub hover:text-primary transition-colors">
                  <User />
                </Link>
                <button onClick={logout} className="text-text-sub hover:text-primary transition-colors">
                  <LogOut />
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-text-sub hover:text-primary transition-colors">Login</Link>
                <Link to="/register" className="bg-primary text-dark-bg px-4 py-2 rounded-lg font-semibold hover:bg-opacity-80 transition-all flex items-center space-x-2">
                  <Star size={16} />
                  <span>Register</span>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
