import React, { useState } from "react";
import {
  initiateOrder,
  verifyOrder,
} from "../orders/orderService";

export default function OrderPage({ cartItems }) {
  const [loading, setLoading] = useState(false);

  // ==========================================
  // 💰 TOTAL CALCULATION
  // ==========================================
  const total = cartItems.reduce(
    (sum, item) =>
      sum + Number(item.price) * Number(item.quantity),
    0
  );

  // ==========================================
  // 🚀 CHECKOUT HANDLER
  // ==========================================
  const handleCheckout = async () => {
    try {
      setLoading(true);

      // 1️⃣ INITIATE ORDER (FIXED)
      const res = await initiateOrder(cartItems);

      const order = res.data; // 🔥 IMPORTANT FIX

      // 2️⃣ CHECK RAZORPAY SCRIPT
      if (!window.Razorpay) {
        alert("Razorpay SDK not loaded");
        return;
      }

      // 3️⃣ RAZORPAY OPTIONS
      const options = {
        key: "YOUR_RAZORPAY_KEY",
        amount: order.amount, // must come from backend
        currency: "INR",
        name: "Bivela",
        description: "Order Payment",
        order_id: order.razorpayOrderId, // backend must return this

        handler: async function (response) {
          try {
            await verifyOrder({
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
            });

            alert("✅ Payment Successful!");
          } catch (err) {
            console.log(err);
            alert("❌ Payment verification failed");
          }
        },

        theme: {
          color: "#000000",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (err) {
      console.log(err);
      alert("❌ Order failed");
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // 🧾 UI
  // ==========================================
  return (
    <div className="min-h-screen bg-[#F2F0EF] pt-32 px-6">

      <div className="max-w-5xl mx-auto mb-10">
        <h1
          className="text-5xl"
          style={{ fontFamily: "TanAngleton, serif" }}
        >
          Checkout
        </h1>

        <p className="text-black/60 mt-3">
          Review your order before payment
        </p>
      </div>

      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10">

        {/* LEFT */}
        <div className="bg-white border border-black/10 p-6 rounded-2xl space-y-4">
          <h2 className="text-xl mb-4">Your Items</h2>

          {cartItems.map((item, i) => (
            <div
              key={i}
              className="flex justify-between border-b pb-3"
            >
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-black/60">
                  Qty: {item.quantity}
                </p>
              </div>

              <p>₹{item.price * item.quantity}</p>
            </div>
          ))}
        </div>

        {/* RIGHT */}
        <div className="bg-white border border-black/10 p-6 rounded-2xl">

          <h2 className="text-xl mb-6">Order Summary</h2>

          <div className="flex justify-between mb-4">
            <span>Total</span>
            <span>₹{total}</span>
          </div>

          <button
            onClick={handleCheckout}
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded-xl mt-6 hover:opacity-90 transition"
          >
            {loading ? "Processing..." : "Pay Now"}
          </button>

        </div>

      </div>
    </div>
  );
}