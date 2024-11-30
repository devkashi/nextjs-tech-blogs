"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Import useRouter from next/navigation
import { useSelector, useDispatch } from "react-redux";
import { resetState } from "../../store/login/loginSlice";
import {
  FiHome,
  FiFileText,
  FiUsers,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";

const Sidebar = () => {
  const router = useRouter(); // Initialize the router hook
  const dispatch = useDispatch();

  const handleLogout = () => {
    // Remove token and user data from localStorage
    localStorage.removeItem("user_token");
    localStorage.removeItem("user_data");
    dispatch(resetState());
    // Redirect to login page
    router.push("/admin/auth");
  };

  return (
    <aside className="w-72 bg-white h-screen p-6 shadow-lg flex flex-col justify-between">
      <div>
        <h2 className="text-xl font-bold text-gray-700 mb-6">Navigation</h2>
        <nav>
          <ul className="space-y-6">
            <li>
              <Link href="/admin/pages/dashboard">
                <div className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 hover:bg-blue-100 px-4 py-2 rounded-lg transition duration-200">
                  <FiHome className="text-xl" />
                  <span className="font-medium">Dashboard</span>
                </div>
              </Link>
            </li>

            <li>
              <Link href="/admin/pages/blog">
                <div className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 hover:bg-blue-100 px-4 py-2 rounded-lg transition duration-200">
                  <FiFileText className="text-xl" />
                  <span className="font-medium">Blogs</span>
                </div>
              </Link>
            </li>

            <li>
              <Link href="/admin/pages/user">
                <div className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 hover:bg-blue-100 px-4 py-2 rounded-lg transition duration-200">
                  <FiUsers className="text-xl" />
                  <span className="font-medium">Users</span>
                </div>
              </Link>
            </li>

            <li>
              <Link href="/admin/pages/contacts">
                <div className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 hover:bg-blue-100 px-4 py-2 rounded-lg transition duration-200">
                  <FiUsers className="text-xl" />
                  <span className="font-medium">Contacts</span>
                </div>
              </Link>
            </li>

            <li>
              <Link href="/admin/pages/setting">
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
        <button
          onClick={handleLogout} // Call the logout handler
          className="flex items-center justify-center space-x-3 w-full bg-red-500 text-white font-medium px-4 py-2 rounded-lg hover:bg-red-600 transition duration-200"
        >
          <FiLogOut className="text-xl" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
