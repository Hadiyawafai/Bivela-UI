import React, { useEffect, useState } from "react";

import { getAllCarts } from "../adminServices";

export default function CartsPage() {
  const [carts, setCarts] = useState([]);
  const [loading, setLoading] = useState(true);

  // =======================================================
  // FETCH CARTS
  // =======================================================

  useEffect(() => {
    fetchCarts();
  }, []);

  const fetchCarts = async () => {
    try {
      setLoading(true);

      const response = await getAllCarts();

      setCarts(response || []);
    } catch (error) {
      console.error("GET CARTS ERROR:", error);
    } finally {
      setLoading(false);
    }
  };

  // =======================================================
  // LOADING
  // =======================================================

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <h1 className="text-2xl font-semibold">
          Loading Carts...
        </h1>
      </div>
    );
  }

  // =======================================================
  // EMPTY
  // =======================================================

  if (!carts.length) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <h1 className="text-2xl font-semibold">
          No Carts Found
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
          Carts
        </h1>

        <p className="text-black/60">
          View customer cart items
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
                Product
              </th>

              <th className="text-left px-6 py-4">
                Quantity
              </th>

              <th className="text-left px-6 py-4">
                Price
              </th>

              <th className="text-left px-6 py-4">
                Total
              </th>

              <th className="text-left px-6 py-4">
                Added On
              </th>
            </tr>

          </thead>

          <tbody>

            {carts.map((cart) => (

              <tr
                key={cart.id}
                className="border-b border-black/5 hover:bg-black/[0.02] transition"
              >

                {/* ID */}
                <td className="px-6 py-4 font-medium">
                  #{cart.id}
                </td>

                {/* USER */}
                <td className="px-6 py-4">
                  {cart.user?.username || "N/A"}
                </td>

                {/* PRODUCT */}
                <td className="px-6 py-4">
                  {cart.product?.name || "N/A"}
                </td>

                {/* QUANTITY */}
                <td className="px-6 py-4">
                  {cart.quantity || 0}
                </td>

                {/* PRICE */}
                <td className="px-6 py-4">
                  ₹
                  {cart.product?.basePrice || 0}
                </td>

                {/* TOTAL */}
                <td className="px-6 py-4 font-semibold">
                  ₹
                  {(cart.quantity || 0) *
                    (cart.product?.basePrice ||
                      0)}
                </td>

                {/* DATE */}
                <td className="px-6 py-4">
                  {cart.createdAt
                    ? new Date(
                        cart.createdAt
                      ).toLocaleDateString()
                    : "N/A"}
                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}