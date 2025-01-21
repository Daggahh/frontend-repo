import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { notification } from "antd";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { firstName, lastName, email, password } = formData;

    if (!firstName || !lastName || !email || !password) {
      setError("Please fill out all fields.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setError("");
    // console.log("Registration successful with:", formData); // For testing
    try {
      const response = await axios.post(
        "https://backend-repo-1-x2b1.onrender.com/api/auth/register",
        formData
      );

      console.log("Response:", response);

      if (response.status === 200 || response.status === 201) {
        const { token } = response.data; // Extract the token from response
        console.log("Token received:", token);

        if (token) {
          // Store both token and refreshToken in localStorage
          localStorage.setItem("authtoken", token);

          notification.success({
            message: "Account Created",
            description: "Sign-in to start tracking!.",
            placement: "topRight",
          });
          console.log("Sign-up successful.");
          console.log(
            "Token stored after sign-up:",
            localStorage.getItem("authtoken")
          );

          navigate("/auth/signin");
        } else {
          console.error("Token or refresh token missing in the response.");
        }
      }
    } catch (err) {
      notification.error({
        message: "Registration Failed",
        description:
          err.response?.data?.message ||
          "Something went wrong. Please try again.",
        placement: "topRight",
      });
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <section className="signup-section">
      <div className="signup-container">
        <h1 className="signup-heading">Create an Account</h1>
        <div className="social-container">
          <button className="social-btn red" aria-label="Sign up with Google">
            <i className="fab fa-google-plus-g"></i>
          </button>
          <button
            className="social-btn blue"
            aria-label="Sign up with LinkedIn"
          >
            <i className="fab fa-linkedin-in"></i>
          </button>
        </div>
        {error && <p className="error-message">{error}</p>}
        <form
          onSubmit={handleSubmit}
          className="signup-form"
          autoComplete="on"
          id="sign-up"
        >
          <div className="form-group name-grid">
            <div className="flex1">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                autoComplete="given-name"
                className="font-medium"
              />
            </div>

            <div className="flex2">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                autoComplete="family-name"
                className="font-medium"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              autoComplete="email"
              className="font-medium"
            />
          </div>

          <div className="form-group relative">
            <label htmlFor="password">Password (6 or more characters)</label>
            <div className="relative">
              <input
                type={passwordVisible ? "text" : "password"} // Toggle input type
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="font-medium input pr-10"
              />
              <button
                type="button"
                className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500"
                onClick={togglePasswordVisibility} // Handle toggle click
              >
                {passwordVisible ? (
                  <AiOutlineEyeInvisible size={20} />
                ) : (
                  <AiOutlineEye size={20} />
                )}
              </button>
            </div>
          </div>

          <button className="auth-btn" type="submit">
            Sign Up
          </button>
        </form>

        <div className="links-div">
          <span>
            Already have an account?
            <Link to="/auth/signin" className="colour-text">
              Sign In
            </Link>
          </span>
        </div>
      </div>
    </section>
  );
};

export default SignUpForm;
