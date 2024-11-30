"use client";
import React from "react";
import { useParams } from "next/navigation";
import FrontendLayout from "@/app/frontend/layout/frontendLayout";

const BlogDetailPage = () => {
  const { id } = useParams(); // Get the dynamic 'id' parameter

  // Sample blog data (to be fetched dynamically in a real scenario)
  const blog = {
    id: id,
    title: `Blog Post #${id}`,
    image: "https://via.placeholder.com/800x400",
    content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
              Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
              nisi ut aliquip ex ea commodo consequat.`,
  };

  const popularBlogs = [
    "React vs Angular: A Detailed Comparison",
    "Why Tailwind CSS is a Game Changer",
    "How to Build a Full-Stack App with Laravel and React",
  ];

  const tags = ["React", "JavaScript", "CSS", "Laravel", "Backend", "Frontend"];

  return (
    <FrontendLayout>
      {" "}
      <div className="container mx-auto p-6">
        <div className="flex flex-col md:flex-row">
          {/* Main Blog Content */}
          <div className="w-full md:w-3/4">
            <div className="bg-white shadow-md rounded-md overflow-hidden">
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-60 object-cover"
              />
              <div className="p-6">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">
                  {blog.title}
                </h1>
                <p className="text-gray-600">{blog.content}</p>
              </div>
            </div>
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
                    <a href={`/blog/popular/${index}`}>{blog}</a>
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
                    <a href={`/tags/${tag.toLowerCase()}`}>{tag}</a>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </FrontendLayout>
  );
};

export default BlogDetailPage;
