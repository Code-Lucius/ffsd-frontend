import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Nav() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const { user, logout } = useAuth();

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="text-2xl font-bold text-blue-600">
            <Link to="/" className="text-gray-800 hover:text-blue-600 transition-colors duration-300">LOGO</Link>
          </div>

          {/* Menu Button for Mobile */}
          <div className="md:hidden">
            <button onClick={toggleMobileMenu} className="text-gray-500 focus:outline-none">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>

          {/* Navbar Links (Desktop) */}
          <div className="hidden md:flex space-x-8 items-center">
            
            { !user? (
              <>
                <Link to="/" className="text-gray-800 hover:text-blue-600 transition-colors duration-300">Login</Link>
                <Link to="/signup" className="text-gray-800 hover:text-blue-600 transition-colors duration-300">Sign up</Link>
              </>
              ) : (
                <>
                  <Link to="/dashboard" className="text-gray-800 hover:text-blue-600 transition-colors duration-300">Dashboard</Link>
                  <button onClick={() => logout()} className="text-gray-800 hover:text-blue-600 transition-colors duration-300">Logout</button>
                </>
              )
            }
            
          </div>
        </div>
      </div>

      {/* Off-Canvas Menu */}
      <div className={`fixed inset-y-0 left-0 w-64 bg-white shadow-lg transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out z-50`}>
        <button onClick={toggleMobileMenu} className="absolute top-4 right-4 text-gray-500 focus:outline-none">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
        <div className="flex flex-col mt-8 space-y-4 pl-6">
            <Link to="/" className="text-gray-800 hover:text-blue-600 transition-colors duration-300">Login</Link>
            <Link to="/signup" className="text-gray-800 hover:text-blue-600 transition-colors duration-300">Sign up</Link>
            <Link to="/dashboard" className="text-gray-800 hover:text-blue-600 transition-colors duration-300">Dashboard</Link>
        </div>
      </div>

      {/* Overlay */}
      {isMobileMenuOpen && (
        <div onClick={toggleMobileMenu} className="fixed inset-0 bg-black opacity-50 z-40"></div>
      )}
    </nav>
  );
}
