"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import DeleteModal from "../../components/modal/confirmDelete";
import BlogAddOrUpdateModal from "./components/BlogAddOrUpdateModal.js";

import {
  fetchBlogRequest,
  deleteBlogRequest,
  resetState,
} from "../../../store/blog/blogSlice";
import { STATUS_SUCCEEDED } from "../../constants/status";

import { FiEdit, FiTrash } from "react-icons/fi";
import Link from "next/link";

const BlogListPage = () => {
  const dispatch = useDispatch();

  // Fetch contact messages from the Redux store
  const {
    data: blog,
    currentPage,
    lastPage,
    totalCount,
    perPage,
    status,
    error,
    next_page_url,
  } = useSelector((state) => state.blog);

  // Pagination state
  const [pageIndex, setPageIndex] = useState(currentPage - 1); // Zero-based index
  const [pageSize, setPageSize] = useState(perPage);
  // delete state
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [activeId, setActiveId] = useState(false);
  const [oldFormData, setOldFormData] = useState({});
  const [activeForm, setActiveForm] = useState("ADD");
  const [title, setTitle] = useState("ADD Blog");
  //  to reset all state by default
  useEffect(() => {
    dispatch(resetState());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchBlogRequest({ pageIndex: pageIndex + 1, pageSize }));
  }, [dispatch, pageIndex, pageSize]);

  // Handle page change
  const handlePageChange = (newPageIndex) => {
    setPageIndex(newPageIndex);
  };

  // Handle Add Contact button click
  const handleAddBlog = () => {
    setActiveForm("ADD");
    setOpen2(true);
  };

  // code to open the modal for delete
  const handleDeleteModal = (id) => {
    setActiveId(id);
    setOpen(true);
  };
  // // delete call through reducer action call
  const handleDelete = (id) => {
    dispatch(deleteBlogRequest(id));
    if (status === STATUS_SUCCEEDED) {
      dispatch(fetchBlogRequest({ pageIndex: pageIndex, pageSize }));
    }
  };

  const handleEditModal = (oldFormValues) => {
    setActiveForm("UPDATE");

    setOldFormData(oldFormValues);
    setOpen2(true);
  };

  return (
    <div className="container mx-auto p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">Blog List</h1>
        <button
          onClick={handleAddBlog} // Handle button click for adding contact
          className="px-6 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition duration-300"
        >
          Add Contact
        </button>
      </div>

      {status === "loading" && (
        <div className="text-lg text-gray-600">Loading...</div>
      )}
      {error && <div className="text-lg text-red-500">{error}</div>}

      <table className="min-w-full table-auto border-collapse rounded-lg bg-white shadow-lg overflow-hidden">
        <thead>
          <tr className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
            <th className="px-6 py-4 text-left text-sm font-medium">ID</th>
            <th className="px-6 py-4 text-left text-sm font-medium">Title </th>
            <th className="px-6 py-4 text-left text-sm font-medium">Content</th>
            <th className="px-6 py-4 text-left text-sm font-medium">status</th>
            <th className="px-6 py-4 text-left text-sm font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {blog?.map((blg) => (
            <tr
              key={blg.id}
              className="border-b hover:bg-gray-50 transition duration-300"
            >
              <td className="px-6 py-4 text-sm text-gray-700">{blg.id}</td>
              <td className="px-6 py-4 text-sm text-gray-700">{blg.title}</td>
              <td className="px-6 py-4 text-sm text-gray-700">{blg.content}</td>
              <td className="px-6 py-4 text-sm text-gray-700">{blg.status}</td>
              <td className="px-6 py-4 text-sm text-gray-700">
                <div className="flex space-x-4">
                  {/* edit  */}
                  <button
                    onClick={() => handleEditModal(blg)}
                    className="text-blue-600 hover:text-blue-800 transition duration-200"
                  >
                    <FiEdit className="inline-block text-xl" />
                  </button>
                  {/* delete */}
                  <button
                    // onClick={() =>
                    //   console.log(`Editing message with ID: ${message.id}`)
                    // }
                    onClick={() => handleDeleteModal(blg.id)}
                    className="text-red-600 hover:text-red-800 transition duration-200"
                  >
                    <FiTrash className="inline-block text-xl" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="mt-8 flex items-center justify-center space-x-6">
        <button
          onClick={() => handlePageChange(pageIndex - 1)} // Previous page
          disabled={pageIndex === 0}
          className="px-5 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 disabled:opacity-50 transition duration-300"
        >
          {"<"}
        </button>
        <span className="text-sm text-gray-600">
          Page {pageIndex + 1} of {lastPage}
        </span>
        <button
          onClick={() => handlePageChange(pageIndex + 1)} // Next page
          disabled={!next_page_url}
          className="px-5 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 disabled:opacity-50 transition duration-300"
        >
          {">"}
        </button>
      </div>

      <div className="mt-4 text-sm text-gray-600">
        Showing {blog.length} of {totalCount} messages
      </div>

      {/* modal */}

      <DeleteModal
        open={open}
        setOpen={setOpen}
        id={activeId}
        cancelButtonName="Cancel"
        confirmButtonName="Delete"
        title="Delete Message"
        contents="Are you sure you want to delete this blog?"
        handleDelete={handleDelete}
      />

      <BlogAddOrUpdateModal
        open={open2}
        setOpen={setOpen2}
        cancelButtonName="Cancel"
        confirmButtonName="Submit"
        title="Create New Blog"
        contents="Please fill in the form below to create a new blog."
        pageIndex={pageIndex}
        pageSize={pageSize}
        oldFormData={oldFormData}
        activeForm={activeForm}
      />
    </div>
  );
};

export default BlogListPage;
