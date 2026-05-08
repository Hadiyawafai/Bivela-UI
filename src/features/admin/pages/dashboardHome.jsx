import React, { useEffect, useState } from "react";

import {
  ShoppingBag,
  Users,
  CalendarCheck,
  BrushCleaning,
} from "lucide-react";

import {
  getAllOrders,
  getAllUsers,
  getAllServiceBookings,
  getAllCustomRequests,
} from "../adminServices";

export default function DashboardHome() {
  const [stats, setStats] = useState({
    users: 0,
    orders: 0,
    bookings: 0,
    requests: 0,
  });

  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // ================================
  // FETCH DATA
  // ================================
  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      setLoading(true);

      const [users, orders, bookings, requests] =
        await Promise.all([
          getAllUsers(),
          getAllOrders(),
          getAllServiceBookings(),
          getAllCustomRequests(),
        ]);

      const safeUsers = Array.isArray(users) ? users : users?.data || [];
      const safeOrders = Array.isArray(orders) ? orders : orders?.data || [];
      const safeBookings = Array.isArray(bookings) ? bookings : bookings?.data || [];
      const safeRequests = Array.isArray(requests) ? requests : requests?.data || [];

      setStats({
        users: safeUsers.length,
        orders: safeOrders.length,
        bookings: safeBookings.length,
        requests: safeRequests.length,
      });

      setRecentOrders(safeOrders.slice(0, 5));
    } catch (error) {
      console.error("DASHBOARD FETCH ERROR:", error);
    } finally {
      setLoading(false);
    }
  };

  // ================================
  // LOADING
  // ================================
  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh] bg-[#F2F0EF]">
        <h1
          className="text-3xl text-[#1C2120]"
          style={{ fontFamily: "TanAngleton, serif" }}
        >
          Loading Dashboard...
        </h1>
      </div>
    );
  }

  // ================================
  // CARDS (NOW WHITE THEME)
  // ================================
  const cards = [
    { title: "Users", value: stats.users, icon: <Users size={22} /> },
    { title: "Orders", value: stats.orders, icon: <ShoppingBag size={22} /> },
    { title: "Bookings", value: stats.bookings, icon: <CalendarCheck size={22} /> },
    { title: "Requests", value: stats.requests, icon: <BrushCleaning size={22} /> },
  ];

  return (
    <div className="min-h-screen bg-[#F2F0EF] text-[#1C2120] px-6 py-10">

      {/* HEADER */}
      <div className="mb-10">
        <h1
          className="text-4xl md:text-5xl"
          style={{ fontFamily: "TanAngleton, serif" }}
        >
          Dashboard
        </h1>

        <p className="text-xs uppercase tracking-[0.3em] text-[#1C2120]/60 mt-3">
          Overview of store performance
        </p>
      </div>

      {/* ================= CARDS (FIXED TO WHITE) ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-12">

        {cards.map((card, i) => (
          <div
            key={i}
            className="bg-white text-[#1C2120] rounded-2xl p-6 border border-black/10 shadow-sm hover:-translate-y-1 transition"
          >
            <div className="flex justify-between items-center">

              <div>
                <p className="text-[10px] uppercase tracking-[0.25em] text-black/50">
                  {card.title}
                </p>

                <h2
                  className="text-3xl mt-2"
                  style={{ fontFamily: "TanAngleton, serif" }}
                >
                  {card.value}
                </h2>
              </div>

              <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-black text-white">
                {card.icon}
              </div>

            </div>
          </div>
        ))}

      </div>

      {/* ================= TABLE (NO HEADING) ================= */}
      <div className="bg-white rounded-2xl border border-black/5 overflow-hidden shadow-sm">

        {/* TABLE */}
        <div className="overflow-x-auto">

          <table className="w-full">

            {/* HEADER FIXED ALIGNMENT */}
            <thead className="bg-black text-white">

              <tr className="text-xs uppercase tracking-[0.25em]">

                <th className="px-6 py-4 text-left w-20">S.No</th>
                <th className="px-6 py-4 text-left">Customer</th>
                <th className="px-6 py-4 text-left">Amount</th>
                <th className="px-6 py-4 text-left">Status</th>

              </tr>

            </thead>

            <tbody>

              {recentOrders.map((order, index) => (
                <tr
                  key={order.id}
                  className="border-b border-black/5 hover:bg-[#F2F0EF]/60 transition"
                >

                  {/* S.NO */}
                  <td className="px-6 py-4 font-medium">
                    {String(index + 1).padStart(2, "0")}
                  </td>

                  {/* CUSTOMER */}
                  <td className="px-6 py-4" style={{ fontFamily: "Cardo, serif" }}>
                    {order?.user?.username || "Guest"}
                  </td>

                  {/* AMOUNT */}
                  <td className="px-6 py-4 font-semibold">
                    ₹{order.totalAmount || 0}
                  </td>

                  {/* STATUS */}
                  <td className="px-6 py-4">

                    <span
                      className={`px-4 py-1 rounded-full text-[10px] uppercase tracking-wider font-semibold
                      ${
                        order.status === "DELIVERED"
                          ? "bg-green-100 text-green-700"
                          : order.status === "PENDING"
                          ? "bg-yellow-100 text-yellow-700"
                          : order.status === "CANCELLED"
                          ? "bg-red-100 text-red-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {order.status}
                    </span>

                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}