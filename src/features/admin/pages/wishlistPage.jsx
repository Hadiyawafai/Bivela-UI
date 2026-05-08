import React, { useEffect, useState } from "react";

import { getAllWishlists } from "../adminService";

export default function WishlistsPage() {
  const [wishlists, setWishlists] = useState([]);
  const [loading, setLoading] = useState(true);

  // =======================================================
  // FETCH WISHLISTS
  // =======================================================

  useEffect(() => {
    fetchWishlists();
  }, []);

  const fetchWishlists = async () => {
    try {
      setLoading(true);

      const response = await getAllWishlists();

      setWishlists(response || []);
    } catch (error) {
      console.error(
        "GET WISHLISTS ERROR:",
        error
      );
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
          Loading Wishlists...
        </h1>
      </div>
    );
  }

  // =======================================================
  // EMPTY
  // =======================================================

  if (!wishlists.length) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <h1 className="text-2xl font-semibold">
          No Wishlists Found
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
          Wishlists
        </h1>

        <p className="text-black/60">
          View customer wishlist items
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
                Price
              </th>

              <th className="text-left px-6 py-4">
                Added On
              </th>
            </tr>

          </thead>

          <tbody>

            {wishlists.map((wishlist) => (

              <tr
                key={wishlist.id}
                className="border-b border-black/5 hover:bg-black/[0.02] transition"
              >

                {/* ID */}
                <td className="px-6 py-4 font-medium">
                  #{wishlist.id}
                </td>

                {/* USER */}
                <td className="px-6 py-4">
                  {wishlist.user?.username || "N/A"}
                </td>

                {/* PRODUCT */}
                <td className="px-6 py-4">
                  {wishlist.product?.name || "N/A"}
                </td>

                {/* PRICE */}
                <td className="px-6 py-4">
                  ₹
                  {wishlist.product?.basePrice ||
                    0}
                </td>

                {/* DATE */}
                <td className="px-6 py-4">
                  {wishlist.createdAt
                    ? new Date(
                        wishlist.createdAt
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