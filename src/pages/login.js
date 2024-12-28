import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await axios.post("http://localhost:3001/login", formData);
      if (response.data.success) {
        setFormData({ email: "", password: "" });
        alert("Login successful");
        setTimeout(() => {
          navigate("/home");
        }, 2000);
      } else {
        setMessage(response.data.message);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An error occurred";
      setMessage(errorMessage);
    }
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="form">
        <h1>Login</h1>
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
        {message && <div className="error-message red">{message}</div>}

        <div className="form-buttons">
          <button type="submit" className="btn submitbtn decoration black">
            Login
          </button>
          <button
            type="button"
            className="btn submitbtn decoration gray"
            onClick={handleCancel}
          >
            Signup
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
