"use client";
import React from "react";
import Link from "next/link";

const HomePage = () => {
  const blogs = [
    {
      id: 1,
      title: "Understanding React Lifecycle",
      image: "https://via.placeholder.com/300x200",
    },
    {
      id: 2,
      title: "Top 10 JavaScript Libraries in 2024",
      image: "https://via.placeholder.com/300x200",
    },
    {
      id: 3,
      title: "CSS Grid vs Flexbox: When to Use Which?",
      image: "https://via.placeholder.com/300x200",
    },
    {
      id: 4,
      title: "Mastering Laravel for Backend Development",
      image: "https://via.placeholder.com/300x200",
    },
  ];

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
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-40 object-cover"
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
