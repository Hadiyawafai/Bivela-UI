// =======================================================
// ✅ ATELIER SERVICE (FINAL WORKING)
// =======================================================

import api from "../../api/axios";

const headers = {
  "ngrok-skip-browser-warning": "true",
};

export const createCustomProduct = async (formData) => {
  try {
    const res = await api.post(
      "/custom-products/request",
      formData,
      {
        headers: {
          ...headers,
          // ❌ DO NOT manually set multipart boundary
          // Axios handles it automatically
        },
      }
    );

    return res;
  } catch (error) {
    console.log(
      "CUSTOM PRODUCT ERROR:",
      error?.response?.data || error.message
    );
    throw error;
  }
};