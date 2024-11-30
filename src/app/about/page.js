import React from "react";
import FrontendLayout from "../frontend/layout/frontendLayout";

const AboutPage = () => {
  return (
    <FrontendLayout>
      <div className="container mx-auto p-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-800">
            About <span className="text-blue-600">Us</span>
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Meet the minds behind this blog website. Learn more about our
            mission and the people who bring it to life.
          </p>
        </div>

        {/* About the Developer Section */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg rounded-lg p-8 mb-12">
          <h2 className="text-3xl font-semibold mb-6 text-center">
            About the Developer
          </h2>
          <div className="flex flex-col md:flex-row items-center">
            {/* Developer Image */}
            <img
              src="https://via.placeholder.com/150"
              alt="Developer"
              className="w-40 h-40 rounded-full shadow-lg mb-6 md:mb-0 md:mr-8 border-4 border-white"
            />
            {/* Developer Details */}
            <div>
              <p className="text-lg leading-relaxed">
                Hi! I'm <strong>Kashish Kumari</strong>, the developer of this
                blog website. With over 3 years of experience in web
                development, I specialize in creating robust backend systems and
                seamless user experiences. My expertise includes technologies
                like Laravel, React, and Tailwind CSS.
              </p>
              <p className="text-sm mt-4 italic">
                "Coding is not just a profession for me, it's a passion!"
              </p>
              <p className="mt-2 text-sm">Location: Patna, India</p>
            </div>
          </div>
        </div>

        {/* About the Owner Section */}
        <div className="bg-gray-100 shadow-md rounded-lg p-8">
          <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">
            About the Owner
          </h2>
          <div className="flex flex-col md:flex-row items-center">
            {/* Owner Image */}
            <img
              src="https://via.placeholder.com/150"
              alt="Owner"
              className="w-40 h-40 rounded-full shadow-lg mb-6 md:mb-0 md:mr-8 border-4 border-gray-300"
            />
            {/* Owner Details */}
            <div>
              <p className="text-lg text-gray-700 leading-relaxed">
                Welcome! I'm <strong>John Doe</strong>, the proud owner of this
                blog website. Our mission is to create a platform where
                developers, enthusiasts, and learners can come together to share
                knowledge and inspiration. We aim to empower the community
                through high-quality, engaging content.
              </p>
              <p className="text-sm mt-4 italic text-gray-500">
                "Inspiration starts with sharing!"
              </p>
            </div>
          </div>
        </div>
      </div>
    </FrontendLayout>
  );
};

export default AboutPage;
