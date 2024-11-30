"use client";

import React from "react";

import Sidebar from "../../components/sidebar";

const DashboardPage = () => {
  // Mock data for KPIs
  const kpiData = {
    blogs: 120,
    users: 45,
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <main className="flex-1 p-6 bg-gray-50">
          <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* KPI: Blogs */}
            <div className="bg-white shadow-md rounded-lg p-6 text-center">
              <h2 className="text-lg font-semibold text-gray-700">
                Total Blogs
              </h2>
              <p className="text-4xl font-bold text-blue-600">
                {kpiData.blogs}
              </p>
            </div>

            {/* KPI: Users */}
            <div className="bg-white shadow-md rounded-lg p-6 text-center">
              <h2 className="text-lg font-semibold text-gray-700">
                Total Users
              </h2>
              <p className="text-4xl font-bold text-green-600">
                {kpiData.users}
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;
