import axios from "axios";

const getBaseURL = () => {
  // In production, use the environment variable or default to /api for same-origin
  if (import.meta.env.MODE === "development") {
    return "http://localhost:5000/api";
  }
  // For production, use the VITE_API_URL if set, otherwise use /api
  return import.meta.env.VITE_API_URL || "/api";
};

export const axiosInstance = axios.create({
  baseURL: getBaseURL(),
  withCredentials: true,
});
