"use client";

import React from "react";
import Link from "next/link";
import {
  FiHome,
  FiFileText,
  FiUsers,
  FiSettings,
  FiLogOut,
  FiPlus,
  FiList,
} from "react-icons/fi";

const Sidebar = () => {
  return (
    <aside className="w-72 bg-white h-screen p-6 shadow-lg flex flex-col justify-between">
      <div>
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
            <li className="relative group">
              {/* Parent Blogs Link */}
              <div className="flex items-center justify-between space-x-3 text-gray-700 hover:text-blue-600 hover:bg-blue-100 px-4 py-2 rounded-lg transition duration-200">
                <div className="flex items-center space-x-3">
                  <FiFileText className="text-xl" />
                  <span className="font-medium">Blogs</span>
                </div>
                {/* Arrow Icon (Optional for indication) */}
                <span className="group-hover:rotate-90 transform transition-transform duration-200">
                  ▼
                </span>
              </div>

              {/* Submenu */}
              <ul className="hidden group-hover:block bg-gray-50 rounded-lg mt-2 px-2 space-y-1">
                <li>
                  <Link href="/admin/pages/blog/list">
                    <div className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 hover:bg-blue-100 px-4 py-2 rounded-lg transition duration-200">
                      <FiList className="text-lg" />
                      <span>List View</span>
                    </div>
                  </Link>
                </li>
              </ul>
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
      </div>

      {/* Logout Button */}
      <div>
        <button className="flex items-center justify-center space-x-3 w-full bg-red-500 text-white font-medium px-4 py-2 rounded-lg hover:bg-red-600 transition duration-200">
          <FiLogOut className="text-xl" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
