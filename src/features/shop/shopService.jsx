// src/features/shop/shopService.jsx

import api from "../../api/axios";

// ✅ GET ALL PRODUCTS
export const getAllProducts = async () => {
  return await api.get("/products", {
    headers: {
      "ngrok-skip-browser-warning": "true",
    },
  });
};

// ✅ GET SINGLE PRODUCT
export const getProductById = async (id) => {
  return await api.get(`/products/${id}`, {
    headers: {
      "ngrok-skip-browser-warning": "true",
    },
  });
};

// ✅ DELETE PRODUCT
export const deleteProduct = async (id) => {
  return await api.delete(`/products/${id}`, {
    headers: {
      "ngrok-skip-browser-warning": "true",
    },
  });
};

// ✅ CREATE PRODUCT
export const createProduct = async (productData, images = []) => {
  const formData = new FormData();

  formData.append(
    "product",
    new Blob([JSON.stringify(productData)], {
      type: "application/json",
    })
  );

  images.forEach((file) => {
    formData.append("images", file);
  });

  return await api.post("/products", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      "ngrok-skip-browser-warning": "true",
    },
  });
};

// ✅ UPDATE PRODUCT
export const updateProduct = async (id, productData, images = []) => {
  const formData = new FormData();

  formData.append(
    "product",
    new Blob([JSON.stringify(productData)], {
      type: "application/json",
    })
  );

  images.forEach((file) => {
    formData.append("images", file);
  });

  return await api.put(`/products/${id}`, formData, {
    headers: {
    
      "ngrok-skip-browser-warning": "true",
    },
  });
};


// =======================================================
// ADD TO WISHLIST
// =======================================================

export const addToWishlist = async (
  variantId
) => {
  return await api.post(
    `/wishlist/add/${variantId}`,
    {},
    {
      headers: {
        "ngrok-skip-browser-warning":
          "true",
      },
    }
  );
};

// =======================================================
// GET WISHLIST
// =======================================================

export const getWishlist = async () => {
  return await api.get("/wishlist", {
    headers: {
      "ngrok-skip-browser-warning":
        "true",
    },
  });
};

// =======================================================
// REMOVE FROM WISHLIST
// =======================================================

export const removeFromWishlist =
  async (variantId) => {
    return await api.delete(
      `/wishlist/remove/${variantId}`,
      {
        headers: {
          "ngrok-skip-browser-warning":
            "true",
        },
      }
    );
  };