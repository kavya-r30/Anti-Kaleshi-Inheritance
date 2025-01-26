// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const Login = () => {
//  const [email, setEmail] = useState('');
//  const [password, setPassword] = useState('');
//  const [error, setError] = useState('');
//  const navigate = useNavigate();

//  const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
  
//     try {
//       const res = await fetch('http://localhost:5001/auth/login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, password }),
//         credentials: 'include', // Include cookies for JWT
//       });
      
//       const data = await res.json();
  
//       if (res.ok) {
//         // Successful login
//         navigate('/dashboard');
//       } else {
//         // Show error message
//         setError(data.error || 'Login failed');
//       }
//     } catch (err) {
//       console.error('Login error:', err);
//       setError('Network error. Please try again.');
//     }
//   };

//  return (
//    <div className="flex items-center justify-center min-h-screen bg-gray-100">
//      <form onSubmit={handleSubmit} className="bg-white p-8 shadow-md rounded-lg w-96">
//        <h2 className="text-4xl font-extrabold mb-10">Login</h2>

//        {error && (
//          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
//            {error}
//          </div>
//        )}

//        <label className="block mt-5 mb-2" htmlFor="email">Email:</label>
//        <input
//          type="email"
//          name="email"
//          value={email}
//          onChange={(e) => setEmail(e.target.value)}
//          className="p-3 rounded border border-gray-300 w-full"
//          required
//        />

//        <label className="block mt-5 mb-2" htmlFor="password">Password:</label>
//        <input
//          type="password"
//          name="password"
//          value={password}
//          onChange={(e) => setPassword(e.target.value)}
//          className="p-3 rounded border border-gray-300 w-full"
//          required
//        />

//        <button 
//          type="submit" 
//          className="rounded-full bg-yellow-300 text-sm font-bold uppercase tracking-wider px-6 py-2 mt-6 w-full"
//        >
//          Login
//        </button>
//      </form>
//    </div>
//  );
// };

// export default Login;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ setIsAuthenticated }) => { // Accept setIsAuthenticated as a prop
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
  
    try {
      const res = await fetch('http://localhost:5001/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include', // Include cookies for JWT
      });
      
      const data = await res.json();
  
      if (res.ok) {
        // Successful login
        setIsAuthenticated(true); // Update authentication state
        navigate('/dashboard'); // Redirect to dashboard
      } else {
        // Show error message
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Network error. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 shadow-md rounded-lg w-96">
        <h2 className="text-4xl font-extrabold mb-10">Login</h2>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            {error}
          </div>
        )}

        <label className="block mt-5 mb-2" htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-3 rounded border border-gray-300 w-full"
          required
        />

        <label className="block mt-5 mb-2" htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-3 rounded border border-gray-300 w-full"
          required
        />

        <button 
          type="submit" 
          className="rounded-full bg-yellow-300 text-sm font-bold uppercase tracking-wider px-6 py-2 mt-6 w-full"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;