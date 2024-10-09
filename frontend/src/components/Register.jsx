import React, { useContext, useState } from 'react';
import { DataContext } from '../App';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  // State สำหรับเก็บข้อมูลจากฟอร์ม
  const [registerData, setRegisterData] = useState({ name: '', email: '', password: '' });
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const {setToken} = useContext(DataContext);

  const navigate = useNavigate();

  // ฟังก์ชันสำหรับส่งข้อมูล register ไปยัง API
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:8000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registerData), // ส่งข้อมูลในรูปแบบ JSON
      });
      const data = await response.json();
      console.log('Register response:', data);
      // Handle success or error
    } catch (error) {
      console.error('Error registering:', error);
    }
  };

  // ฟังก์ชันสำหรับส่งข้อมูล login ไปยัง API
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:8000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData), // ส่งข้อมูลในรูปแบบ JSON
      });
      const data = await response.json();
      setToken(data.token);
      navigate('/admin')
      console.log('Login response:', data);
      // Handle success or error
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center">
      <div className="container mx-auto p-8 flex justify-between">
        {/* Register Form */}
        <div className="bg-gray-800 text-white p-8 rounded-lg shadow-md w-1/2 mr-4">
          <h2 className="text-2xl font-bold text-yellow-400 mb-6">Register</h2>
          <form onSubmit={handleRegisterSubmit}>
            <div className="mb-4">
              <label className="block text-gray-300 text-sm font-semibold mb-2" htmlFor="name">
                Name
              </label>
              <input
                id="name"
                type="text"
                value={registerData.name}
                onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                className="w-full p-2 rounded bg-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-300 text-sm font-semibold mb-2" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={registerData.email}
                onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                className="w-full p-2 rounded bg-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-300 text-sm font-semibold mb-2" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={registerData.password}
                onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                className="w-full p-2 rounded bg-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-yellow-500 text-gray-900 font-bold p-2 rounded hover:bg-yellow-600 transition duration-300"
            >
              Register
            </button>
          </form>
        </div>

        {/* Login Form */}
        <div className="bg-gray-800 text-white p-8 rounded-lg shadow-md w-1/2 ml-4">
          <h2 className="text-2xl font-bold text-yellow-400 mb-6">Login</h2>
          <form onSubmit={handleLoginSubmit}>
            <div className="mb-4">
              <label className="block text-gray-300 text-sm font-semibold mb-2" htmlFor="login-email">
                Email
              </label>
              <input
                id="login-email"
                type="email"
                value={loginData.email}
                onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                className="w-full p-2 rounded bg-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-300 text-sm font-semibold mb-2" htmlFor="login-password">
                Password
              </label>
              <input
                id="login-password"
                type="password"
                value={loginData.password}
                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                className="w-full p-2 rounded bg-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-yellow-500 text-gray-900 font-bold p-2 rounded hover:bg-yellow-600 transition duration-300"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
