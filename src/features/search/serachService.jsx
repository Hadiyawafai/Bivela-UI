// =======================================================
// ✅ ATELIER SERVICE (FINAL WORKING)
// =======================================================

import api from "../../api/axios";

const headers = {
  "ngrok-skip-browser-warning": "true",
};

// =======================================================
// 🎨 CREATE CUSTOM DESIGN (MULTIPART)
// =======================================================
export const createCustomProduct = async ({
  size,
  color,
  designDescription,
  imageFile,
}) => {
  try {
    const formData = new FormData();

    // ✅ backend expects "request" object
    const request = {
      size,
      color,
      designDescription,
    };

    formData.append(
      "request",
      new Blob([JSON.stringify(request)], {
        type: "application/json",
      })
    );

    if (imageFile) {
      formData.append("image", imageFile);
    }

    const res = await api.post(
      "/custom-products/request",
      formData,
      {
        headers: {
          ...headers,
          "Content-Type": "multipart/form-data",
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

// =======================================================
// 📦 GET USER CUSTOM DESIGNS
// =======================================================
export const getMyCustomProducts = async (userId) => {
  try {
    const res = await api.get(
      `/custom-products/user/${userId}`,
      { headers }
    );

    return res;
  } catch (error) {
    console.log("FETCH CUSTOM ERROR:", error);
    return [];
  }
};