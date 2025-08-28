import React, { useEffect, useState } from "react";
import axios from "axios";
function About({ about }) {
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    bio: "",
    location: "",
    email: "",
    github: "",
    linkedIn: "",
    img: "",
    education: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    try {
      await axios.put(
        `http://localhost:5002/api/content/about/${about._id}`,
        formData
      );
      alert("Edit Success");
    } catch (error) {
      console.log(error);
      alert("Edit Failed");
    }
  };

  useEffect(() => {
    setFormData(about);
  }, []);
  if (!about) return null;

  return (
    <form className="flex flex-col gap-4" action={handleSubmit}>
      {Object.entries(formData).map(([key, value]) => (
        <div key={key} className="flex flex-col">
          <label className="font-semibold capitalize">{key}</label>
          <input
            type="text"
            className="border p-2 rounded"
            name={key}
            value={value || ""}
            onChange={handleChange}
          />
        </div>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
}

export default About;
