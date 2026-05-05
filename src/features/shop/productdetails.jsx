// =======================================================
// FINAL PRODUCT DETAILS (CART + BUY NOW ADDED)
// =======================================================

import React, { useEffect, useState } from "react";
import {
  useParams,
  useNavigate,
  NavLink,
} from "react-router-dom";

import { getProductById } from "../shop/shopService";
import { addToCart } from "../cart/cartService";

// 🔥 ADD THIS IMPORT (ORDER SERVICE)
import { initiateOrder } from "../orders/orderService";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedVariant, setSelectedVariant] = useState(null);

  // =============================
  // FETCH PRODUCT
  // =============================
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);

        const data = await getProductById(id);
        setProduct(data);

        const first =
          data.primaryImage ||
          data.images?.find((img) => img.isPrimary)?.imageUrl ||
          data.images?.[0]?.imageUrl ||
          "";

        setSelectedImage(first);

        if (data.variants?.length > 0) {
          setSelectedVariant(data.variants[0]);
        }
      } catch (error) {
        console.log("PRODUCT ERROR:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // =============================
  const getVariant = () => {
    return selectedVariant || product?.variants?.[0];
  };

  // =============================
  // ADD TO BAG (EXISTING)
  // =============================
  const handleAddToBag = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login first");
        navigate("/auth");
        return;
      }

      const variant = getVariant();

      if (!variant?.id) {
        alert("Please select a variant");
        return;
      }

      await addToCart({
        variantId: variant.id,
        quantity: 1,
      });

      alert("Added to Bag 🛒");
      navigate("/cart");

    } catch (error) {
      console.log("CART ERROR:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Failed to add to cart");
    }
  };

  // =======================================================
  // 💳 BUY NOW (NEW LOGIC ADDED)
  // =======================================================
  const handleBuyNow = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login first");
        navigate("/auth");
        return;
      }

      const variant = getVariant();

      if (!variant?.id) {
        alert("Please select a variant");
        return;
      }

      // 1️⃣ Create Order from SINGLE ITEM
      const orderRes = await initiateOrder([
        {
          variantId: variant.id,
          quantity: 1,
        },
      ]);

      const order = orderRes;

      // 2️⃣ Razorpay options (backend should send these ideally)
      const options = {
        key: "YOUR_RAZORPAY_KEY_ID", // replace this
        amount: order.amount || product.basePrice * 100,
        currency: "INR",
        name: product.name,
        description: "Product Purchase",
        order_id: order.razorpayOrderId, // MUST come from backend

        handler: async function (response) {
          try {
            // verify payment
            await fetch("/api/orders/verify", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                razorpayOrderId: response.razorpay_order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpaySignature: response.razorpay_signature,
              }),
            });

            alert("Payment Successful 🎉");
            navigate("/orders");

          } catch (err) {
            console.log("VERIFY ERROR:", err);
          }
        },

        theme: {
          color: "#1C2120",
        },
      };

      // 3️⃣ OPEN RAZORPAY
      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (error) {
      console.log("BUY NOW ERROR:", error);
      alert("Failed to process Buy Now");
    }
  };

  // =============================
  if (loading) {
    return (
      <div className="pt-40 text-center text-xl min-h-screen bg-[#F2F0EF]">
        Loading Product...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="pt-40 text-center text-xl min-h-screen bg-[#F2F0EF]">
        Product Not Found
      </div>
    );
  }

  const price =
    selectedVariant?.price || product.basePrice;

  const stock =
    selectedVariant?.stock ?? 0;

  const images =
    product.images?.length > 0
      ? product.images
      : [{ imageUrl: product.primaryImage }];

  // =============================
  return (
    <div className="bg-[#F2F0EF] text-[#1C2120] min-h-screen pt-32">

      {/* TOP */}
      <section className="max-w-7xl mx-auto px-6 pb-10">
        <NavLink
          to="/shop"
          className="text-xs uppercase tracking-[0.30em] border-b border-[#1C2120] pb-1"
        >
          Back To Collection
        </NavLink>
      </section>

      {/* MAIN */}
      <section className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 pb-24">

        {/* LEFT */}
        <div>
          <div className="border border-[#1C2120]/10">
            <img
              src={selectedImage}
              alt={product.name}
              className="w-full h-[650px] object-cover"
            />
          </div>

          <div className="grid grid-cols-4 gap-4 mt-4">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setSelectedImage(img.imageUrl)}
                className={`border ${
                  selectedImage === img.imageUrl
                    ? "border-black"
                    : "border-black/10"
                }`}
              >
                <img
                  src={img.imageUrl}
                  className="w-full h-24 object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* RIGHT */}
        <div>

          <h1 className="text-5xl">{product.name}</h1>

          <p className="mt-5 text-3xl">₹{price}</p>

          <p className="mt-3 text-sm text-[#1C2120]/70">
            ★ {product.averageRating || 0} / 5 ·{" "}
            {product.totalReviews || 0} Reviews
          </p>

          <div className="mt-8 text-[#1C2120]/75 leading-8">
            {product.description}
          </div>

          <div className="mt-10 text-sm">
            <p><strong>Category:</strong> {product.categoryName}</p>
            <p>
              <strong>Availability:</strong>{" "}
              {stock > 0 ? "In Stock" : "Out Of Stock"}
            </p>
          </div>

          {/* VARIANTS */}
          {product.variants?.length > 0 && (
            <div className="mt-10">
              <p className="text-xs uppercase mb-4">
                Select Variant
              </p>

              <div className="flex gap-3 flex-wrap">
                {product.variants.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedVariant(item)}
                    className={`px-5 py-3 border ${
                      selectedVariant?.id === item.id
                        ? "bg-[#1C2120] text-white"
                        : ""
                    }`}
                  >
                    {item.color} / {item.size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* BUTTONS */}
          <div className="flex gap-4 mt-10">

            <button
              onClick={handleAddToBag}
              className="px-8 py-4 bg-[#1C2120] text-white text-xs uppercase"
            >
              Add To Bag
            </button>

            {/* 🔥 NEW BUY NOW BUTTON */}
            <button
              onClick={handleBuyNow}
              className="px-8 py-4 border border-[#1C2120] text-xs uppercase"
            >
              Buy Now
            </button>

          </div>

        </div>
      </section>
    </div>
  );
}

export default ProductDetails;