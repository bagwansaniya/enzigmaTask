import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";

const RegisterForm = () => {
  const [capval, setcapval] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
<<<<<<< HEAD
        "https://enzigma-task-backend.vercel.app/api/auth/register",
=======
        "https://enzigmatask.onrender.com/api/auth/register",
>>>>>>> 2c58099 (Update backend and frontend to use Render deployment and fix CORS)
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();
      if (response.ok) {
        alert("Registration successful!");
        navigate("/login");
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <ReCAPTCHA
          sitekey="6LdRNlorAAAAAKDSIVSXhnLpws_Zl6WiMPF_5ekV"
          onChange={() => setcapval()}
        />
        <input type="submit" value="Register" />
      </form>

      <p>
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
};

export default RegisterForm;
