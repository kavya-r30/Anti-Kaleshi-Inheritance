import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  const handleLogout = async () => {
    try {
      const res = await fetch('http://localhost:5001/auth/logout', {
        method: 'GET',
        credentials: 'include',
      });

      if (res.ok) {
        setIsAuthenticated(false);
        navigate('/');
      }
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center items-center w-full">
      <nav className={`w-full transition-all duration-300 ${
        scrolled 
          ? 'bg-purple-50 w-full border-b border-gray-200 shadow'
          : 'bg-purple-50 w-full'
      }`}>
        <div className="px-4 mx-auto">
          <div className={`flex items-center justify-between transition-all duration-300 ${
            scrolled ? 'h-14' : 'h-14'
          }`}>
            <div className="w-32 flex">
              <Link to="/" className="text-2xl font-bold">
                <span className="bg-gradient-to-r from-[#f7b3ba] to-[#daa5f2] bg-clip-text text-transparent">
                  iCode
                </span>
              </Link>
            </div>

            <div className="flex-1 flex justify-center">
              <div className="flex space-x-8">
                <Link to="/chatbot" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Chatbot
                </Link>
                <Link to="/contest-tracker" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Contest
                </Link>
                <Link to="/dashboard" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Dashboard
                </Link>
                <Link to="/devboard" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Devboard
                </Link>
                {/* Discussion link */}
                <Link to="/discussion" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Discussion
                </Link>
              </div>
            </div>

            <div className="w-36 flex items-center justify-end space-x-4">
              {isAuthenticated ? (
                <>
                  <button
                    onClick={handleLogout}
                    className={`px-4 py-2 rounded-lg bg-purple-600 text-white font-medium hover:bg-purple-700 transition-colors ${
                      scrolled ? 'text-sm' : 'text-sm'
                    }`}
                  >
                    Sign Out
                  </button>
                  <Link
                    to="/profile"
                    className={`p-2 w-9 h-9 flex items-center justify-center rounded-full bg-purple-600 text-white font-medium hover:bg-purple-700 transition-colors \
                      ${scrolled ? 'text-sm' : 'text-sm'}`}
                  >
                    <img src="path_to_profile_image" alt="Profile" className="w-7 h-7 rounded-full" />
                  </Link>
                </>
              ) : (
                <Link
                  to="/login"
                  className={`px-4 py-2 rounded-lg bg-purple-600 text-white font-medium hover:bg-purple-700 transition-colors ${
                    scrolled ? 'text-sm' : 'text-sm'
                  }`}
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
