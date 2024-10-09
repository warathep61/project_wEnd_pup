import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DataContext } from "../App";

export default function Navbar() {
  const { token, setToken } = useContext(DataContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    const response = await fetch("http://127.0.0.1:8000/api/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    if(response.ok) {
        setToken("");
        navigate('/')
    }
  };
  return (
    <div>
        {token ? (
            <nav className="bg-gray-800 text-white p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
              <div className="text-2xl font-bold text-yellow-400">Apex Legends</div>
              <div className="space-x-8">
                <Link
                  to="/"
                  className="text-lg text-gray-300 hover:text-yellow-400 transition duration-300"
                >
                  Home
                </Link>
                <Link
                  to="/admin"
                  className="text-lg text-gray-300 hover:text-yellow-400 transition duration-300"
                >
                  Admin
                </Link>
                <Link
                  onClick={handleLogout}
                  className="text-lg text-gray-300 hover:text-red-400 transition duration-300"
                >
                  Logout
                </Link>
              </div>
            </div>
          </nav>
        ) : (
            <nav className="bg-gray-800 text-white p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
              <div className="text-2xl font-bold text-yellow-400">Apex Legends</div>
              <div className="space-x-8">
                <Link
                  to="/"
                  className="text-lg text-gray-300 hover:text-yellow-400 transition duration-300"
                >
                  Home
                </Link>
                <Link
                  to="/register"
                  className="text-lg text-gray-300 hover:text-yellow-400 transition duration-300"
                >
                  Register
                </Link>
              </div>
            </div>
          </nav>
        )}
    </div>
  );
}
