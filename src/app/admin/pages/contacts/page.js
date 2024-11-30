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
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-4 text-gray-800">
        Messages List
      </h1>

      {status === "loading" && <div>Loading...</div>}
      {error && <div className="text-red-500">{error}</div>}

      <table className="min-w-full table-auto border-collapse rounded-lg bg-white shadow-md">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 border-b-2 border-gray-200">
              ID
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 border-b-2 border-gray-200">
              Name
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 border-b-2 border-gray-200">
              Email
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 border-b-2 border-gray-200">
              Message
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 border-b-2 border-gray-200">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {messages?.map((message) => (
            <tr key={message.id} className="border-b hover:bg-gray-50">
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
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <FiEdit className="inline-block text-xl" />
                  </Link>
                  <button
                    onClick={() =>
                      console.log(`Deleting message with ID: ${message.id}`)
                    }
                    className="text-red-500 hover:text-red-700"
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
      <div className="mt-6 flex items-center justify-start space-x-4">
        <button
          onClick={() => handlePageChange(pageIndex - 1)} // Previous page
          disabled={pageIndex === 0}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 disabled:opacity-50"
        >
          {"<"}
        </button>
        <span className="text-sm text-gray-600">
          Page {pageIndex + 1} of {lastPage}
        </span>
        <button
          onClick={() => handlePageChange(pageIndex + 1)} // Next page
          disabled={!next_page_url} // Disable "Next" if next_page_url is null
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 disabled:opacity-50"
        >
          {">"}
        </button>
      </div>

      <div className="mt-4 text-sm text-gray-600">
        Showing {messages.length} of {totalCount} rows
      </div>
    </div>
  );
};

export default ContactListPage;
