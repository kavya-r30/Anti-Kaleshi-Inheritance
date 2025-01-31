import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Code2, Lock, Mail, User, Trophy, Star, TrendingUp } from 'lucide-react';

const FeatureItem = ({ icon: Icon, title, description }) => (
  <div className="flex items-center space-x-4 text-purple-100">
    <div className="p-3 bg-white/10 rounded-lg backdrop-blur-sm">
      <Icon className="h-6 w-6" />
    </div>
    <div>
      <h3 className="font-semibold">{title}</h3>
      <p className="text-purple-200">{description}</p>
    </div>
  </div>
);

const Signup = ({ setIsAuthenticated }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setError('');
      setIsLoading(true);
      try {
        const res = await fetch('http://localhost:5001/auth/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, password }),
          credentials: 'include',
        });
        const data = await res.json();
        if (res.ok) {
          setIsAuthenticated(true);
          localStorage.setItem('isAuthenticated', 'true'); // Persist in localStorage
          navigate('/dashboard');
        } else {
          setError(data.error || 'Signup failed');
        }
      } catch (err) {
        setError('Network error. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

  return (
    <div className="min-h-[calc(100vh-3.5rem)] flex bg-purple-50">
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="text-center lg:text-left mb-12">
            <h2 className="text-3xl font-bold text-purple-900">Create Account</h2>
            <p className="mt-3 text-lg text-purple-600">Begin your coding journey today</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r shadow-sm">
                <p className="text-red-700">{error}</p>
              </div>
            )}

            <div className="space-y-4">
              <div className="relative">
                <User className="absolute left-3 top-3 h-5 w-5 text-purple-400" />
                <input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border-2 border-purple-100 rounded-xl 
                    focus:ring-2 focus:ring-purple-500 focus:border-purple-500 
                    hover:border-purple-300 transition-all duration-200"
                  required
                />
              </div>

              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-purple-400" />
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border-2 border-purple-100 rounded-xl 
                    focus:ring-2 focus:ring-purple-500 focus:border-purple-500 
                    hover:border-purple-300 transition-all duration-200"
                  required
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-purple-400" />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border-2 border-purple-100 rounded-xl 
                    focus:ring-2 focus:ring-purple-500 focus:border-purple-500 
                    hover:border-purple-300 transition-all duration-200"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white text-lg font-semibold rounded-xl
                transition-all duration-200 transform hover:scale-[1.01] hover:shadow-lg active:scale-[0.99]
                focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            >
              {isLoading ? (
                <div className="flex justify-center items-center">
                  <div className="animate-spin h-6 w-6 border-3 border-white border-t-transparent rounded-full" />
                </div>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-purple-600">
            Already have an account?{' '}
            <Link to='/login' className="font-semibold text-purple-700 hover:text-purple-900">
              Sign In
            </Link>
          </p>
        </div>
      </div>

      <div className="hidden lg:flex lg:w-1/2 p-12 flex-col justify-between relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-bl from-purple-700 via-violet-500 to-blue-900 rounded-tl-3xl rounded-bl-3xl">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
          <div className="absolute inset-0" style={{
            background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23fff" fill-opacity="0.1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          }}></div>
        </div>
        <div className="relative z-10">
          <div className="mt-6">
            <h1 className="text-6xl font-bold text-white mb-6 leading-tight">
              Begin Your<br />
              Journey Today
            </h1>
            <p className="text-purple-100 text-xl max-w-sm leading-relaxed">
              Elevate your competitive programming journey with comprehensive tracking and analytics.
            </p>
          </div>

          <div className="mt-12 space-y-6">
            <FeatureItem 
              icon={Trophy} 
              title="Contest Mastery"
              description="Never miss important competitions again"
            />
            <FeatureItem 
              icon={TrendingUp} 
              title="Progress Tracking"
              description="Monitor your growth across all platforms"
            />
            <FeatureItem 
              icon={Star} 
              title="Deep Analytics"
              description="Gain insights into your coding patterns"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;