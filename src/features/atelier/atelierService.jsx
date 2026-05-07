// =======================================================
// ✅ src/features/customProducts/customProductService.js
// FINAL WORKING FILE
// =======================================================

import api from "../../api/axios";

// =======================================================
// ✅ CREATE CUSTOM PRODUCT REQUEST
// POST /api/custom-products/request
// =======================================================
export const createCustomProductRequest = async ({
  size,
  color,
  designDescription,
  image,
}) => {
  try {
    // ✅ multipart/form-data
    const formData = new FormData();

    // ✅ request object as JSON blob
    const requestData = {
      size,
      color,
      designDescription,
    };

    formData.append(
      "request",
      new Blob([JSON.stringify(requestData)], {
        type: "application/json",
      })
    );

    // ✅ image file
    if (image) {
      formData.append("image", image);
    }

    return await api.post("/custom-products/request", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        "ngrok-skip-browser-warning": "true",
      },
    });
  } catch (error) {
    console.error("CREATE CUSTOM PRODUCT ERROR:", error);
    throw error;
  }
};

// =======================================================
// ✅ GET USER CUSTOM PRODUCTS
// GET /api/custom-products/user/{userId}
// =======================================================
export const getUserCustomProducts = async (userId) => {
  try {
    return await api.get(`/custom-products/user/${userId}`, {
      headers: {
        "ngrok-skip-browser-warning": "true",
      },
    });
  } catch (error) {
    console.error("GET USER CUSTOM PRODUCTS ERROR:", error);
    throw error;
  }
};