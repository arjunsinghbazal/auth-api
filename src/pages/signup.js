import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Importing useNavigate

function Signup() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // Initializing useNavigate

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:9000/signup", formData);
      setMessage(response.data.message);
      
      // Show alert with the message
      alert(response.data.message);

      // If signup is successful, navigate to login after a short delay
      if (response.data.success) {
        setTimeout(() => {
          navigate("/login"); // Navigate to the login page
        }, 2000); // Wait 2 seconds before redirecting (optional)
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An error occurred";
      setMessage(errorMessage);
      
      // Show the error message in the alert
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
