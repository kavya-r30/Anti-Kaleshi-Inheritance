import React, { useState } from 'react';
import { EyeIcon, EyeOffIcon } from 'lucide-react';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
//   const [formData, setFormData] = useState({
//     email: '',
//     password: ''
//   });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Section */}
      <div className="w-1/2 p-8 flex flex-col justify-center relative">
        <div className="max-w-md mx-auto w-full">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Sign in</h1>
          
          <p className="text-gray-600 mb-6">
            Don't have an account yet?{' '}
            <a href="void(0)" className="text-indigo-600 hover:underline">Sign up here</a>
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-1">Email address</label>
              <input
                type="email"
                placeholder="Enter email address"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <label className="block text-gray-700">Password</label>
                <a href="void(0)" className="text-indigo-600 text-sm hover:underline">Forgot password?</a>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? 
                    <EyeOffIcon size={20} /> : 
                    <EyeIcon size={20} />
                  }
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-400 to-purple-400 text-white py-2 px-4 rounded-md hover:from-blue-500 hover:to-purple-500 transition-all duration-300"
            >
              Sign in
            </button>

            <div className="relative py-3">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <button
              type="button"
              className="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-50 flex items-center justify-center gap-2"
            >
              <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
              Sign in with Google
            </button>
          </form>

          <p className="mt-6 text-sm text-center text-gray-600">
            By signing in or creating an account, you are agreeing to our{' '}
            <a href="void(0)" className="text-indigo-600 hover:underline">Terms & Conditions</a>
            {' '}and our{' '}
            <a href="void(0)" className="text-indigo-600 hover:underline">Privacy Policy</a>.
          </p>
        </div>

        <footer className="absolute bottom-4 left-0 right-0 flex flex-col items-center space-y-4">
          <div className="flex space-x-8">
            <a href="void(0)" className="text-gray-600 hover:text-gray-900">FAQ</a>
            <a href="void(0)" className="text-gray-600 hover:text-gray-900">Support</a>
            <a href="void(0)" className="text-gray-600 hover:text-gray-900">Privacy</a>
            <a href="void(0)" className="text-gray-600 hover:text-gray-900">Timeline</a>
            <a href="void(0)" className="text-gray-600 hover:text-gray-900">Terms</a>
          </div>
          <div className="flex space-x-6">
            <a href="void(0)" className="text-gray-600 hover:text-gray-900">
              <img src="/api/placeholder/24/24" alt="LinkedIn" className="w-6 h-6" />
            </a>
            <a href="void(0)" className="text-gray-600 hover:text-gray-900">
              <img src="/api/placeholder/24/24" alt="Twitter" className="w-6 h-6" />
            </a>
            <a href="void(0)" className="text-gray-600 hover:text-gray-900">
              <img src="/api/placeholder/24/24" alt="Instagram" className="w-6 h-6" />
            </a>
          </div>
          <p className="text-sm text-gray-500">© 2024 iCode, Inc. All rights reserved.</p>
        </footer>
      </div>

      {/* Right Section */}
      <div className="w-1/2 bg-gradient-to-br from-blue-300 via-indigo-300 to-purple-300 p-8 flex flex-col justify-center relative overflow-hidden">
        <div className="text-white max-w-lg backdrop-blur-sm bg-white/10 p-8 rounded-lg">
          <h2 className="text-4xl font-bold mb-12">Welcome to iCode</h2>
          
          <div className="space-y-12">
            <div className="flex items-start space-x-4">
              <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
                <img src="/api/placeholder/40/40" alt="Profile icon" className="w-10 h-10" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">All in One Coding Profile</h3>
                <p className="text-white/90">Showcase your complete coding portfolio, track all stats, and share your progress effortlessly in one place.</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
                <img src="/api/placeholder/40/40" alt="Sheets icon" className="w-10 h-10" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Follow Popular Sheets</h3>
                <p className="text-white/90">Organize questions notes and follow popular coding Sheets in one place for seamless review and effective revision.</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
                <img src="/api/placeholder/40/40" alt="Trophy icon" className="w-10 h-10" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Contest Tracker</h3>
                <p className="text-white/90">Stay on top of coding contests by tracking schedules and setting reminders effortlessly with a single click.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;