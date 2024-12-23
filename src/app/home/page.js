"use client";
import Link from "next/link";
import React, { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";

// import {
//   fetchBlogRequest,
//   deleteBlogRequest,
//   resetState,
// } from "../../../store/blog/blogSlice";
// import { STATUS_SUCCEEDED } from "../../constants/status";
const HomePage = () => {
  const {
    data: blogs,
    status,
    error,
    image_path,
  } = useSelector((state) => state.blog);

  const popularBlogs = [
    {
      id: 1,
      title: "Understanding React Lifecycle",
    },
    {
      id: 2,
      title: "Top 10 JavaScript Libraries in 2024",
    },
    {
      id: 3,
      title: "CSS Grid vs Flexbox: When to Use Which?",
    },
    {
      id: 4,
      title: "Mastering Laravel for Backend Development",
    },
  ];

  const tags = ["React", "JavaScript", "CSS", "Laravel", "Backend", "Frontend"];

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col md:flex-row">
        {/* Blog Posts Section */}
        <div className="w-full md:w-3/4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <Link key={blog.id} href={`/blog/${blog.id}`}>
              <div className="cursor-pointer bg-white shadow-md rounded-md overflow-hidden">
                <img
                  src={
                    blog.image instanceof File
                      ? URL.createObjectURL(blog.image) // Preview for new uploads
                      : `${image_path}/${blog.image}` // Existing image path from server
                  }
                  alt="Uploaded preview"
                  className="mt-2 rounded border border-gray-300 shadow-sm"
                  style={{
                    width: "50%", // Set desired width
                    height: "50%", // Set desired height
                    // objectFit: "cover", // Ensures image fits within the dimensions
                  }}
                />
                <div className="p-4">
                  <h2 className="text-lg font-semibold hover:text-blue-600 transition">
                    {blog.title}
                  </h2>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Sidebar Section */}
        <div className="w-full md:w-1/4 mt-6 md:mt-0 md:ml-6">
          {/* Popular Blogs */}
          <div className="bg-white shadow-md rounded-md p-4 mb-6">
            <h3 className="text-xl font-semibold mb-4">Popular Blogs</h3>
            <ul className="space-y-2">
              {popularBlogs.map((blog, index) => (
                <li
                  key={index}
                  className="text-blue-600 hover:underline cursor-pointer"
                >
                  <Link key={blog.id} href={`/blog/${blog.id}`}>
                    {blog.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tags */}
          <div className="bg-white shadow-md rounded-md p-4">
            <h3 className="text-xl font-semibold mb-4">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-200 text-sm rounded-full cursor-pointer hover:bg-gray-300"
                >
                  <Link href={`/tags/${tag.toLowerCase()}`}>{tag}</Link>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
