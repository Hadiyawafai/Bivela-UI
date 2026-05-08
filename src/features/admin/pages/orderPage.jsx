import React, { useEffect, useState } from "react";

import {
  ChevronDown,
} from "lucide-react";

import {
  getAllOrders,
  updateOrderStatus,
} from "../adminServices";

export default function OrdersPage() {
  const [orders, setOrders] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  // =======================================================
  // FETCH ORDERS
  // =======================================================

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);

      const response =
        await getAllOrders();

      setOrders(response || []);

    } catch (error) {
      console.error(
        "GET ORDERS ERROR:",
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
      await updateOrderStatus(
        id,
        status
      );

      fetchOrders();

    } catch (error) {
      console.error(
        "UPDATE STATUS ERROR:",
        error
      );
    }
  };

  // =======================================================
  // FORMAT DATE
  // =======================================================

  const formatDate = (order) => {
    const rawDate =
      order.createdAt ||
      order.orderDate ||
      order.date;

    if (!rawDate) return "N/A";

    return new Date(
      rawDate
    ).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };

  // =======================================================
  // LOADING
  // =======================================================

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh] bg-[#F2F0EF]">

        <h1
          className="text-3xl text-[#1C2120]"
          style={{
            fontFamily:
              "TanAngleton, serif",
          }}
        >
          Loading Orders...
        </h1>

      </div>
    );
  }

  // =======================================================
  // EMPTY
  // =======================================================

  if (!orders.length) {
    return (
      <div className="flex justify-center items-center h-[70vh] bg-[#F2F0EF]">

        <h1
          className="text-3xl text-[#1C2120]"
          style={{
            fontFamily:
              "TanAngleton, serif",
          }}
        >
          No Orders Found
        </h1>

      </div>
    );
  }

  // =======================================================
  // UI
  // =======================================================

  return (
    <div className="min-h-screen bg-[#F2F0EF] text-[#1C2120]">

      {/* ======================================================= */}
      {/* HEADER */}
      {/* ======================================================= */}

      <div className="mb-10">

        <h1
          className="text-5xl mb-4"
          style={{
            fontFamily:
              "TanAngleton, serif",
            letterSpacing: "-0.04em",
          }}
        >
          Orders
        </h1>

        <p
          className="text-sm uppercase tracking-[0.35em] text-[#1C2120]/60"
          style={{
            fontFamily: "Cardo, serif",
          }}
        >
          Manage Customer Orders
        </p>

      </div>

      {/* ======================================================= */}
      {/* TABLE */}
      {/* ======================================================= */}

      <div className="overflow-x-auto bg-white rounded-[32px] shadow-xl border border-black/5 overflow-hidden">

        <table className="w-full">

          {/* ======================================================= */}
          {/* TABLE HEAD */}
          {/* ======================================================= */}

          <thead className="bg-black text-[#F2F0EF]">

            <tr>

              <th className="text-left px-8 py-5 text-xs uppercase tracking-[0.25em] font-medium">
                S No.
              </th>

              <th className="text-left px-8 py-5 text-xs uppercase tracking-[0.25em] font-medium">
                Customer
              </th>

              <th className="text-left px-8 py-5 text-xs uppercase tracking-[0.25em] font-medium">
                Amount
              </th>

              <th className="text-left px-8 py-5 text-xs uppercase tracking-[0.25em] font-medium">
                Status
              </th>

              <th className="text-left px-8 py-5 text-xs uppercase tracking-[0.25em] font-medium">
                Date
              </th>

              <th className="text-left px-8 py-5 text-xs uppercase tracking-[0.25em] font-medium">
                Action
              </th>

            </tr>

          </thead>

          {/* ======================================================= */}
          {/* TABLE BODY */}
          {/* ======================================================= */}

          <tbody>

            {orders.map(
              (order, index) => (

                <tr
                  key={order.id}
                  className="border-b border-black/5 hover:bg-black/[0.03] transition-all duration-300"
                >

                  {/* SERIAL */}
                  <td
                    className="px-8 py-6 text-lg"
                    style={{
                      fontFamily:
                        "TanAngleton, serif",
                    }}
                  >
                    {String(
                      index + 1
                    ).padStart(2, "0")}
                  </td>

                  {/* CUSTOMER */}
                  <td
                    className="px-8 py-6"
                    style={{
                      fontFamily:
                        "Cardo, serif",
                    }}
                  >
                    {order.user
                      ?.username ||
                      "N/A"}
                  </td>

                  {/* AMOUNT */}
                  <td className="px-8 py-6 font-semibold">
                    ₹
                    {order.totalAmount ||
                      0}
                  </td>

                  {/* STATUS */}
                  <td className="px-8 py-6">

                    <span
                      className={`px-5 py-2 rounded-full text-[11px] uppercase tracking-[0.18em] font-semibold
                      ${
                        order.status ===
                        "DELIVERED"
                          ? "bg-green-100 text-green-700"
                          : order.status ===
                            "PENDING"
                          ? "bg-yellow-100 text-yellow-700"
                          : order.status ===
                            "PROCESSING"
                          ? "bg-blue-100 text-blue-700"
                          : order.status ===
                            "SHIPPED"
                          ? "bg-purple-100 text-purple-700"
                          : order.status ===
                            "CANCELLED"
                          ? "bg-red-100 text-red-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {order.status}
                    </span>

                  </td>

                  {/* DATE */}
                  <td
                    className="px-8 py-6"
                    style={{
                      fontFamily:
                        "Cardo, serif",
                    }}
                  >
                    {formatDate(order)}
                  </td>

                  {/* ACTION */}
                  <td className="px-8 py-6">

                    <div className="relative inline-block">

                      <select
                        value={
                          order.status
                        }
                        onChange={(e) =>
                          handleStatusChange(
                            order.id,
                            e.target.value
                          )
                        }
                        className="appearance-none bg-[#1C2120] text-[#F2F0EF] border border-black/10 rounded-2xl px-5 py-3 pr-12 outline-none text-xs uppercase tracking-[0.18em] cursor-pointer hover:bg-black transition-all duration-300"

                        style={{
                          WebkitAppearance:
                            "none",
                          MozAppearance:
                            "none",
                        }}
                      >

                        <option
                          value="PENDING"
                          className="bg-[#1C2120] text-[#F2F0EF]"
                        >
                          Pending
                        </option>

                        <option
                          value="PROCESSING"
                          className="bg-[#1C2120] text-[#F2F0EF]"
                        >
                          Processing
                        </option>

                        <option
                          value="SHIPPED"
                          className="bg-[#1C2120] text-[#F2F0EF]"
                        >
                          Shipped
                        </option>

                        <option
                          value="DELIVERED"
                          className="bg-[#1C2120] text-[#F2F0EF]"
                        >
                          Delivered
                        </option>

                        <option
                          value="CANCELLED"
                          className="bg-[#1C2120] text-[#F2F0EF]"
                        >
                          Cancelled
                        </option>

                      </select>

                      <ChevronDown
                        size={16}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-[#F2F0EF] pointer-events-none"
                      />

                    </div>

                  </td>

                </tr>
              )
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}