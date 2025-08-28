import React, { useEffect, useState } from "react";
import axios from "axios";

import MemojiTiltCorrected from "./MemojiTiltCorrected.jsx";
import { FaLinkedinIn, FaGithub } from "react-icons/fa";
import { CiMail } from "react-icons/ci";
import "./Home.css";
import AOS from "aos";
import "aos/dist/aos.css";

function Home() {
  const [about, setAbout] = useState({});
  const [project, setProject] = useState([]);
  const [skill, setSkill] = useState([]);

  const getContent = async () => {
    try {
      const aboutRes = await axios.get(
        "http://localhost:5002/api/content/about"
      );
      setAbout(aboutRes.data[0]);

      const projectRes = await axios.get(
        "http://localhost:5002/api/content/project"
      );
      setProject(projectRes.data);

      const skillRes = await axios.get(
        "http://localhost:5002/api/content/skill"
      );
      setSkill(skillRes.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getContent();
    AOS.init({
      duration: 1200,

      easing: "ease-in-out",
    });
  }, []);

  return (
    <div>
      {/* Top Section */}
      <section className="topSection flex flex-col items-center gap-8 px-6 sm:px-10 md:px-20 lg:px-40 py-16 md:py-24 text-center bg-gradient-to-b from-white to-gray-50">
        <h1
          className="text-xl sm:text-4xl md:text-2xl font-bold text-gray-900"
          data-aos="fade-down"
        >
          Hi! I am {about?.name} 👋
        </h1>
        <p
          className="text-lg sm:text-xl md:text-4xl text-gray-600 "
          data-aos="fade-up"
          data-aos-delay="200"
        >
          {about?.title}
        </p>
        <div data-aos="zoom-in" data-aos-delay="400">
          <MemojiTiltCorrected className="shadow-lg rounded-full p-2 hover:scale-110 transform transition duration-500" />
        </div>

        {/* Buttons */}
        <div
          className="flex flex-col sm:flex-row gap-4 mt-6"
          data-aos="fade-up"
          data-aos-delay="500"
        >
          <a
            href="#projects"
            className="px-6 py-3 bg-gray-900 text-white rounded-md shadow-md hover:bg-gray-800 transition-colors duration-300 transform hover:-translate-y-1 hover:scale-105"
          >
            Explore Projects
          </a>
          <a
            href="#contact"
            className="px-6 py-3 border-2 border-gray-900 text-gray-900 rounded-md shadow-md hover:bg-gray-900 hover:text-white transition-colors duration-300 transform hover:-translate-y-1 hover:scale-105"
          >
            Get In Touch
          </a>
        </div>
      </section>

      {/* About Section */}
      <section
        className="about max-w-4xl mx-auto px-6 sm:px-10 md:px-20 py-16 md:py-24 text-gray-800"
        id="about"
        data-aos="fade-up"
      >
        <h1
          className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-gray-900 text-center"
          data-aos="fade-down"
        >
          About Me
        </h1>
        <p
          className="text-base sm:text-lg md:text-xl mb-4 leading-relaxed"
          data-aos="fade-right"
        >
          {about.bio}
        </p>
        <p
          className="text-base sm:text-lg md:text-xl mb-8 leading-relaxed"
          data-aos="fade-left"
          data-aos-delay="200"
        >
          I believe in blending creativity with functionality to craft
          experiences that people enjoy using.
        </p>

        <h2
          className="text-2xl sm:text-3xl font-semibold mb-4 text-gray-900 text-center"
          data-aos="fade-up"
          data-aos-delay="400"
        >
          Quick Facts
        </h2>
        <div
          className="flex flex-col items-center text-gray-700 gap-3 mt-6"
          data-aos="fade-up"
          data-aos-delay="500"
        >
          <ul className="list-disc list-inside space-y-2 text-lg sm:text-xl md:text-lg">
            <li>📍 {about.location}</li>
            <li>🎓 {about.education}</li>
          </ul>
        </div>
      </section>

      {/* Projects Section */}
      <section
        id="projects"
        className="projects max-w-6xl mx-auto px-6 sm:px-10 md:px-20 py-16 md:py-24"
        data-aos="fade-up"
      >
        <h1
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 text-center mb-12 tracking-tight"
          data-aos="fade-down"
        >
          Projects
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {project &&
            project.map((p, index) => (
              <div
                key={p._id}
                className="bg-white flex flex-col rounded-2xl shadow-lg overflow-hidden transform hover:-translate-y-3 hover:scale-105 transition-all duration-500"
                data-aos="zoom-in-up"
                data-aos-delay={index * 150}
              >
                {p.img && <img src={p.img} alt={p.title} />}
                <div className="p-6 flex flex-col flex-grow">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                    {p.title}
                  </h2>
                  <p className="text-gray-700 mb-4 flex-grow">{p.desc}</p>
                  <p className="text-gray-600 mb-6">
                    <span className="font-semibold">Tools:</span> {p.tools}
                  </p>
                  <div className="flex flex-wrap gap-3 mt-auto">
                    {p.git && (
                      <a
                        href={p.git}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg shadow-md hover:from-blue-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-300"
                      >
                        GitHub
                      </a>
                    )}
                    <button
                      className={`px-4 py-2 text-white font-semibold rounded-lg shadow-md transition-all duration-300 ${
                        p.demo
                          ? "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 transform hover:scale-105 cursor-pointer"
                          : "bg-gray-300 pointer-events-none cursor-not-allowed"
                      }`}
                      onClick={() => p.demo && window.open(p.demo, "_blank")}
                    >
                      Live Demo
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </section>

      {/* Skills Section */}
      <section
        id="skills"
        className="skills max-w-6xl mx-auto px-6 sm:px-10 md:px-20 py-16 md:py-24"
        data-aos="fade-up"
      >
        <h1
          className="text-4xl font-extrabold text-gray-900 text-center mb-12"
          data-aos="fade-down"
        >
          Skills
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {skill &&
            skill.map((s, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition duration-300 transform hover:-translate-y-1 hover:scale-105"
                data-aos="flip-left"
                data-aos-delay={idx * 100}
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-2">
                  {s.category}
                </h2>
                <div className="flex flex-wrap gap-2 justify-center">
                  {s.Items.map((i, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 px-3 py-1 rounded-full text-sm font-medium text-gray-800 hover:bg-gray-200 transition transform hover:scale-105"
                      data-aos="zoom-in"
                      data-aos-delay={index * 50}
                    >
                      {i}
                    </span>
                  ))}
                </div>
              </div>
            ))}
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="contact py-16 bg-gray-100 text-gray-900"
        data-aos="fade-up"
      >
        <div className="container mx-auto px-6 md:px-12 text-center">
          <h1
            className="text-4xl md:text-5xl font-bold mb-4"
            data-aos="fade-down"
          >
            Contact
          </h1>
          <p
            className="text-xl md:text-2xl mb-2 text-gray-700"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            Let's Work Together
          </p>
          <p
            className="mb-12 max-w-xl mx-auto text-gray-600"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            I’m currently open to freelance projects, collaborations, or
            full-time opportunities.
          </p>

          <div className="contact-info flex justify-center gap-6 md:gap-8 text-3xl md:text-4xl">
            <a
              href={`mailto:${about.email}`}
              className="bg-white p-5 rounded-full shadow-lg hover:bg-blue-600 hover:text-white transition transform hover:-translate-y-1 hover:scale-110"
              data-aos="zoom-in"
            >
              <CiMail />
            </a>
            <a
              href={about.linkedIn}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white p-5 rounded-full shadow-lg hover:bg-blue-600 hover:text-white transition transform hover:-translate-y-1 hover:scale-110"
              data-aos="zoom-in"
              data-aos-delay="100"
            >
              <FaLinkedinIn />
            </a>
            <a
              href={about.github}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white p-5 rounded-full shadow-lg hover:bg-blue-600 hover:text-white transition transform hover:-translate-y-1 hover:scale-110"
              data-aos="zoom-in"
              data-aos-delay="200"
            >
              <FaGithub />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-8">
        <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between">
          <div className="mb-4 md:mb-0 text-center md:text-left">
            <h2 className="text-md font-bold text-white">
              Muhammad Muneeb Khan
            </h2>
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
    </div>
  );
}

export default Home;
