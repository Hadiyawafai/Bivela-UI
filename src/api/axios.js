// =======================================================
// ✅ src/api/axios.js
// FINAL WORKING FILE
// =======================================================

import axios from "axios";

const BASE_URL = "https://rocket-cuddle-goatskin.ngrok-free.dev/api";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  // headers: {
  //   "Content-Type": "application/json",
  // },
});

// 🔐 Attach Token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// 📦 Clean Response
api.interceptors.response.use(
  (response) => {
    console.log("API Response:", response.config.url, response.data);

    const { success, data, message } = response.data;

    if (success === true) {
      return data;
    }

    if (success === undefined) {
      return response.data;
    }

    return Promise.reject({
      message: message || "Request failed",
      code: "API_FAILURE",
      response: response.data,
    });
  },
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default api;