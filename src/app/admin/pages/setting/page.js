"use client";

import React, { useState } from "react";
import { FiSave, FiX } from "react-icons/fi";

const SettingsPage = () => {
  const [settings, setSettings] = useState({
    siteTitle: "Admin Panel",
    siteDescription: "Manage your website settings here.",
    theme: "light",
    emailNotifications: true,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings((prevSettings) => ({
      ...prevSettings,
      [name]: value,
    }));
  };

  const handleToggle = (e) => {
    const { name, checked } = e.target;
    setSettings((prevSettings) => ({
      ...prevSettings,
      [name]: checked,
    }));
  };

  const handleSave = () => {
    // You would typically save settings to your database here.
    alert("Settings saved!");
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-4 text-gray-800">Settings</h1>

      <div className="bg-white shadow-md rounded-lg p-6">
        <form>
          {/* Site Title */}
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-600"
              htmlFor="siteTitle"
            >
              Site Title
            </label>
            <input
              type="text"
              id="siteTitle"
              name="siteTitle"
              value={settings.siteTitle}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Site Description */}
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-600"
              htmlFor="siteDescription"
            >
              Site Description
            </label>
            <textarea
              id="siteDescription"
              name="siteDescription"
              value={settings.siteDescription}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
            />
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleSave}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              <FiSave className="inline-block mr-2" />
              Save Settings
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SettingsPage;
