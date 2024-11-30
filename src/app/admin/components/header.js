"use client";

import React from "react";
import Link from "next/link";
const Header = () => {
  return (
    <header className="flex items-center justify-between px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg">
      {/* Logo */}
      <Link href="/admin/pages/dashboard">
        <div className="text-2xl font-extrabold tracking-wider">
          Admin<span className="text-yellow-300"> Dashboard</span>
        </div>
      </Link>

      {/* Profile Section */}
      <div className="flex items-center space-x-4">
        <span className="font-medium">Admin Name</span>
        <img
          src="https://via.placeholder.com/40"
          alt="Profile"
          className="w-10 h-10 rounded-full border-2 border-yellow-300"
        />
      </div>
    </header>
  );
};

export default Header;
