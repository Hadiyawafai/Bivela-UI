import React, { useEffect, useState } from "react";

import {
  getAllServiceBookings,
  updateServiceBookingStatus,
} from "../adminServices";

export default function ServiceBookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // =======================================================
  // FETCH BOOKINGS
  // =======================================================

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);

      const response =
        await getAllServiceBookings();

      setBookings(response || []);
    } catch (error) {
      console.error(
        "GET SERVICE BOOKINGS ERROR:",
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
      await updateServiceBookingStatus(
        id,
        status
      );

      fetchBookings();
    } catch (error) {
      console.error(
        "UPDATE SERVICE BOOKING STATUS ERROR:",
        error
      );
    }
  };

  // =======================================================
  // LOADING
  // =======================================================

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <h1 className="text-2xl font-semibold">
          Loading Service Bookings...
        </h1>
      </div>
    );
  }

  // =======================================================
  // EMPTY
  // =======================================================

  if (!bookings.length) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <h1 className="text-2xl font-semibold">
          No Service Bookings Found
        </h1>
      </div>
    );
  }

  // =======================================================
  // UI
  // =======================================================

  return (
    <div>

      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">
          Service Bookings
        </h1>

        <p className="text-black/60">
          Manage customer service bookings
        </p>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto bg-white rounded-3xl shadow-sm border border-black/5">

        <table className="w-full">

          <thead className="bg-black text-white">

            <tr>
              <th className="text-left px-6 py-4">
                ID
              </th>

              <th className="text-left px-6 py-4">
                Customer
              </th>

              <th className="text-left px-6 py-4">
                Service
              </th>

              <th className="text-left px-6 py-4">
                Phone
              </th>

              <th className="text-left px-6 py-4">
                Address
              </th>

              <th className="text-left px-6 py-4">
                Date
              </th>

              <th className="text-left px-6 py-4">
                Status
              </th>

              <th className="text-left px-6 py-4">
                Action
              </th>
            </tr>

          </thead>

          <tbody>

            {bookings.map((booking) => (

              <tr
                key={booking.id}
                className="border-b border-black/5 hover:bg-black/[0.02] transition"
              >

                {/* ID */}
                <td className="px-6 py-4 font-medium">
                  #{booking.id}
                </td>

                {/* USER */}
                <td className="px-6 py-4">
                  {booking.user?.username || "N/A"}
                </td>

                {/* SERVICE */}
                <td className="px-6 py-4">
                  {booking.serviceType || "N/A"}
                </td>

                {/* PHONE */}
                <td className="px-6 py-4">
                  {booking.phoneNumber || "N/A"}
                </td>

                {/* ADDRESS */}
                <td className="px-6 py-4 max-w-[250px] truncate">
                  {booking.address || "N/A"}
                </td>

                {/* DATE */}
                <td className="px-6 py-4">
                  {booking.scheduledDate
                    ? new Date(
                        booking.scheduledDate
                      ).toLocaleDateString()
                    : "N/A"}
                </td>

                {/* STATUS */}
                <td className="px-6 py-4">

                  <span
                    className={`px-4 py-1 rounded-full text-xs font-semibold
                    ${
                      booking.status === "COMPLETED"
                        ? "bg-green-100 text-green-700"
                        : booking.status === "PENDING"
                        ? "bg-yellow-100 text-yellow-700"
                        : booking.status === "CANCELLED"
                        ? "bg-red-100 text-red-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {booking.status}
                  </span>

                </td>

                {/* ACTION */}
                <td className="px-6 py-4">

                  <select
                    value={booking.status}
                    onChange={(e) =>
                      handleStatusChange(
                        booking.id,
                        e.target.value
                      )
                    }
                    className="border border-black/10 rounded-lg px-3 py-2 outline-none"
                  >
                    <option value="PENDING">
                      PENDING
                    </option>

                    <option value="CONFIRMED">
                      CONFIRMED
                    </option>

                    <option value="COMPLETED">
                      COMPLETED
                    </option>

                    <option value="CANCELLED">
                      CANCELLED
                    </option>
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