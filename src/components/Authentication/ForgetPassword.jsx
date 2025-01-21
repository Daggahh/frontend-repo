import React, { useState } from "react";
import { Link } from "react-router-dom";
import { message } from "antd";
import axios from "axios";
import "./Forms.css";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsButtonDisabled(true);

    if (!email) {
      setError("Please enter your email address.");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setError("");
    setSuccess(true);

    try {
      // Make POST request to backend
      const response = await axios.post(
        "https://backend-repo-1-x2b1.onrender.com",
        {
          email,
        }
      );

      if (response.status === 200) {
        setSuccess(true); // Show success message
        message.success("Reset link sent to your email.");
      }
      console.log("Reset link sent to:", email); // For testing
    } catch (error) {
      setError("An error occurred while sending the reset link.");
      setIsButtonDisabled(false); // Re-enable button on error
      console.error(error);
    }
  };

  return (
    <section className="reset-section">
      <div className="reset-container">
        <h1 className="reset-heading">Password Assistance</h1>
        <p className="reset-subheading">
          Enter the email address associated with your account and we’ll email
          you a link to reset your password.
        </p>
        <form
          className="reset-form"
          onSubmit={handleSubmit}
          id="reset-form"
          autoComplete="on"
        >
          {error && <p className="error-message">{error}</p>}
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />
          <button className="auth-btn" type="submit" disabled={isButtonDisabled}>
          {isButtonDisabled ? "Reset Link Sent" : "Send Reset Link"}
          </button>
        </form>
        <div className="links-div">
          <span>
            Go back to{" "}
            <Link to="/auth/signin" className="colour-text">
              Login
            </Link>
          </span>
        </div>
      </div>
    </section>
  );
};

export default ForgetPassword;
