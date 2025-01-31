import React from 'react';
import { Link } from 'react-router-dom';

const CommunityNavbar = () => {
  return (
    <nav className="bg-purple-800 text-white p-4 fixed h-full w-64 top-0 left-0 z-50">
      <div className="flex flex-col items-start">
        <Link to="/community/discussion" className="text-2xl font-bold mb-6">Community</Link>
        <div className="flex flex-col gap-4">
          <Link to="/community/discussion" className="hover:text-purple-300">Discussion</Link>
          <Link to="/community/career" className="hover:text-purple-300">Career</Link>
          <Link to="/community/interview" className="hover:text-purple-300">Interview</Link>
          <Link to="/community/support-feedback" className="hover:text-purple-300">Support</Link>
        </div>
      </div>
    </nav>
  );
};

export default CommunityNavbar;
