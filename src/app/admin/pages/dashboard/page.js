"use client";

import React from "react";
import Sidebar from "../../components/sidebar";

const Dashboard = () => {
  return (
    <div className="flex-1 bg-gray-50 min-h-screen flex flex-col">
      <main className="p-6 flex-grow">
        <h1 className="text-3xl font-bold text-gray-700 mb-6">
          Dashboard Overview
        </h1>

        {/* KPI Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold">Total Blogs</h2>
            <p className="text-4xl font-bold mt-2">120</p>
          </div>
          <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold">Total Users</h2>
            <p className="text-4xl font-bold mt-2">75</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
