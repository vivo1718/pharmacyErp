

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
  
    useEffect(() => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }, []);
  
    const handleLogout = () => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setUser(null);
      navigate("/");
    };
  
    return (
        <div className="top-0 font-sans left-64 right-0 bg-white border-b p-4 flex justify-end shadow-md">
        <div className="flex items-center space-x-1">
          {user && (
            <span className="text-indigo-800 text-sm font-semibold uppercase tracking-wide">
              {user.username}
            </span>
          )}
          {/* Profile Button */}
          <button
            title="Profile"
            className={`flex items-center gap-2 p-2 rounded-lg transition-all ${
              user ? "text-green-600 text-sm hover:bg-blue-100" : "text-gray-700"
            } hover:text-blue-700`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>
            <span className="hidden sm:inline-block">Profile</span>
          </button>
      
          {/* Logout Button */}
          {user && (
            <button
              title="Logout"
              onClick={handleLogout}
              className="flex items-center text-sm gap-2 p-2 text-red-500 hover:text-red-700 hover:bg-red-100 rounded-lg transition-all"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
                />
              </svg>
              <span className="hidden sm:inline-block">Logout</span>
            </button>
          )}
        </div>
      </div>
      
    );
  };
  export default Navbar;
  