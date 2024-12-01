"use client";

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FiEdit, FiTrash } from "react-icons/fi";
import DeleteModal from "../../components/modal/confirmDelete";
import ContactAddOrUpdateModal from "./components/ContactAddOrUpdateModal";
import {
  fetchMessagesRequest,
  deleteMessageRequest,
} from "../../../store/contact/contactSlice";
import { STATUS_SUCCEEDED } from "../../constants/status";

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
  // delete state
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [activeId, setActiveId] = useState(false);
  const [oldFormData, setOldFormData] = useState({});
  const [activeForm, setActiveForm] = useState("ADD");

  useEffect(() => {
    dispatch(fetchMessagesRequest({ pageIndex: pageIndex + 1, pageSize }));
  }, [dispatch, pageIndex, pageSize]);

  // Handle page change
  const handlePageChange = (newPageIndex) => {
    setPageIndex(newPageIndex);
  };

  // Handle Add Contact button click
  const handleAddContact = () => {
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
    dispatch(deleteMessageRequest(id));
    if (status === STATUS_SUCCEEDED) {
      dispatch(fetchMessagesRequest({ pageIndex: pageIndex, pageSize }));
    }
  };

  const handleEditModal = (oldFormValues) => {
    setActiveForm("UPDATE");
    setOldFormData(oldFormValues);
    setActiveId(oldFormValues.id);
    setOpen2(true);
  };
  return (
    <div className="container mx-auto p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">Messages List</h1>
        <button
          onClick={handleAddContact} // Handle button click for adding contact
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
                  {/* edit  */}
                  <button
                    onClick={() => handleEditModal(message)}
                    className="text-blue-600 hover:text-blue-800 transition duration-200"
                  >
                    <FiEdit className="inline-block text-xl" />
                  </button>
                  {/* delete */}
                  <button
                    // onClick={() =>
                    //   console.log(`Editing message with ID: ${message.id}`)
                    // }
                    onClick={() => handleDeleteModal(message.id)}
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

      {/* modal */}

      {/* delete modal */}
      <DeleteModal
        open={open}
        setOpen={setOpen}
        id={activeId}
        cancelButtonName="Cancel"
        confirmButtonName="Delete"
        title="Delete Message"
        contents="Are you sure you want to delete this message?"
        handleDelete={handleDelete}
      />

      <ContactAddOrUpdateModal
        open={open2}
        setOpen={setOpen2}
        id={activeId}
        cancelButtonName="Cancel"
        confirmButtonName="Submit"
        title="Create New Message"
        contents="Please fill in the form below to create a new message."
        pageIndex={pageIndex}
        pageSize={pageSize}
        oldFormData={oldFormData}
        activeForm={activeForm}
      />
    </div>
  );
};

export default ContactListPage;
