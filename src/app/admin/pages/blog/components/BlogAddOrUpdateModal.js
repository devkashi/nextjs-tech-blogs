"use client";

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";

import { STATUS_SUCCEEDED } from "../../../constants/status";
import { toast } from "react-toastify";
import {
  sendBlogRequest,
  updateBlogRequest,
  fetchBlogRequest,
  resetState,
} from "../../../../store/blog/blogSlice";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AlertComponent from "../../../components/alert/alert";

export default function BlogAddOrUpdateModal({
  open,
  setOpen,
  cancelButtonName,
  confirmButtonName,
  title,
  contents,
  pageIndex,
  pageSize,
  oldFormData,
  activeForm,
}) {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    title: "",
    image: "",
    content: "",
  });

  const { status, message, error, image_path } = useSelector(
    (state) => state.blog
  );

  useEffect(() => {
    if (activeForm === "UPDATE") {
      setFormData(oldFormData);
    } else {
      setFormData({
        title: "",
        image: "",
        content: "",
      });
    }
  }, [activeForm, oldFormData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = () => {
    if (!formData.title || !formData.image || !formData.content) {
      toast.error("All fields are required.");
      return;
    }

    if (activeForm === "UPDATE") {
      dispatch(updateBlogRequest(formData));

      if (status === STATUS_SUCCEEDED) {
        toast.success("Blog updated successfully!");
      }
    } else {
      dispatch(sendBlogRequest(formData));

      if (status === STATUS_SUCCEEDED) {
        toast.success("Blog added successfully!");
      }
    }

    if (status === STATUS_SUCCEEDED) {
      dispatch(fetchBlogRequest({ pageIndex: pageIndex, pageSize }));
    }

    setFormData({
      title: "",
      image: "",
      content: "",
    });
    setOpen(false);
  };
  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    setFormData((prev) => ({
      ...prev,
      image: file, // Save the file object to the state
    }));
  };

  console.log("oldformdata ", oldFormData);
  console.log("iamgePath ", image_path);
  return (
    <Dialog open={open} onClose={setOpen} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
          <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-white px-6 pb-6 pt-5 sm:p-8">
              <div className="text-center sm:text-left">
                <DialogTitle
                  as="h3"
                  className="text-lg font-semibold text-gray-900"
                >
                  {title}
                </DialogTitle>
                <div className="mt-6">
                  <form>
                    {/* Name Field */}
                    <div className="mb-4">
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Title
                      </label>
                      <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        className="w-full mt-1 block rounded-md border border-gray-300 bg-gray-50 px-4 py-2 text-sm shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-300"
                      />
                    </div>
                    {/* image Field */}
                    <div className="mb-4">
                      <label
                        htmlFor="image"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Upload Image
                      </label>
                      <input
                        type="file"
                        id="image"
                        name="image"
                        onChange={handleFileInputChange}
                        className="w-full mt-1 block rounded-md border border-gray-300 bg-gray-50 px-4 py-2 text-sm shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-300"
                      />
                      {formData.image && (
                        <img
                          src={
                            formData.image instanceof File
                              ? URL.createObjectURL(formData.image) // Preview for new uploads
                              : `${image_path}/${formData.image}` // Existing image path from server
                          }
                          alt="Uploaded preview"
                          className="mt-2 rounded border border-gray-300 shadow-sm"
                          style={{
                            width: "200px", // Set desired width
                            height: "250px", // Set desired height
                            // objectFit: "cover", // Ensures image fits within the dimensions
                          }}
                        />
                      )}
                    </div>

                    {/* Message Field */}
                    <div className="mb-4">
                      <label
                        htmlFor="content"
                        className="block text-sm font-medium text-gray-700"
                      >
                        content
                      </label>
                      <textarea
                        id="content"
                        name="content"
                        value={formData.content}
                        onChange={handleInputChange}
                        rows={4}
                        className="w-full mt-1 block rounded-md border border-gray-300 bg-gray-50 px-4 py-2 text-sm shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-300"
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-6 py-3 sm:flex sm:flex-row-reverse">
              <button
                type="button"
                onClick={handleFormSubmit}
                className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 sm:ml-3 sm:w-auto"
              >
                {confirmButtonName}
              </button>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              >
                {cancelButtonName}
              </button>
            </div>
          </DialogPanel>
        </div>

        {/* {(message || error) && (
          <AlertComponent
            key={message || error} // Ensure the AlertComponent re-renders
            message={message || error}
            type={status === STATUS_SUCCEEDED ? "success" : "error"}
          />
        )} */}

        {/* ToastContainer for react-toastify */}
        <ToastContainer />
      </div>
    </Dialog>
  );
}
