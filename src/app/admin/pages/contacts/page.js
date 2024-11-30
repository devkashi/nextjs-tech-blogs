"use client";

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FiEdit, FiTrash } from "react-icons/fi";
import Link from "next/link";
import { fetchMessagesRequest } from "../../../store/contact/contactSlice";

const ContactListPage = () => {
  const dispatch = useDispatch();

  // Fetch contact messages from the Redux store
  const {
    data: messages,
    currentPage,
    lastPage,
    totalCount,
    perPage,
    status,
    error,
    next_page_url,
  } = useSelector((state) => state.contact);

  // Pagination state
  const [pageIndex, setPageIndex] = useState(currentPage - 1); // Zero-based index
  const [pageSize, setPageSize] = useState(perPage);

  useEffect(() => {
    dispatch(fetchMessagesRequest({ pageIndex: pageIndex + 1, pageSize }));
  }, [dispatch, pageIndex, pageSize]);

  // Handle page change
  const handlePageChange = (newPageIndex) => {
    setPageIndex(newPageIndex);
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-semibold mb-6 text-gray-800">
        Messages List
      </h1>

      {status === "loading" && (
        <div className="text-lg text-gray-600">Loading...</div>
      )}
      {error && <div className="text-lg text-red-500">{error}</div>}

      <table className="min-w-full table-auto border-collapse rounded-lg bg-white shadow-lg overflow-hidden">
        <thead>
          <tr className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
            <th className="px-6 py-4 text-left text-sm font-medium">ID</th>
            <th className="px-6 py-4 text-left text-sm font-medium">Name</th>
            <th className="px-6 py-4 text-left text-sm font-medium">Email</th>
            <th className="px-6 py-4 text-left text-sm font-medium">Message</th>
            <th className="px-6 py-4 text-left text-sm font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {messages?.map((message) => (
            <tr
              key={message.id}
              className="border-b hover:bg-gray-50 transition duration-300"
            >
              <td className="px-6 py-4 text-sm text-gray-700">{message.id}</td>
              <td className="px-6 py-4 text-sm text-gray-700">
                {message.name}
              </td>
              <td className="px-6 py-4 text-sm text-gray-700">
                {message.email}
              </td>
              <td className="px-6 py-4 text-sm text-gray-700">
                {message.message}
              </td>
              <td className="px-6 py-4 text-sm text-gray-700">
                <div className="flex space-x-4">
                  <Link
                    href={`/admin/pages/blog/edit/${message.id}`}
                    className="text-blue-600 hover:text-blue-800 transition duration-200"
                  >
                    <FiEdit className="inline-block text-xl" />
                  </Link>
                  <button
                    onClick={() =>
                      console.log(`Deleting message with ID: ${message.id}`)
                    }
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
        Showing {messages.length} of {totalCount} messages
      </div>
    </div>
  );
};

export default ContactListPage;
