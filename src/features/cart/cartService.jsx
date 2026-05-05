// =======================================================
// ✅ CART SERVICE (FINAL + HEADERS + INTERCEPTOR SAFE)
// =======================================================

import api from "../../api/axios";

const headers = {
  "ngrok-skip-browser-warning": "true",
};

// =======================================================
// ➕ ADD TO CART
// =======================================================
export const addToCart = async ({ variantId, quantity }) => {
  try {
    const res = await api.post(
      "/cart/add",
      {
        variantId: Number(variantId),
        quantity: Number(quantity),
      },
      { headers }
    );

    return res;
  } catch (error) {
    console.log("ADD TO CART ERROR:", error?.response?.data || error.message);
    throw error;
  }
};

// =======================================================
// 📥 GET CART
// =======================================================
export const getCart = async () => {
  try {
    const res = await api.get("/cart", { headers });

    return res;
  } catch (error) {
    console.log("GET CART ERROR:", error?.response?.data || error.message);
    return { items: [], totalPrice: 0 };
  }
};

// =======================================================
// ❌ REMOVE ITEM
// =======================================================
export const removeFromCart = async (variantId) => {
  try {
    const res = await api.delete(`/cart/remove/${variantId}`, {
      headers,
    });

    return res;
  } catch (error) {
    console.log("REMOVE ERROR:", error?.response?.data || error.message);
    throw error;
  }
};

// =======================================================
// 🗑️ CLEAR CART
// =======================================================
export const clearCart = async () => {
  try {
    const res = await api.delete("/cart/clear", { headers });

    return res;
  } catch (error) {
    console.log("CLEAR CART ERROR:", error?.response?.data || error.message);
    throw error;
  }
};