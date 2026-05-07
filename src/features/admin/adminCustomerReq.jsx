// // =======================================================
// // ✅ FINAL ADMIN CUSTOM REQUESTS PAGE
// // src/features/admin/pages/AdminCustomRequestsPage.jsx
// // =======================================================

// import React, {
//   useEffect,
//   useState,
// } from "react";

// import {
//   Loader2,
//   Layers3,
//   Mail,
//   Phone,
// } from "lucide-react";

// import {
//   getAllCustomRequests,
//   updateCustomRequestStatus,
// } from "../adminServices";

// // =======================================================

// export default function AdminCustomRequestsPage() {

//   const [requests, setRequests] =
//     useState([]);

//   const [loading, setLoading] =
//     useState(true);

//   const [updatingId, setUpdatingId] =
//     useState(null);

//   // =====================================================

//   useEffect(() => {
//     fetchRequests();
//   }, []);

//   // =====================================================

//   const fetchRequests = async () => {
//     try {
//       setLoading(true);

//       const data =
//         await getAllCustomRequests();

//       console.log(
//         "CUSTOM REQUESTS:",
//         data
//       );

//       setRequests(
//         Array.isArray(data)
//           ? data
//           : []
//       );

//     } catch (error) {
//       console.log(
//         "CUSTOM REQUEST ERROR:",
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

//         await updateCustomRequestStatus(
//           id,
//           status
//         );

//         alert(
//           "Custom request updated successfully"
//         );

//         fetchRequests();

//       } catch (error) {
//         console.log(
//           "UPDATE ERROR:",
//           error
//         );

//         alert(
//           error?.response?.data
//             ?.message ||
//             "Failed to update request"
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

//   if (requests.length === 0) {
//     return (
//       <div className="min-h-[70vh] flex flex-col items-center justify-center">

//         <Layers3
//           size={70}
//           className="text-black/20 mb-5"
//         />

//         <h2
//           className="text-4xl"
//           style={{
//             fontFamily:
//               "TanAngleton, serif",
//           }}
//         >
//           No Custom Requests
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
//           Custom Requests
//         </h1>

//       </div>

//       {/* GRID */}
//       <div className="grid gap-6">

//         {requests.map((request) => (

//           <div
//             key={request.id}
//             className="bg-white border border-black/10 rounded-3xl p-7 shadow-sm"
//           >

//             {/* TOP */}
//             <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-7">

//               <div>

//                 <h2
//                   className="text-3xl mb-2"
//                   style={{
//                     fontFamily:
//                       "TanAngleton, serif",
//                   }}
//                 >
//                   {
//                     request.title ||
//                     "Custom Atelier Request"
//                   }
//                 </h2>

//                 <p className="text-sm text-black/50">
//                   Request ID #{request.id}
//                 </p>

//               </div>

//               {/* STATUS */}
//               <div>

//                 <select
//                   value={
//                     request.status ||
//                     "PENDING"
//                   }
//                   disabled={
//                     updatingId ===
//                     request.id
//                   }
//                   onChange={(e) =>
//                     handleStatusUpdate(
//                       request.id,
//                       e.target.value
//                     )
//                   }
//                   className="border border-black/10 bg-[#F8F6F4] px-5 py-3 rounded-2xl outline-none"
//                 >

//                   <option value="PENDING">
//                     PENDING
//                   </option>

//                   <option value="IN_PROGRESS">
//                     IN PROGRESS
//                   </option>

//                   <option value="APPROVED">
//                     APPROVED
//                   </option>

//                   <option value="COMPLETED">
//                     COMPLETED
//                   </option>

//                   <option value="REJECTED">
//                     REJECTED
//                   </option>

//                 </select>

//               </div>

//             </div>

//             {/* BODY */}
//             <div className="grid md:grid-cols-2 gap-8">

//               {/* LEFT */}
//               <div className="space-y-6">

//                 <div>
//                   <p className="text-xs uppercase tracking-widest text-black/45 mb-2">
//                     Customer
//                   </p>

//                   <p className="text-lg font-medium">
//                     {
//                       request.user
//                         ?.username
//                     }
//                   </p>
//                 </div>

//                 <div className="flex gap-3">

//                   <Mail
//                     size={18}
//                     className="mt-1 text-black/50"
//                   />

//                   <div>
//                     <p className="text-xs uppercase tracking-widest text-black/45 mb-2">
//                       Email
//                     </p>

//                     <p>
//                       {
//                         request.user
//                           ?.email
//                       }
//                     </p>
//                   </div>

//                 </div>

//                 <div className="flex gap-3">

//                   <Phone
//                     size={18}
//                     className="mt-1 text-black/50"
//                   />

//                   <div>
//                     <p className="text-xs uppercase tracking-widest text-black/45 mb-2">
//                       Phone
//                     </p>

//                     <p>
//                       {
//                         request.phoneNumber
//                       }
//                     </p>
//                   </div>

//                 </div>

//               </div>

//               {/* RIGHT */}
//               <div>

//                 <p className="text-xs uppercase tracking-widest text-black/45 mb-3">
//                   Request Description
//                 </p>

//                 <div className="bg-[#F8F6F4] border border-black/10 rounded-2xl p-5 leading-8 text-black/70">

//                   {request.description ||
//                     request.message ||
//                     "No description available"}

//                 </div>

//               </div>

//             </div>

//           </div>
//         ))}

//       </div>
//     </div>
//   );
// }