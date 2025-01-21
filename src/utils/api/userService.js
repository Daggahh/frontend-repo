import axios from "axios";

const API_URL = "https://backend-repo-1-x2b1.onrender.com/api/user";

export const updateUserProfile = async (userData) => {
  try {
    const response = axios.put(`${API_URL}/profile`, userData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authtoken")}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to update user details"
    );
  }
};

export const generateCoverLetter = async (coverLetter) => {
  try {
    const response = axios.post(
      `${API_URL}/generate-cover-letter`,
      coverLetter,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authtoken")}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to generate cover letter"
    );
  }
};
