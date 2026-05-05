// =======================================================
// ✅ ORDER SERVICE (CART-STYLE HEADERS)
// =======================================================

import api from "../../api/axios";

const headers = {
  "ngrok-skip-browser-warning": "true",
};

// =======================================================
// 🧾 INITIATE ORDER
// =======================================================
export const initiateOrder = async (cartItems) => {
  try {
    return await api.post(
      "/orders/initiate",
      {
        items: cartItems.map((item) => ({
          variantId: Number(item.variantId),
          quantity: Number(item.quantity),
        })),
      },
      { headers }
    );
  } catch (error) {
    console.log("INITIATE ORDER ERROR:", error?.response?.data || error.message);
    throw error;
  }
};

// =======================================================
// 🔐 VERIFY PAYMENT
// =======================================================
export const verifyOrder = async ({
  razorpayOrderId,
  razorpayPaymentId,
  razorpaySignature,
}) => {
  try {
    return await api.post(
      "/orders/verify",
      {
        razorpayOrderId,
        razorpayPaymentId,
        razorpaySignature,
      },
      { headers }
    );
  } catch (error) {
    console.log("VERIFY ORDER ERROR:", error?.response?.data || error.message);
    throw error;
  }
};

// =======================================================
// 📦 GET MY ORDERS
// =======================================================
export const getMyOrders = async () => {
  try {
    return await api.get("/orders/my-orders", { headers });
  } catch (error) {
    console.log("GET ORDERS ERROR:", error?.response?.data || error.message);
    return [];
  }
};

// =======================================================
// 🔄 UPDATE ORDER STATUS
// =======================================================
export const updateOrderStatus = async (id, status) => {
  try {
    return await api.patch(
      `/orders/${id}/status`,
      { status },
      { headers }
    );
  } catch (error) {
    console.log("UPDATE STATUS ERROR:", error?.response?.data || error.message);
    throw error;
  }
};