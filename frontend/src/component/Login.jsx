import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setToken } from "../store/authSlice";
function Login() {
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
  });
  const dispatch = useDispatch();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5002/api/auth/login",
        formData
      );
      dispatch(setToken(res.data.token));
    } catch (error) {
      alert("Invalid Credential");
      console.log(error);
    }
  };
  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
        Login
      </h2>

      <form action={handleLogin} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Username"
          name="userName"
          value={formData.userName}
          onChange={handleChange}
          className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
        />
        <button
          type="submit"
          className="mt-4 px-4 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 hover:scale-105 transform transition duration-300"
        >
          Login
        </button>
      </form>

      <p className="mt-4 text-sm text-gray-500 text-center">
        Don't have an account?{" "}
        <a href="#" className="text-blue-600 hover:underline">
          Sign up
        </a>
      </p>
    </div>
  );
}

export default Login;
