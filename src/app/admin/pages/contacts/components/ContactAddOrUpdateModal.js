"use client";

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import {
  sendMessageRequest,
  fetchMessagesRequest,
  updateMessageRequest,
} from "../../../../store/contact/contactSlice";
import { STATUS_SUCCEEDED } from "../../../../admin/constants/status";

export default function ContactAddOrUpdateModal({
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
    name: "",
    email: "",
    message: "",
  });

  const { status } = useSelector((state) => state.contact);

  useEffect(() => {
    if (activeForm === "UPDATE") {
      setFormData(oldFormData);
    } else {
      setFormData({
        name: "",
        email: "",
        message: "",
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
    if (activeForm === "UPDATE") {
      dispatch(updateMessageRequest(formData));
    } else {
      dispatch(sendMessageRequest(formData));
    }

    if (status === STATUS_SUCCEEDED) {
      dispatch(fetchMessagesRequest({ pageIndex: pageIndex, pageSize }));
    }
    setFormData({
      name: "",
      email: "",
      message: "",
    });
    setOpen(false);
  };

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
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full mt-1 block rounded-md border border-gray-300 bg-gray-50 px-4 py-2 text-sm shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-300"
                      />
                    </div>
                    {/* Email Field */}
                    <div className="mb-4">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full mt-1 block rounded-md border border-gray-300 bg-gray-50 px-4 py-2 text-sm shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-300"
                      />
                    </div>
                    {/* Message Field */}
                    <div className="mb-4">
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
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
      </div>
    </Dialog>
  );
}
