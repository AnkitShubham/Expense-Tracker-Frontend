import axios from "axios";
import toast from "react-hot-toast";

// Utility function to check token expiry
const isTokenExpired = (token) => {
  try {
    const payloadBase64 = token.split(".")[1]; // Extract the payload
    const payloadJson = atob(payloadBase64); // Decode Base64
    const payload = JSON.parse(payloadJson); // Parse JSON
    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
    return payload.exp < currentTime; // Compare expiry time
  } catch (error) {
    console.error("Error decoding token:", error);
    return true; // Assume expired if decoding fails
  }
};

// Axios instance
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const unprotectedPaths = ["/v1/login", "/v1/signup"];
    const isUnprotected = unprotectedPaths.some((path) =>
      config.url?.includes(path)
    );

    if (!isUnprotected) {
      const token = localStorage.getItem("jwtToken");

      if (token) {
        if (isTokenExpired(token)) {
          // Token is expired, log the user out
          localStorage.removeItem("jwtToken");
          localStorage.removeItem("userId");
          localStorage.removeItem("email");
          toast.error("Your session has expired, login again");
          return Promise.reject(new Error("Token expired"));
        }

        // Token is valid, attach it to the Authorization header
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
