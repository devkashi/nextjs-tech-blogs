import React from "react";
import Image from "next/image";
import Link from "next/link";

function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-gray-800 text-white">
      {/* Logo Section */}
      <div className="flex items-center">
        <img
          src="https://via.placeholder.com/50"
          alt="Logo"
          className="w-12 h-12 mr-3"
        />
        <Link href="/" className="text-xl font-semibold">
          MyLogo
        </Link>
      </div>

      {/* Menu Section */}
      <nav className="flex space-x-8 text-lg">
        <Link href="/" className="hover:text-gray-300 transition duration-300">
          Home
        </Link>
        <Link
          href="/about"
          className="hover:text-gray-300 transition duration-300"
        >
          About
        </Link>
        <Link
          href="/contact"
          className="hover:text-gray-300 transition duration-300"
        >
          Contact
        </Link>
      </nav>
    </header>
  );
}

export default Header;
