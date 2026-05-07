// // =======================================================
// // ✅ FINAL ADMIN SERVICE BOOKINGS PAGE
// // src/features/admin/pages/AdminServiceBookingsPage.jsx
// // =======================================================

// import React, {
//   useEffect,
//   useState,
// } from "react";

// import {
//   Loader2,
//   BrushCleaning,
//   Phone,
//   MapPin,
// } from "lucide-react";

// import {
//   getAllServiceBookings,
//   updateServiceBookingStatus,
// } from "../adminServices";

// // =======================================================

// export default function AdminServiceBookingsPage() {

//   const [bookings, setBookings] =
//     useState([]);

//   const [loading, setLoading] =
//     useState(true);

//   const [updatingId, setUpdatingId] =
//     useState(null);

//   // =====================================================

//   useEffect(() => {
//     fetchBookings();
//   }, []);

//   // =====================================================

//   const fetchBookings = async () => {
//     try {
//       setLoading(true);

//       const data =
//         await getAllServiceBookings();

//       console.log(
//         "SERVICE BOOKINGS:",
//         data
//       );

//       setBookings(
//         Array.isArray(data)
//           ? data
//           : []
//       );

//     } catch (error) {
//       console.log(
//         "SERVICE FETCH ERROR:",
//         error
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   // =====================================================

//   const handleStatusUpdate =
//     async (id, status) => {
//       try {
//         setUpdatingId(id);

//         await updateServiceBookingStatus(
//           id,
//           status
//         );

//         alert(
//           "Service status updated successfully"
//         );

//         fetchBookings();

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

//   if (loading) {
//     return (
//       <div className="min-h-[70vh] flex items-center justify-center">
//         <Loader2 className="animate-spin w-10 h-10" />
//       </div>
//     );
//   }

//   // =====================================================

//   if (bookings.length === 0) {
//     return (
//       <div className="min-h-[70vh] flex flex-col items-center justify-center">

//         <BrushCleaning
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
//           No Service Bookings
//         </h2>

//       </div>
//     );
//   }

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
//           Care Service Bookings
//         </h1>

//       </div>

//       {/* CARDS */}
//       <div className="grid gap-6">

//         {bookings.map((booking) => (

//           <div
//             key={booking.id}
//             className="bg-white border border-black/10 rounded-3xl p-7 shadow-sm"
//           >

//             {/* TOP */}
//             <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-6">

//               <div>

//                 <h2
//                   className="text-3xl mb-2"
//                   style={{
//                     fontFamily:
//                       "TanAngleton, serif",
//                   }}
//                 >
//                   {booking.serviceType}
//                 </h2>

//                 <p className="text-sm text-black/50">
//                   Booking ID #{booking.id}
//                 </p>

//               </div>

//               {/* STATUS */}
//               <div>

//                 <select
//                   value={
//                     booking.status ||
//                     "PENDING"
//                   }
//                   disabled={
//                     updatingId ===
//                     booking.id
//                   }
//                   onChange={(e) =>
//                     handleStatusUpdate(
//                       booking.id,
//                       e.target.value
//                     )
//                   }
//                   className="border border-black/10 bg-[#F8F6F4] px-5 py-3 rounded-2xl outline-none"
//                 >

//                   <option value="PENDING">
//                     PENDING
//                   </option>

//                   <option value="CONFIRMED">
//                     CONFIRMED
//                   </option>

//                   <option value="PICKED_UP">
//                     PICKED UP
//                   </option>

//                   <option value="COMPLETED">
//                     COMPLETED
//                   </option>

//                   <option value="CANCELLED">
//                     CANCELLED
//                   </option>

//                 </select>

//               </div>

//             </div>

//             {/* INFO */}
//             <div className="grid md:grid-cols-2 gap-8">

//               {/* LEFT */}
//               <div className="space-y-5">

//                 <div>
//                   <p className="text-xs uppercase tracking-widest text-black/45 mb-2">
//                     Customer
//                   </p>

//                   <p className="text-lg font-medium">
//                     {
//                       booking.user
//                         ?.username
//                     }
//                   </p>

//                   <p className="text-sm text-black/50">
//                     {
//                       booking.user
//                         ?.email
//                     }
//                   </p>
//                 </div>

//                 <div>
//                   <p className="text-xs uppercase tracking-widest text-black/45 mb-2">
//                     Scheduled Date
//                   </p>

//                   <p className="text-lg">
//                     {new Date(
//                       booking.scheduledDate
//                     ).toLocaleString()}
//                   </p>
//                 </div>

//               </div>

//               {/* RIGHT */}
//               <div className="space-y-5">

//                 <div className="flex gap-3">

//                   <Phone
//                     size={18}
//                     className="mt-1 text-black/50"
//                   />

//                   <div>
//                     <p className="text-xs uppercase tracking-widest text-black/45 mb-2">
//                       Phone Number
//                     </p>

//                     <p>
//                       {
//                         booking.phoneNumber
//                       }
//                     </p>
//                   </div>

//                 </div>

//                 <div className="flex gap-3">

//                   <MapPin
//                     size={18}
//                     className="mt-1 text-black/50"
//                   />

//                   <div>
//                     <p className="text-xs uppercase tracking-widest text-black/45 mb-2">
//                       Address
//                     </p>

//                     <p className="leading-7 text-black/70">
//                       {booking.address}
//                     </p>
//                   </div>

//                 </div>

//               </div>

//             </div>

//           </div>
//         ))}

//       </div>
//     </div>
//   );
// }