import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function RegisterPage() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ full_name: name, email, password }),
      });

      const data = await res.json();
      if (res.ok) {
       
        const userPayload = {
          message: 'Login successful',
          token: data.token,
          user: data.user, // already coming from backend
        };
        localStorage.setItem('currentUser', JSON.stringify(userPayload)); // ✅ matches login
         alert('✅ Registration successful!');
        navigate('/dashboard');
      } else {
        alert(`❌ Error: ${data.error}`);
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert('⚠️ Registration failed. Please try again.');
    }
  };

  const handleGoogleLogin = () => {
  window.location.href = 'http://localhost:5000/auth/google';
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col md:flex-row w-[90%] md:w-[900px]">
        {/* Left Side (Image) */}
        <div
          className="hidden md:block md:w-1/2 bg-cover bg-center"
          style={{ backgroundImage: "url('/regi.jpeg')" }}
        ></div>

        {/* Right Side (Form) */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Register</h2>

          <form className="space-y-4" onSubmit={handleRegister}>
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-green-400 text-white py-2 rounded hover:opacity-90 transition"
            >
              Register
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-4">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-2 text-gray-400 text-sm">or sign up with</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          {/* Social Login (Optional) */}
          <div className="flex justify-center gap-4">
            <button className="border px-4 py-2 rounded hover:bg-gray-100"
            onClick={handleGoogleLogin}>
              <img src="/google.jpeg" alt="Google" className="w-5" />
            </button>
          </div>

          <p className="text-sm mt-4 text-center text-gray-600">
            Already have an account?{' '}
            <a href="/login" className="text-blue-500 hover:underline">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
