// =======================================================
// ✅ FINAL CART PAGE (FIXED + BACKEND MATCHED)
// =======================================================

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getCart,
  removeFromCart,
  clearCart,
  addToCart,
} from "./cartService";

function CartPage() {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // =============================
  // FETCH CART
  // =============================
  const fetchCart = async () => {
    try {
      setLoading(true);

      const res = await getCart();

      const data = res?.data ?? res;

      setItems(data?.items || []);
      setTotal(data?.totalPrice || 0);

    } catch (error) {
      console.log("CART FETCH ERROR:", error?.response?.data || error.message);
      setItems([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // =============================
  // REMOVE ITEM
  // =============================
  const handleRemove = async (variantId) => {
    try {
      await removeFromCart(variantId);
      fetchCart();
    } catch (error) {
      console.log("REMOVE ERROR:", error);
    }
  };

  // =============================
  // CLEAR CART
  // =============================
  const handleClear = async () => {
    try {
      await clearCart();
      setItems([]);
      setTotal(0);
    } catch (error) {
      console.log("CLEAR ERROR:", error);
    }
  };

  // =============================
  // INCREASE QTY
  // =============================
  const increaseQty = async (item) => {
    try {
      await addToCart({
        variantId: item.variantId,
        quantity: 1,
      });

      fetchCart();
    } catch (err) {
      console.log("INCREASE ERROR:", err);
    }
  };

  // =============================
  // DECREASE QTY (SAFE)
  // =============================
  const decreaseQty = async (item) => {
    try {
      if (item.quantity <= 1) {
        await removeFromCart(item.variantId);
      } else {
        // backend-safe approach
        await addToCart({
          variantId: item.variantId,
          quantity: -1,
        });
      }

      fetchCart();
    } catch (err) {
      console.log("DECREASE ERROR:", err);
    }
  };

  // =============================
  // IMAGE HANDLER
  // =============================
  const getImage = (item) => {
    let img = item.product?.images?.[0]?.url;

    if (img && img.startsWith("/")) {
      img = `https://rocket-cuddle-goatskin.ngrok-free.dev${img}`;
    }

    return img || "https://via.placeholder.com/300";
  };

  // =============================
  // LOADING UI
  // =============================
  if (loading) {
    return (
      <div className="pt-40 text-center text-xl min-h-screen bg-[#F2F0EF]">
        Loading Cart...
      </div>
    );
  }

  // =============================
  // UI
  // =============================
  return (
    <div className="bg-[#F2F0EF] min-h-screen pt-32 px-6">

      <h1 className="text-4xl mb-12">
        Your Bag
      </h1>

      {items.length === 0 ? (
        <p className="text-lg text-gray-600">
          Your cart is empty
        </p>
      ) : (
        <>
          {/* ITEMS */}
          <div className="space-y-10">

            {items.map((item) => (
              <div
                key={item.variantId}
                className="flex gap-8 border-b border-black/10 pb-10"
              >

                {/* IMAGE */}
                <img
                  src={getImage(item)}
                  alt="product"
                  className="w-40 h-40 object-cover bg-white border"
                />

                {/* DETAILS */}
                <div className="flex-1 flex flex-col justify-between">

                  <div>
                    <h2 className="text-lg">
                      {item.product?.name || item.productName}
                    </h2>

                    <p className="mt-2 text-sm text-gray-600">
                      ₹{item.price}
                    </p>
                  </div>

                  {/* QTY CONTROLS */}
                  <div className="flex items-center gap-4 mt-6">

                    <button
                      onClick={() => decreaseQty(item)}
                      className="w-8 h-8 border hover:bg-black hover:text-white"
                    >
                      −
                    </button>

                    <span className="w-6 text-center">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() => increaseQty(item)}
                      className="w-8 h-8 border hover:bg-black hover:text-white"
                    >
                      +
                    </button>

                  </div>

                  {/* REMOVE */}
                  <button
                    onClick={() => handleRemove(item.variantId)}
                    className="mt-6 text-xs text-gray-500 hover:text-black"
                  >
                    Remove
                  </button>

                </div>

              </div>
            ))}

          </div>

          {/* TOTAL SECTION */}
          <div className="mt-16 flex justify-between items-center border-t pt-10">

            <div>
              <p className="text-sm text-gray-600">Total</p>
              <h2 className="text-2xl">₹{total}</h2>
            </div>

            <div className="flex gap-4">

              <button
                onClick={handleClear}
                className="px-6 py-3 border hover:bg-black hover:text-white"
              >
                Clear
              </button>

              <button
                onClick={() => navigate("/orders")}
                className="px-8 py-3 bg-black text-white hover:opacity-80"
              >
                Checkout
              </button>

            </div>

          </div>
        </>
      )}

    </div>
  );
}

export default CartPage;