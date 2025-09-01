import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full py-4 px-15 flex justify-between items-center bg-transparent">
      {/* Name / Logo */}
      <h1 className="text-xl font-semibold text-gray-800 hover:text-blue-500 cursor-pointer transition">
        Muhammad Muneeb Khan
      </h1>

      {/* Desktop Links */}
      <div className="hidden md:flex space-x-8 text-gray-700 font-medium">
        <a href="#about" className="hover:text-blue-500 transition">
          About
        </a>
        <a href="#projects" className="hover:text-blue-500 transition">
          Projects
        </a>
        <a href="#contact" className="hover:text-blue-500 transition">
          Contact
        </a>
      </div>

      {/* Mobile Hamburger */}
      <button
        className="md:hidden text-2xl text-gray-800 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? "✖" : "☰"}
      </button>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md flex flex-col items-center space-y-4 py-6 md:hidden z-1">
          <a
            href="#about"
            className="hover:text-blue-500 transition"
            onClick={() => setIsOpen(false)}
          >
            About
          </a>
          <a
            href="#projects"
            className="hover:text-blue-500 transition"
            onClick={() => setIsOpen(false)}
          >
            Projects
          </a>
          <a
            href="#contact"
            className="hover:text-blue-500 transition"
            onClick={() => setIsOpen(false)}
          >
            Contact
          </a>
        </div>
      )}
    </nav>
  );
}
