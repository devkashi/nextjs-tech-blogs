import React from "react";
import FrontendLayout from "../frontend/layout/frontendLayout";

const ContactPage = () => {
  return (
    <FrontendLayout>
      <div className="min-h-screen bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center p-6">
        <div className="bg-white text-gray-800 rounded-lg shadow-lg p-8 w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Content Section */}
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl font-bold text-blue-600 mb-4">
              Let's Get in Touch
            </h1>
            <p className="text-gray-600 mb-8">
              We would love to hear from you! Whether you have a question, a
              suggestion, or just want to say hi, feel free to reach out to us.
              Fill in the form below and we’ll respond as quickly as we can.
            </p>
            <form className="space-y-6">
              {/* Name Field */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-2"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter your name"
                  className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-2"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              {/* Message Field */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  placeholder="Write your message here"
                  className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 rounded-lg font-semibold text-lg hover:opacity-90 transition-opacity"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Image Section */}
          <div className="flex items-center justify-center">
            <img
              src="https://via.placeholder.com/400x400"
              alt="Contact Us Illustration"
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </FrontendLayout>
  );
};

export default ContactPage;
