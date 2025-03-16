"use client";
import React, { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "next/navigation";
import FrontendLayout from "@/app/frontend/layout/frontendLayout";
import { fetchSingleBlogRequest } from "../../store/blog/blogSlice";

const BlogDetailPage = () => {
  const {
    data: blogs,
    status,
    error,
    single_image_path,
    single_blog_data,
  } = useSelector((state) => state.blog);

  const { id } = useParams(); // Get the dynamic 'id' parameter
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSingleBlogRequest(id));
  }, [dispatch, id]);
  // Sample blog data (to be fetched dynamically in a real scenario)

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
                src={
                  single_blog_data.image instanceof File
                    ? URL.createObjectURL(single_blog_data.image)
                    : `${single_image_path}/${single_blog_data.image}`
                }
                alt="Uploaded preview"
                className="mt-2 rounded border border-gray-300 shadow-sm"
                style={{ width: "100%", height: "100%" }}
              />
              <div className="flex items-center p-4">
                <button className="text-red-500 hover:text-white-700">
                  ❤️
                </button>
                <input
                  type="text"
                  placeholder="Add a comment..."
                  className="ml-4 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="p-6">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">
                  {single_blog_data.title}
                </h1>
                <p className="text-gray-600">{single_blog_data.content}</p>
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
