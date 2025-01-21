import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { notification } from "antd";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const SignInForm = () => {
  const [formData, setFormData] = useState({
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

    const { email, password } = formData;

    if (!email || !password) {
      setError("Please fill out all fields.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    setError("");

    try {
      const response = await axios.post(
        "https://backend-repo-1-x2b1.onrender.com/api/auth/login",
        formData
      );

      console.log("Response:", response);

      if (response.status === 200) {
        const { token, user } = response.data;
        console.log("Token received:", token);

        if (token && user?.firstName) {
          localStorage.setItem("authtoken", token);
          localStorage.setItem("user", JSON.stringify(user)); // Store user details
          // localStorage.setItem("refreshToken", refreshToken);

          notification.success({
            message: "Welcome Back!",
            description: `Hello, ${user.firstName}!`,
            placement: "topRight",
            showProgress: true,
            pauseOnHover: false,
          });
          console.log("Sign-in successful. Navigating to dashboard...");
          console.log(
            "Token stored after sign-in:",
            localStorage.getItem("authtoken")
          );
          navigate("/dashboard/home"); // Redirect to the dashboard
        } else {
          console.error(
            "Token or refresh token missing in the server response."
          );
        }
      }
    } catch (err) {
      notification.error({
        message: "Sign In Failed",
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
    <section className="signin-section">
      <div className="signin-container">
        <h1 className="signin-heading">Sign in to your account</h1>
        <div className="social-container">
          <button className="social-btn red" aria-label="Sign in with Google">
            <i className="fab fa-google-plus-g"></i>
          </button>
          <button
            className="social-btn blue"
            aria-label="Sign in with LinkedIn"
          >
            <i className="fab fa-linkedin-in"></i>
          </button>
        </div>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit} className="signin-form" id="sign-in">
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
            <label htmlFor="password">Password</label>
            <div className="relative">
              <input
                type={passwordVisible ? "text" : "password"}
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
          <div className="fp">
            <Link to="/auth/forget-password" className="forgot-password">
              Forgot your password?
            </Link>
          </div>
          <button type="submit" className="auth-btn">
            Sign In
          </button>
        </form>
        <div className="links-div">
          <span>
            Don't have an account?{" "}
            <Link to="/auth/signup" className="colour-text">
              Register
            </Link>
          </span>
        </div>
      </div>
    </section>
  );
};

export default SignInForm;
