import React, { useState } from "react";
import { Minus, Plus, Trash2, ArrowRight } from "lucide-react";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Classic Cashmere",
      price: 18999,
      qty: 1,
      image:
        "https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: 2,
      name: "Royal Weave",
      price: 24999,
      qty: 1,
      image:
        "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1200&auto=format&fit=crop",
    },
  ]);

  const increaseQty = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: item.qty + 1 } : item
      )
    );
  };

  const decreaseQty = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id && item.qty > 1
          ? { ...item, qty: item.qty - 1 }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  return (
    <div className="min-h-screen bg-[#F2F0EF] text-[#1C2120] pt-32">
      {/* HERO */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <p
          className="text-xs uppercase tracking-[0.35em] text-[#1C2120]/55 mb-5"
          style={{ fontFamily: "Cardo, serif" }}
        >
          Shopping Cart
        </p>

        <h1
          className="text-5xl md:text-7xl leading-tight"
          style={{ fontFamily: "TanAngleton, serif" }}
        >
          Your Selected
          <br />
          Pieces
        </h1>

        <p
          className="mt-8 max-w-2xl text-[#1C2120]/70 leading-8"
          style={{ fontFamily: "Cardo, serif" }}
        >
          Review handcrafted creations reserved for you.
        </p>
      </section>

      {/* MAIN */}
      <section className="max-w-7xl mx-auto px-6 pb-24 grid lg:grid-cols-[1.7fr_1fr] gap-14">
        {/* LEFT ITEMS */}
        <div className="space-y-6">
          {cartItems.length === 0 ? (
            <div className="border border-black/10 p-12 text-center">
              <h2
                className="text-3xl mb-4"
                style={{ fontFamily: "TanAngleton, serif" }}
              >
                Cart is Empty
              </h2>

              <p
                className="text-[#1C2120]/70"
                style={{ fontFamily: "Cardo, serif" }}
              >
                Add timeless pieces to continue.
              </p>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="border border-black/10 bg-white p-6 grid md:grid-cols-[180px_1fr] gap-6"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-52 object-cover"
                />

                <div className="flex flex-col justify-between">
                  <div>
                    <h3
                      className="text-3xl mb-3"
                      style={{ fontFamily: "TanAngleton, serif" }}
                    >
                      {item.name}
                    </h3>

                    <p
                      className="text-sm text-[#1C2120]/70 leading-7"
                      style={{ fontFamily: "Cardo, serif" }}
                    >
                      Handcrafted luxury shawl finished with refined detailing.
                    </p>

                    <p
                      className="mt-4 text-lg"
                      style={{ fontFamily: "Cardo, serif" }}
                    >
                      ₹ {item.price.toLocaleString()}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-5 mt-6">
                    {/* Qty */}
                    <div className="flex items-center border border-black/10">
                      <button
                        onClick={() => decreaseQty(item.id)}
                        className="px-4 py-3 hover:bg-[#1C2120] hover:text-[#F2F0EF] transition"
                      >
                        <Minus size={16} />
                      </button>

                      <span
                        className="px-5"
                        style={{ fontFamily: "Cardo, serif" }}
                      >
                        {item.qty}
                      </span>

                      <button
                        onClick={() => increaseQty(item.id)}
                        className="px-4 py-3 hover:bg-[#1C2120] hover:text-[#F2F0EF] transition"
                      >
                        <Plus size={16} />
                      </button>
                    </div>

                    {/* Remove */}
                    <button
                      onClick={() => removeItem(item.id)}
                      className="flex items-center gap-2 text-sm uppercase tracking-[0.25em] hover:opacity-70 transition"
                      style={{ fontFamily: "Cardo, serif" }}
                    >
                      <Trash2 size={16} />
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* RIGHT SUMMARY */}
        <div className="border border-black/10 bg-white p-8 h-fit sticky top-32">
          <p
            className="text-xs uppercase tracking-[0.35em] text-[#1C2120]/55 mb-5"
            style={{ fontFamily: "Cardo, serif" }}
          >
            Order Summary
          </p>

          <h2
            className="text-4xl mb-8"
            style={{ fontFamily: "TanAngleton, serif" }}
          >
            Final Review
          </h2>

          <div
            className="space-y-5 text-sm border-b border-black/10 pb-8"
            style={{ fontFamily: "Cardo, serif" }}
          >
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹ {subtotal.toLocaleString()}</span>
            </div>

            <div className="flex justify-between">
              <span>Shipping</span>
              <span>Complimentary</span>
            </div>

            <div className="flex justify-between">
              <span>Taxes</span>
              <span>Included</span>
            </div>
          </div>

          <div
            className="flex justify-between pt-8 text-lg"
            style={{ fontFamily: "Cardo, serif" }}
          >
            <span>Total</span>
            <span>₹ {subtotal.toLocaleString()}</span>
          </div>

          <button
            className="w-full mt-10 px-8 py-4 bg-[#1C2120] text-[#F2F0EF] text-xs uppercase tracking-[0.30em] hover:opacity-90 transition flex items-center justify-center gap-3"
            style={{ fontFamily: "Cardo, serif" }}
          >
            Proceed Checkout <ArrowRight size={16} />
          </button>
        </div>
      </section>
    </div>
  );
};

export default CartPage;