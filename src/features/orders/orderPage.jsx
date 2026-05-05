// =======================================================
// ✅ FINAL ORDER PAGE (MATCHED WITH BACKEND)
// =======================================================

import React, { useEffect, useState } from "react";
import {
  initiateOrder,
  verifyOrder,
  getMyOrders,
} from "../orders/orderService";
import { getCart } from "../cart/cartService";

function OrderPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  // =========================
  // FETCH ORDERS
  // =========================
  const fetchOrders = async () => {
    try {
      const res = await getMyOrders();
      const data = res?.data || res; // safe fallback
      setOrders(Array.isArray(data) ? data : []);
    } catch (err) {
      console.log("ORDER FETCH ERROR:", err?.response?.data || err.message);
      setOrders([]);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // =========================
  // PLACE ORDER
  // =========================
  const handleOrder = async () => {
    try {
      setLoading(true);

      const cartRes = await getCart();
      const cartItems = cartRes?.data?.items || cartRes?.items || [];

      if (!cartItems.length) {
        alert("Your bag is empty");
        return;
      }

      const orderRes = await initiateOrder(cartItems);
      const order = orderRes?.data || orderRes;

      if (!order?.razorpayOrderId) {
        alert("Order creation failed");
        return;
      }

      const options = {
        key: "YOUR_RAZORPAY_KEY",
        amount: order.amount,
        currency: "INR",
        name: "Bivela House",
        description: "Luxury Order",
        order_id: order.razorpayOrderId,

        handler: async (response) => {
          try {
            await verifyOrder({
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
            });

            alert("Payment Successful ✨");
            fetchOrders();
          } catch (err) {
            console.log("VERIFY ERROR:", err);
            alert("Payment verification failed");
          }
        },

        theme: {
          color: "#1C2120",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (err) {
      console.log("ORDER ERROR:", err?.response?.data || err.message);
      alert("Order failed");
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // UI
  // =========================
  return (
    <div className="bg-[#F2F0EF] min-h-screen pt-32 text-[#1C2120]">

      {/* HEADER */}
      <section className="max-w-6xl mx-auto px-6 mb-16">
        <p className="text-xs uppercase tracking-[0.35em] text-black/50 mb-4">
          Bivela House
        </p>

        <h1 className="text-5xl md:text-6xl"
          style={{ fontFamily: "TanAngleton, serif" }}>
          My Orders
        </h1>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-6 mb-20">
        <button
          onClick={handleOrder}
          disabled={loading}
          className="px-10 py-4 bg-[#1C2120] text-white text-xs uppercase tracking-[0.35em]"
        >
          {loading ? "Processing..." : "Place Order"}
        </button>
      </section>

      {/* ORDERS LIST */}
      <section className="max-w-6xl mx-auto px-6 pb-24">

        {orders.length === 0 ? (
          <div className="text-center border border-black/10 py-20 bg-white">
            <p className="text-black/60">No orders placed yet.</p>
          </div>
        ) : (
          <div className="space-y-10">

            {orders.map((order) => (
              <div
                key={order.orderId}
                className="border border-black/10 bg-white p-10 hover:shadow-sm transition"
              >

                {/* TOP */}
                <div className="flex flex-col md:flex-row justify-between mb-6">

                  <div>
                    <p className="text-xs uppercase tracking-[0.30em] text-black/40 mb-2">
                      Order ID
                    </p>
                    <p className="text-lg">
                      #{order.orderId}
                    </p>
                  </div>

                  <div className="mt-4 md:mt-0 text-right">
                    <p className="text-xs uppercase tracking-[0.30em] text-black/40 mb-2">
                      Status
                    </p>
                    <span
                      className={`px-4 py-1 text-xs uppercase tracking-widest border ${
                        order.status === "PAID"
                          ? "border-green-600 text-green-700"
                          : "border-black/30 text-black/60"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>

                </div>

                {/* ITEMS */}
                <div className="border-t border-black/10 my-6"></div>

                <div className="text-sm text-black/60 space-y-2">
                  {order.items?.map((item, index) => (
                    <div key={index}>
                      {item.productName} × {item.quantity} — ₹{item.price}
                    </div>
                  ))}
                </div>

                {/* TOTAL */}
                <div className="mt-6">
                  <p className="text-2xl">
                    ₹{order.totalAmount}
                  </p>
                </div>

              </div>
            ))}

          </div>
        )}

      </section>

    </div>
  );
}

export default OrderPage;