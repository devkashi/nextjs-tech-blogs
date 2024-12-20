"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation"; // Import the router hook
import { sendLoginRequest } from "../../store/login/loginSlice";

const AdminLoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const dispatch = useDispatch();

  const router = useRouter(); // Initialize the router hook

  // const { status, error, message, data } = useSelector((state) => state.login);

  // save the users data in the formdata
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("formData ", formData);
    dispatch(sendLoginRequest(formData));
  };
  // Check for token in localStorage on component load
  useEffect(() => {
    const token = localStorage.getItem("user_token"); // Replace "authToken" with your token key
    if (token) {
      router.push("/admin/pages/dashboard"); // Redirect to dashboard
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-4">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Admin Login
        </h1>
        <form onSubmit={handleSubmit}>
          {/* Email Input */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-2"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>
          {/* Password Input */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
            />
          </div>
          {/* Submit Button */}
          <div className="mb-4">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-medium px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300"
            >
              Login
            </button>
          </div>
          {/* Forgot Password and Back to Website */}
          <div className="text-center mt-6">
            <Link
              href="/admin/forgot-password"
              className="inline-block bg-gray-100 text-blue-600 font-medium px-4 py-2 rounded-lg hover:bg-blue-600 hover:text-white transition duration-300 mx-2"
            >
              Forgot Password?
            </Link>
            <Link
              href="/"
              className="inline-block bg-gray-100 text-green-600 font-medium px-4 py-2 rounded-lg hover:bg-green-600 hover:text-white transition duration-300 mx-2"
            >
              Back to Website
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginPage;
