import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom
import { useAuth0 } from '@auth0/auth0-react';
import LogOut from './LogOut';
import SignIn from './SignIn'

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const { isAuthenticated } = useAuth0();

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

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center items-center w-full">
      <nav className={`w-full transition-all duration-300 ${
        scrolled 
          // ? 'mx-4 my-4 rounded-2xl bg-purple-50/70 dark:bg-gray-900/80 backdrop-blur-md shadow-lg max-w-3xl' 
          ? 'bg-purple-50 dark:bg-gray-900 w-full border-b border-gray-200'
          : 'bg-purple-50 dark:bg-gray-900 w-full'
      }`}>
        <div className="px-4 mx-auto">
          <div className={`flex items-center justify-between transition-all duration-300 ${
            scrolled ? 'h-14' : 'h-14'
          }`}>
            {/* Logo */}
            <div className="w-32 flex">
              <Link to="/" className="text-2xl font-bold">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  CodeSync
                </span>
              </Link>
            </div>

            {/* Center Navigation - Fixed width container */}
            <div className="flex-1 flex justify-center">
              <div className="flex space-x-8">
                <Link to="/chatbot" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Chatbot
                </Link>
                <Link to="/contest-tracker" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Contest
                </Link>
                <Link to="/dashboard" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Dashboard
                </Link>
                <Link to="/dicussion" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Discussion
                </Link>
              </div>
            </div>

            {/* Right Side Items - Fixed width container */}
            <div className="w-32 flex items-center justify-end space-x-4">
              <button
                onClick={() => setIsDark(!isDark)}
                className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </button>

              <Link
                to="/login"
                className={`px-4 py-2 rounded-lg bg-black dark:bg-white text-white dark:text-black font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors ${
                  // scrolled ? 'text-sm' : 'text-base'
                  scrolled ? 'text-sm' : 'text-sm'
                }`}
                >
                {
                isAuthenticated ? (
                  <LogOut />
                ) : (
                  <SignIn />
                )
              }
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
