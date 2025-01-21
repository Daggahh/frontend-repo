// This file ensures that tokens are refreshed automatically when they expire.

import axios from "axios";
import { getValidToken } from "./tokenHelper";

const axiosInstance = axios.create({
  baseURL: "https://backend-repo-1-x2b1.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

// this request interceptor to include access token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getValidToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;

// // this response interceptor to handle token refresh
// axiosInstance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     if (error.response && error.response.status === 403) {
//       const refreshToken = localStorage.getItem("refreshToken");
//       if (!refreshToken) {
//         throw new Error("No refresh token found");
//       }

//       try {
//         // Attempt to refresh the token
//         const newToken = await getValidToken();
//         if (!newToken) {
//           throw new Error("Failed to refresh token");
//         }

//         // Retry the failed request with the new token
//         error.config.headers.Authorization = `Bearer ${newToken}`;
//         return axiosInstance.request(error.config);
//       } catch (err) {
//         console.error("Token refresh failed:", err);
//         localStorage.removeItem("authtoken");
//         localStorage.removeItem("refreshToken");
//         window.location.href = "/auth/signin"; // Redirect to login on failure
//       }
//     }
//     return Promise.reject(error);
//   }
// );
