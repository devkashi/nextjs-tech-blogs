import React from "react";
import Link from "next/link";
const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        {/* Logo and Copyright */}
        <div className="mb-4 md:mb-0 text-center md:text-left">
          <h2 className="text-xl font-bold">MyLogo</h2>
          <p className="text-sm mt-1">© 2024 MyLogo. All rights reserved.</p>
        </div>

        {/* Links */}
        <div className="flex space-x-6">
          <a
            href="#privacy"
            className="text-white hover:text-gray-300 text-sm transition"
          >
            Privacy Policy
          </a>

          <Link
            href="/admin/auth"
            className="text-white hover:text-gray-300 text-sm transition"
          >
            Admin Login
          </Link>

          <a
            href="#contact"
            className="text-white hover:text-gray-300 text-sm transition"
          >
            Contact Us
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
