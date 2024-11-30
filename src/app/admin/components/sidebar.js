"use client";

import React from "react";
import Link from "next/link";
import { FiHome, FiFileText, FiUsers, FiSettings } from "react-icons/fi";

const Sidebar = () => {
  return (
    <aside className="w-72 bg-white h-screen p-6 shadow-lg">
      <h2 className="text-xl font-bold text-gray-700 mb-6">Navigation</h2>
      <nav>
        <ul className="space-y-6">
          <li>
            <Link href="/dashboard">
              <div className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 hover:bg-blue-100 px-4 py-2 rounded-lg transition duration-200">
                <FiHome className="text-xl" />
                <span className="font-medium">Dashboard</span>
              </div>
            </Link>
          </li>
          <li>
            <Link href="/blogs">
              <div className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 hover:bg-blue-100 px-4 py-2 rounded-lg transition duration-200">
                <FiFileText className="text-xl" />
                <span className="font-medium">Blogs</span>
              </div>
            </Link>
          </li>
          <li>
            <Link href="/users">
              <div className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 hover:bg-blue-100 px-4 py-2 rounded-lg transition duration-200">
                <FiUsers className="text-xl" />
                <span className="font-medium">Users</span>
              </div>
            </Link>
          </li>
          <li>
            <Link href="/settings">
              <div className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 hover:bg-blue-100 px-4 py-2 rounded-lg transition duration-200">
                <FiSettings className="text-xl" />
                <span className="font-medium">Settings</span>
              </div>
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
