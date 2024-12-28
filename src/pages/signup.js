import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/signup", formData);
      setMessage(response.data.message);
      alert(response.data.message);

      if (response.data.success) {
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An error occurred";
      setMessage(errorMessage);
      alert(errorMessage);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="form">
        <h1>Signup</h1>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="formitem"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="formitem"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="formitem"
          required
        />
        <div className="form-buttons">
          <button type="submit" className="btn submitbtn decoration black">
            Signup
          </button>
          <button type="button" className="btn submitbtn decoration gray">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default Signup;
