"use client";

import React from "react";
import Link from "next/link";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-gray-100 h-screen p-4 shadow-md">
      <nav>
        <ul className="space-y-4">
          <li>
            <Link
              href="/dashboard"
              className="text-gray-800 hover:text-blue-600"
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link href="/blogs" className="text-gray-800 hover:text-blue-600">
              Blogs
            </Link>
          </li>
          <li>
            <Link href="/users" className="text-gray-800 hover:text-blue-600">
              Users
            </Link>
          </li>
          <li>
            <Link
              href="/settings"
              className="text-gray-800 hover:text-blue-600"
            >
              Settings
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
