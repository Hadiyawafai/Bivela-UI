// // =======================================================
// // ✅ FINAL ADMIN SERVICE
// // src/features/admin/adminService.js
// // =======================================================

// import api from "../../api/axios";

// // =======================================================
// // USERS
// // =======================================================

// export const getAllUsers = async () => {
//   return await api.get("/admin/users", {
//     headers: {
//       "ngrok-skip-browser-warning":
//         "true",
//     },
//   });
// };

// export const getCurrentUser =
//   async () => {
//     return await api.get(
//       "/users/currentLoggedInUser",
//       {
//         headers: {
//           "ngrok-skip-browser-warning":
//             "true",
//         },
//       }
//     );
//   };

// // =======================================================
// // ORDERS
// // =======================================================

// export const getAllOrders =
//   async () => {
//     return await api.get(
//       "/admin/orders",
//       {
//         headers: {
//           "ngrok-skip-browser-warning":
//             "true",
//         },
//       }
//     );
//   };

// export const updateOrderStatus =
//   async (id, status) => {
//     return await api.patch(
//       `/admin/orders/${id}/status`,
//       { status },
//       {
//         headers: {
//           "ngrok-skip-browser-warning":
//             "true",
//         },
//       }
//     );
//   };

// // =======================================================
// // SERVICE BOOKINGS
// // =======================================================

// export const getAllServiceBookings =
//   async () => {
//     return await api.get(
//       "/admin/service-bookings",
//       {
//         headers: {
//           "ngrok-skip-browser-warning":
//             "true",
//         },
//       }
//     );
//   };

// export const updateServiceBookingStatus =
//   async (id, status) => {
//     return await api.patch(
//       `/admin/service-bookings/${id}/status`,
//       { status },
//       {
//         headers: {
//           "ngrok-skip-browser-warning":
//             "true",
//         },
//       }
//     );
//   };

// // =======================================================
// // CUSTOM REQUESTS
// // =======================================================

// export const getAllCustomRequests =
//   async () => {
//     return await api.get(
//       "/admin/custom-requests",
//       {
//         headers: {
//           "ngrok-skip-browser-warning":
//             "true",
//         },
//       }
//     );
//   };

// export const updateCustomRequestStatus =
//   async (id, status) => {
//     return await api.patch(
//       `/admin/custom-requests/${id}/status`,
//       { status },
//       {
//         headers: {
//           "ngrok-skip-browser-warning":
//             "true",
//         },
//       }
//     );
//   };

// // =======================================================
// // WISHLISTS
// // =======================================================

// export const getAllWishlists =
//   async () => {
//     return await api.get(
//       "/admin/wishlists",
//       {
//         headers: {
//           "ngrok-skip-browser-warning":
//             "true",
//         },
//       }
//     );
//   };

// // =======================================================
// // CARTS
// // =======================================================

// export const getAllCarts =
//   async () => {
//     return await api.get(
//       "/admin/carts",
//       {
//         headers: {
//           "ngrok-skip-browser-warning":
//             "true",
//         },
//       }
//     );
//   };