/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { clearToken } from "../store/authSlice";
import Login from "../component/Login.jsx";
import About from "../component/About.jsx";

function Dash() {
  const [editAbout, seteditAbout] = useState(false);
  const [about, setAbout] = useState();
  const [project, setProject] = useState([]);
  const [skill, setSkill] = useState([]);

  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  const getData = async () => {
    const aboutRes = await axios.get("http://localhost:5002/api/content/about");
    setAbout(aboutRes.data[0]);

    const projectRes = await axios.get(
      "http://localhost:5002/api/content/project"
    );
    setProject(projectRes.data);

    const skillRes = await axios.get("http://localhost:5002/api/content/skill");
    setSkill(skillRes.data);
  };

  useEffect(() => {
    getData();
  }, []);

  const handleLogout = () => {
    dispatch(clearToken());
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {!token ? (
        <Login />
      ) : (
        <div>
          <div>
            <button
              onClick={handleLogout}
              className="bg-red-700 text-white p-4 rounded cursor-pointer"
            >
              Logout
            </button>
            <button
              onClick={() => seteditAbout(!editAbout)}
              className="bg-green-700 text-white p-4 rounded cursor-pointer"
            >
              Edit About
            </button>
          </div>

          {editAbout && (
            <>
              about form <About about={about} />
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default Dash;
