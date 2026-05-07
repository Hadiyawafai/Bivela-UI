// // =======================================================
// // ✅ FINAL ADMIN ORDERS PAGE
// // src/features/admin/pages/AdminOrdersPage.jsx
// // =======================================================

// import React, {
//   useEffect,
//   useState,
// } from "react";

// import {
//   Loader2,
//   ShoppingBag,
// } from "lucide-react";

// import {
//   getAllOrders,
//   updateOrderStatus,
// } from "../adminServices";

// // =======================================================

// export default function AdminOrdersPage() {

//   // =====================================================
//   // STATE
//   // =====================================================

//   const [orders, setOrders] =
//     useState([]);

//   const [loading, setLoading] =
//     useState(true);

//   const [updatingId, setUpdatingId] =
//     useState(null);

//   // =====================================================
//   // FETCH ORDERS
//   // =====================================================

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   const fetchOrders = async () => {
//     try {
//       setLoading(true);

//       const data =
//         await getAllOrders();

//       console.log(
//         "ADMIN ORDERS:",
//         data
//       );

//       setOrders(
//         Array.isArray(data)
//           ? data
//           : []
//       );

//     } catch (error) {
//       console.log(
//         "FETCH ORDERS ERROR:",
//         error
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   // =====================================================
//   // UPDATE STATUS
//   // =====================================================

//   const handleStatusUpdate =
//     async (id, status) => {
//       try {
//         setUpdatingId(id);

//         await updateOrderStatus(
//           id,
//           status
//         );

//         alert(
//           "Order status updated successfully"
//         );

//         fetchOrders();

//       } catch (error) {
//         console.log(
//           "STATUS UPDATE ERROR:",
//           error
//         );

//         alert(
//           error?.response?.data
//             ?.message ||
//             "Failed to update status"
//         );
//       } finally {
//         setUpdatingId(null);
//       }
//     };

//   // =====================================================
//   // LOADING
//   // =====================================================

//   if (loading) {
//     return (
//       <div className="min-h-[70vh] flex items-center justify-center">
//         <Loader2 className="animate-spin w-10 h-10 text-black" />
//       </div>
//     );
//   }

//   // =====================================================
//   // EMPTY
//   // =====================================================

//   if (orders.length === 0) {
//     return (
//       <div className="min-h-[70vh] flex flex-col items-center justify-center">

//         <ShoppingBag
//           size={70}
//           className="text-black/20 mb-5"
//         />

//         <h2
//           className="text-4xl mb-3"
//           style={{
//             fontFamily:
//               "TanAngleton, serif",
//           }}
//         >
//           No Orders Found
//         </h2>

//         <p className="text-black/50">
//           Orders will appear here
//         </p>

//       </div>
//     );
//   }

//   // =====================================================
//   // UI
//   // =====================================================

//   return (
//     <div>

//       {/* HEADER */}
//       <div className="mb-10">

//         <p
//           className="text-xs uppercase tracking-[0.35em] text-black/45 mb-3"
//           style={{
//             fontFamily:
//               "Cardo, serif",
//           }}
//         >
//           Admin Panel
//         </p>

//         <h1
//           className="text-4xl md:text-5xl"
//           style={{
//             fontFamily:
//               "TanAngleton, serif",
//           }}
//         >
//           Orders
//         </h1>

//       </div>

//       {/* TABLE */}
//       <div className="overflow-x-auto bg-white border border-black/10 rounded-3xl shadow-sm">

//         <table className="w-full">

//           {/* HEAD */}
//           <thead className="border-b border-black/10 bg-black/[0.02]">

//             <tr className="text-left">

//               <th className="p-5 text-xs uppercase tracking-[0.25em]">
//                 Order ID
//               </th>

//               <th className="p-5 text-xs uppercase tracking-[0.25em]">
//                 Customer
//               </th>

//               <th className="p-5 text-xs uppercase tracking-[0.25em]">
//                 Amount
//               </th>

//               <th className="p-5 text-xs uppercase tracking-[0.25em]">
//                 Status
//               </th>

//               <th className="p-5 text-xs uppercase tracking-[0.25em]">
//                 Date
//               </th>

//               <th className="p-5 text-xs uppercase tracking-[0.25em]">
//                 Update
//               </th>

//             </tr>
//           </thead>

//           {/* BODY */}
//           <tbody>

//             {orders.map((order) => {

//               const customer =
//                 order.user
//                   ?.username ||
//                 order.username ||
//                 "Unknown";

//               const amount =
//                 order.totalAmount ||
//                 order.amount ||
//                 0;

//               const status =
//                 order.status ||
//                 "PENDING";

//               return (
//                 <tr
//                   key={order.id}
//                   className="border-b border-black/5 hover:bg-black/[0.02] transition"
//                 >

//                   {/* ID */}
//                   <td className="p-5 font-medium">
//                     #{order.id}
//                   </td>

//                   {/* USER */}
//                   <td className="p-5">
//                     <div>
//                       <p className="font-medium">
//                         {customer}
//                       </p>

//                       <p className="text-xs text-black/45 mt-1">
//                         {
//                           order.user
//                             ?.email
//                         }
//                       </p>
//                     </div>
//                   </td>

//                   {/* AMOUNT */}
//                   <td className="p-5 font-medium">
//                     ₹{amount}
//                   </td>

//                   {/* STATUS */}
//                   <td className="p-5">

//                     <span
//                       className={`
//                         px-4 py-2 rounded-full text-xs uppercase tracking-widest
//                         ${
//                           status ===
//                           "DELIVERED"
//                             ? "bg-green-100 text-green-700"
//                             : status ===
//                               "SHIPPED"
//                             ? "bg-blue-100 text-blue-700"
//                             : status ===
//                               "CANCELLED"
//                             ? "bg-red-100 text-red-700"
//                             : "bg-yellow-100 text-yellow-700"
//                         }
//                       `}
//                     >
//                       {status}
//                     </span>

//                   </td>

//                   {/* DATE */}
//                   <td className="p-5 text-sm text-black/60">

//                     {order.createdAt
//                       ? new Date(
//                           order.createdAt
//                         ).toLocaleDateString()
//                       : "N/A"}

//                   </td>

//                   {/* ACTION */}
//                   <td className="p-5">

//                     <select
//                       value={status}
//                       disabled={
//                         updatingId ===
//                         order.id
//                       }
//                       onChange={(e) =>
//                         handleStatusUpdate(
//                           order.id,
//                           e.target.value
//                         )
//                       }
//                       className="border border-black/10 bg-[#F8F6F4] px-4 py-2 rounded-xl outline-none"
//                     >

//                       <option value="PENDING">
//                         PENDING
//                       </option>

//                       <option value="PROCESSING">
//                         PROCESSING
//                       </option>

//                       <option value="SHIPPED">
//                         SHIPPED
//                       </option>

//                       <option value="DELIVERED">
//                         DELIVERED
//                       </option>

//                       <option value="CANCELLED">
//                         CANCELLED
//                       </option>

//                     </select>

//                   </td>

//                 </tr>
//               );
//             })}

//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }