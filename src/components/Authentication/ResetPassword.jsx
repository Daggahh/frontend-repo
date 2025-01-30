import React, { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { message } from "antd";
import axios from "axios";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import "./Forms.css";
import { BASE_API_URL } from "../../utils/constant";

const ResetPassword = () => {
  const { token } = useParams(); // Retrieve the token from the URL
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newPassword || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    setError("");

    try {
      // Make POST request to reset password
      const response = await axios.post(
        `${BASE_API_URL}/api/password/reset-password`,
        {
          token,
          newPassword,
        }
      );

      if (response.status === 200) {
        setSuccess(true); // Show success message
        message.success("Password changed successfully");
        setTimeout(() => navigate("/auth/signin"), 3000); // Redirect to login
      }
    } catch (error) {
      setError("An error occurred while resetting your password.");
      console.error(error);
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <section className="reset-section">
      <div className="reset-container">
        <h1 className="reset-heading">Reset Your Password</h1>
        <p className="reset-subheading">
          Enter and confirm your new password below.
        </p>
        <form
          className="reset-form"
          onSubmit={handleSubmit}
          id="reset-form"
          autoComplete="on"
        >
          {error && <p className="error-message">{error}</p>}
          {success && (
            <p className="success-message text-green-500 text-sm">
              Password reset successfully! Redirecting to login...
            </p>
          )}

          <div className="form-group relative">
            <label htmlFor="newPassword">New Password</label>
            <div className="relative">
              <input
                type={passwordVisible ? "text" : "password"}
                name="newPassword"
                value={newPassword}
                id="newPassword"
                onChange={(e) => setNewPassword(e.target.value)}
                autoComplete="new-password"
                className="font-medium block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm pr-10"
              />
              <button
                type="button"
                // className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500"
                className="absolute inset-y-0 right-2 flex items-center text-gray-500"
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

          <div className="form-group relative">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <div className="relative">
              <input
                type={passwordVisible ? "text" : "password"}
                name="confirmPassword"
                value={confirmPassword}
                id="confirmPassword"
                onChange={(e) => setConfirmPassword(e.target.value)}
                autoComplete="new-password"
                className="font-medium block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm pr-10"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-2 flex items-center text-gray-500"
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
            Reset Password
          </button>
        </form>
        <div className="links-div">
          <span>
            Remembered your password?{" "}
            <Link to="/auth/signin" className="colour-text">
              Login
            </Link>
          </span>
        </div>
      </div>
    </section>
  );
};

export default ResetPassword;
