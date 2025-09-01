import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8">
      <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between">
        <div className="mb-4 md:mb-0 text-center md:text-left">
          <h2 className="text-md font-bold text-white">Muhammad Muneeb Khan</h2>
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} All rights reserved.
          </p>
        </div>

        <div className="flex gap-6 mb-4 md:mb-0">
          <a
            href="#contact"
            className="hover:text-white transition transform hover:-translate-y-1"
          >
            Contact
          </a>
          <a
            href="#projects"
            className="hover:text-white transition transform hover:-translate-y-1"
          >
            Projects
          </a>
          <a
            href="#about"
            className="hover:text-white transition transform hover:-translate-y-1"
          >
            About
          </a>
        </div>

        <div className="flex gap-4 text-xl">
          <a
            href={`mailto:${about.email}`}
            className="hover:text-white transition transform hover:-translate-y-1"
          >
            <CiMail />
          </a>
          <a
            href={about.linkedIn}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition transform hover:-translate-y-1"
          >
            <FaLinkedinIn />
          </a>
          <a
            href={about.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition transform hover:-translate-y-1"
          >
            <FaGithub />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
