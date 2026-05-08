// =======================================================
// ✅ src/features/admin/adminService.js
// FINAL WORKING FILE
// =======================================================

import api from "../../api/axios";

// =======================================================
// ✅ GET ALL USERS
// GET /api/admin/users
// =======================================================
export const getAllUsers = async () => {
  try {
    return await api.get("/admin/users", {
      headers: {
        "ngrok-skip-browser-warning": "true",
      },
    });
  } catch (error) {
    console.error("GET USERS ERROR:", error);
    throw error;
  }
};

// =======================================================
// ✅ GET ALL ORDERS
// GET /api/admin/orders
// =======================================================
export const getAllOrders = async () => {
  try {
    return await api.get("/admin/orders", {
      headers: {
        "ngrok-skip-browser-warning": "true",
      },
    });
  } catch (error) {
    console.error("GET ORDERS ERROR:", error);
    throw error;
  }
};

// =======================================================
// ✅ UPDATE ORDER STATUS
// PATCH /api/admin/orders/{id}/status?status=VALUE
// =======================================================
export const updateOrderStatus = async (id, status) => {
  try {
    return await api.patch(
      `/admin/orders/${id}/status?status=${status}`,
      {},
      {
        headers: {
          "ngrok-skip-browser-warning": "true",
        },
      }
    );
  } catch (error) {
    console.error("UPDATE ORDER STATUS ERROR:", error);
    throw error;
  }
};

// =======================================================
// ✅ GET ALL CUSTOM REQUESTS
// GET /api/admin/custom-requests
// =======================================================
export const getAllCustomRequests = async () => {
  try {
    return await api.get("/admin/custom-requests", {
      headers: {
        "ngrok-skip-browser-warning": "true",
      },
    });
  } catch (error) {
    console.error("GET CUSTOM REQUESTS ERROR:", error);
    throw error;
  }
};

// =======================================================
// ✅ UPDATE CUSTOM REQUEST STATUS
// PATCH /api/admin/custom-requests/{id}/status?status=VALUE
// =======================================================
export const updateCustomRequestStatus = async (id, status) => {
  try {
    return await api.patch(
      `/admin/custom-requests/${id}/status?status=${status}`,
      {},
      {
        headers: {
          "ngrok-skip-browser-warning": "true",
        },
      }
    );
  } catch (error) {
    console.error("UPDATE CUSTOM REQUEST STATUS ERROR:", error);
    throw error;
  }
};

// =======================================================
// ✅ GET ALL SERVICE BOOKINGS
// GET /api/admin/service-bookings
// =======================================================
export const getAllServiceBookings = async () => {
  try {
    return await api.get("/admin/service-bookings", {
      headers: {
        "ngrok-skip-browser-warning": "true",
      },
    });
  } catch (error) {
    console.error("GET SERVICE BOOKINGS ERROR:", error);
    throw error;
  }
};

// =======================================================
// ✅ UPDATE SERVICE BOOKING STATUS
// PATCH /api/admin/service-bookings/{id}/status?status=VALUE
// =======================================================
export const updateServiceBookingStatus = async (id, status) => {
  try {
    return await api.patch(
      `/admin/service-bookings/${id}/status?status=${status}`,
      {},
      {
        headers: {
          "ngrok-skip-browser-warning": "true",
        },
      }
    );
  } catch (error) {
    console.error("UPDATE SERVICE BOOKING STATUS ERROR:", error);
    throw error;
  }
};

// =======================================================
// ✅ GET ALL WISHLISTS
// GET /api/admin/wishlists
// =======================================================
// export const getAllWishlists = async () => {
//   try {
//     return await api.get("/admin/wishlists", {
//       headers: {
//         "ngrok-skip-browser-warning": "true",
//       },
//     });
//   } catch (error) {
//     console.error("GET WISHLISTS ERROR:", error);
//     throw error;
//   }
// };

// =======================================================
// ✅ GET ALL CARTS
// GET /api/admin/carts
// =======================================================
// export const getAllCarts = async () => {
//   try {
//     return await api.get("/admin/carts", {
//       headers: {
//         "ngrok-skip-browser-warning": "true",
//       },
//     });
//   } catch (error) {
//     console.error("GET CARTS ERROR:", error);
//     throw error;
//   }
// };