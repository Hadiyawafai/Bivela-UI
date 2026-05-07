// =======================================================
// ✅ src/features/services/serviceBookingService.js
// FINAL WORKING FILE
// =======================================================

import api from "../../api/axios";

// =======================================================
// ✅ BOOK SERVICE
// POST /api/service-bookings/book
// =======================================================
export const bookService = async ({
  userId,
  serviceType,
  scheduledDate,
  address,
  phoneNumber,
  latitude,
  longitude,
}) => {
  try {
    const payload = {
      userId: Number(userId),
      serviceType,
      scheduledDate,
      address,
      phoneNumber,
      latitude: Number(latitude),
      longitude: Number(longitude),
    };

    return await api.post("/service-bookings/book", payload, {
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
    });
  } catch (error) {
    console.error("BOOK SERVICE ERROR:", error);
    throw error;
  }
};

// =======================================================
// ✅ UPDATE BOOKING STATUS
// PATCH /api/service-bookings/{bookingId}/status
// =======================================================
export const updateBookingStatus = async (
  bookingId,
  status
) => {
  try {
    return await api.patch(
      `/service-bookings/${bookingId}/status`,
      { status },
      {
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true",
        },
      }
    );
  } catch (error) {
    console.error("UPDATE BOOKING STATUS ERROR:", error);
    throw error;
  }
};

// =======================================================
// ✅ GET USER BOOKINGS
// GET /api/service-bookings/user/{userId}
// =======================================================
export const getUserBookings = async (userId) => {
  try {
    return await api.get(
      `/service-bookings/user/${userId}`,
      {
        headers: {
          "ngrok-skip-browser-warning": "true",
        },
      }
    );
  } catch (error) {
    console.error("GET USER BOOKINGS ERROR:", error);
    throw error;
  }
};