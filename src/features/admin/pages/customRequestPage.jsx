import React, { useEffect, useState } from "react";

import {
  getAllCustomRequests,
  updateCustomRequestStatus,
} from "../adminServices";

export default function CustomRequestsPage() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  // =======================================================
  // FETCH REQUESTS
  // =======================================================

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      setLoading(true);

      const response =
        await getAllCustomRequests();

      setRequests(response || []);
    } catch (error) {
      console.error(
        "GET CUSTOM REQUESTS ERROR:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  // =======================================================
  // UPDATE STATUS
  // =======================================================

  const handleStatusChange = async (
    id,
    status
  ) => {
    try {
      await updateCustomRequestStatus(
        id,
        status
      );

      fetchRequests();
    } catch (error) {
      console.error(
        "UPDATE CUSTOM REQUEST STATUS ERROR:",
        error
      );
    }
  };

  // =======================================================
  // LOADING
  // =======================================================

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh] bg-[#F2F0EF]">
        <h1
          className="text-3xl text-[#1C2120]"
          style={{ fontFamily: "TanAngleton, serif" }}
        >
          Loading Requests...
        </h1>
      </div>
    );
  }

  // =======================================================
  // EMPTY
  // =======================================================

  if (!requests.length) {
    return (
      <div className="flex justify-center items-center h-[70vh] bg-[#F2F0EF]">
        <h1
          className="text-3xl text-[#1C2120]"
          style={{ fontFamily: "TanAngleton, serif" }}
        >
          No Requests Found
        </h1>
      </div>
    );
  }

  // =======================================================
  // UI
  // =======================================================

  return (
    <div className="min-h-screen bg-[#F2F0EF] text-[#1C2120]">

      {/* HEADER */}
      <div className="mb-10">

        <h1
          className="text-5xl mb-3"
          style={{
            fontFamily: "TanAngleton, serif",
            letterSpacing: "-0.04em",
          }}
        >
          Custom Requests
        </h1>

        <p
          className="text-xs uppercase tracking-[0.35em] text-[#1C2120]/60"
          style={{ fontFamily: "Cardo, serif" }}
        >
          Manage customer custom product requests
        </p>

      </div>

      {/* TABLE */}
      <div className="overflow-x-auto bg-white rounded-[28px] shadow-xl border border-black/5">

        <table className="w-full">

          {/* HEADER */}
          <thead className="bg-black text-[#F2F0EF]">

            <tr>

              <th className="px-6 py-4 text-left text-xs uppercase tracking-[0.25em]">
                S No.
              </th>

              <th className="px-6 py-4 text-left text-xs uppercase tracking-[0.25em]">
                Customer
              </th>

              <th className="px-6 py-4 text-left text-xs uppercase tracking-[0.25em]">
                Size
              </th>

              <th className="px-6 py-4 text-left text-xs uppercase tracking-[0.25em]">
                Color
              </th>

              <th className="px-6 py-4 text-left text-xs uppercase tracking-[0.25em]">
                Description
              </th>

              <th className="px-6 py-4 text-left text-xs uppercase tracking-[0.25em]">
                Status
              </th>

              <th className="px-6 py-4 text-left text-xs uppercase tracking-[0.25em]">
                Action
              </th>

            </tr>

          </thead>

          {/* BODY */}
          <tbody>

            {requests.map((request, index) => (

              <tr
                key={request.id}
                className="border-b border-black/5 hover:bg-black/[0.03] transition"
              >

                {/* S NO */}
                <td
                  className="px-6 py-5"
                  style={{ fontFamily: "TanAngleton, serif" }}
                >
                  {String(index + 1).padStart(2, "0")}
                </td>

                {/* USER */}
                <td className="px-6 py-5 text-sm">
                  {request.user?.username || "N/A"}
                </td>

                {/* SIZE */}
                <td className="px-6 py-5 text-sm">
                  {request.size || "N/A"}
                </td>

                {/* COLOR */}
                <td className="px-6 py-5 text-sm">
                  {request.color || "N/A"}
                </td>

                {/* DESCRIPTION */}
                <td className="px-6 py-5 text-sm max-w-[260px] truncate">
                  {request.designDescription || "N/A"}
                </td>

                {/* STATUS */}
                <td className="px-6 py-5">

                  <span
                    className={`px-4 py-1 rounded-full text-xs font-semibold
                    ${
                      request.status === "APPROVED"
                        ? "bg-green-100 text-green-700"
                        : request.status === "PENDING"
                        ? "bg-yellow-100 text-yellow-700"
                        : request.status === "REJECTED"
                        ? "bg-red-100 text-red-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {request.status}
                  </span>

                </td>

                {/* ACTION */}
                <td className="px-6 py-5">

                  <select
                    value={request.status}
                    onChange={(e) =>
                      handleStatusChange(
                        request.id,
                        e.target.value
                      )
                    }
                    className="bg-[#1C2120] text-[#F2F0EF] px-4 py-2 rounded-xl text-xs uppercase tracking-[0.15em] outline-none cursor-pointer hover:bg-black transition"
                  >
                    <option value="PENDING">PENDING</option>
                    <option value="APPROVED">APPROVED</option>
                    <option value="REJECTED">REJECTED</option>
                  </select>

                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}