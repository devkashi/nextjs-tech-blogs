"use client";

import React from "react";

const Header = () => {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-gray-800 text-white">
      {/* Logo */}
      <div className="text-xl font-bold">Admin Dashboard</div>

      {/* Profile Section */}
      <div className="flex items-center space-x-4">
        <img
          src="https://via.placeholder.com/40"
          alt="Profile"
          className="w-10 h-10 rounded-full border border-gray-600"
        />
        <span className="font-medium">Admin Name</span>
      </div>
    </header>
  );
};

export default Header;
