import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FiMail, FiLock, FiUser } from 'react-icons/fi';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'password') {
      setError('');
      login();
      navigate('/dashboard');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <div className="w-full max-w-5xl bg-white rounded-xl overflow-hidden shadow-2xl flex">
        {/* Left Side - Form */}
        <div className="w-1/2 p-10 flex flex-col justify-center">
          <div className="mb-10">
            <h1 className="text-2xl font-semibold text-gray-900">SEETA <span className="font-light">HIGH</span></h1>
            
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Login to Your Account</h2>
          <p className="text-sm text-gray-500 mb-6">Streamline your access, amplify your impact</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="relative">
              <FiUser className="absolute top-3.5 left-3 text-gray-400" />
              <input
                type="text"
                placeholder="Username"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="relative">
              <FiLock className="absolute top-3.5 left-3 text-gray-400" />
              <input
                type="password"
                placeholder="Password"
                className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {/* Optional eye icon can be placed here */}
            </div>
            {error && <div className="text-red-500 text-sm text-center">{error}</div>}
            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded-lg font-semibold hover:opacity-90 transition"
            >
              Login
            </button>
          </form>
        </div>

        {/* Right Side - Welcome Panel */}
        <div className="w-1/2 bg-cover bg-center relative" style={{ backgroundImage: 'url("/path-to-your-gradient-bg.jpg")' }}>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-20" />
          <div className="relative h-full flex items-center justify-center">
            <div className="text-center text-white px-4">
              <img src="/path-to-your-lamp-image.png" alt="Lamp" className="mx-auto mb-4 w-28" />
              <h2 className="text-4xl font-bold">Welcome</h2>
              <h2 className="text-4xl font-bold">Back!</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
