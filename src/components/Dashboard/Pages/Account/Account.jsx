import React, { useState } from "react";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import "./Account.css";
import { logoutUser } from "../../../../utils/api/logoutService";
import { useNavigate } from "react-router-dom";
import { updateUserProfile } from "../../../../utils/api/userService";
import { message } from "antd";

const Account = () => {
  const navigate = useNavigate();
  const [isEye, setIsEye] = useState(true);
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    newPassword: "",
  });

  const [confirmPassword, setConfirmPassword] = useState("");

  const handleEye = () => {
    setIsEye((prev) => !prev);
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    if (profileData.newPassword !== confirmPassword) {
      message.error("Passwords do not match!");
      return;
    }

    try {
      const response = await updateUserProfile(profileData);
      message.success("Profile updated successfully");
    } catch (error) {
      message.error("Error updating profile");
    }
  };

  const handleLogout = async () => {
    await logoutUser();
    navigate("/auth/signin");
  };

  return (
    <div className="bg-[#f9fafb p-0">
      <div className="max-w-full mx-auto bg-white p-6 rounded-lg shadow-md mt-8">
        {/* Tabs Navigation */}
        <nav className="flex border-b border-gray-300 pb-3">
          <button className="text-[#111313] font-bold mr-6">My Account</button>
        </nav>

        {/* Member Information Section */}
        <div className="mt-6">
          <h3 className="text-xl font-bold text-[#111313]">
            Member Information
          </h3>
          <form className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 ">
                  First Name
                </label>
                <input
                  type="text"
                  value={profileData.firstName}
                  onChange={(e) =>
                    setProfileData({
                      ...profileData,
                      firstName: e.target.value,
                    })
                  }
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Last Name
                </label>
                <input
                  type="text"
                  value={profileData.lastName}
                  onChange={(e) =>
                    setProfileData({ ...profileData, lastName: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                value={profileData.email}
                onChange={(e) =>
                  setProfileData({ ...profileData, email: e.target.value })
                }
                className="w-full p-2 border border-gray-300 rounded mt-1"
              />
            </div>

            <div className="flex space-x-4">
              <button
                type="button"
                onClick={handleUpdateProfile}
                className="bg-[#111313] text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Save
              </button>
              <button
                type="button"
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Logout
              </button>
            </div>
          </form>
        </div>

        {/* Change Password Section */}
        <div className="mt-10">
          <h3 className="text-xl font-bold text-[#111313]">Change Password</h3>
          <form className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={isEye ? "password" : "text"}
                    value={profileData.newPassword}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        newPassword: e.target.value,
                      })
                    }
                    className="w-full p-2 border border-gray-300 rounded mt-1"
                  />
                  <div
                    className="absolute right-3 top-3 cursor-pointer"
                    onClick={handleEye}
                  >
                    {isEye ? <FaRegEyeSlash /> : <FaRegEye />}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-700">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={isEye ? "password" : "text"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded mt-1"
                  />
                  <div
                    className="absolute right-3 top-3 cursor-pointer"
                    onClick={handleEye}
                  >
                    {isEye ? <FaRegEyeSlash /> : <FaRegEye />}
                  </div>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={handleUpdateProfile}
              className="bg-[#111313] text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Account;
