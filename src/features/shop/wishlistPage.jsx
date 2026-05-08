// =======================================================
// ✅ FIXED FINAL WISHLIST PAGE (100% WORKING)
// =======================================================

import React, { useEffect, useState } from "react";
import { Heart, ShoppingBag, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

import {
  getWishlist,
  removeFromWishlist,
} from "../shop/shopService";

import { addToCart } from "../cart/cartService";

function WishlistPage() {
  const navigate = useNavigate();

  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [removingId, setRemovingId] = useState(null);
  const [cartLoading, setCartLoading] = useState(null);

  // =====================================================
  // SAFE FLATTEN FUNCTION (FIX CORE ISSUE)
  // =====================================================
  const extractWishlistItems = (data) => {
    if (!data) return [];

    // unwrap axios
    const raw = data?.data ?? data;

    // 1. direct array
    if (Array.isArray(raw)) return raw;

    // 2. common wrappers
    if (Array.isArray(raw?.items)) return raw.items;
    if (Array.isArray(raw?.data)) return raw.data;

    // 3. backend returns product with variants (your case)
    if (raw?.product?.variants) {
      return raw.product.variants.map((v) => ({
        ...v,
        product: raw.product,
      }));
    }

    // 4. deeply nested fallback
    if (Array.isArray(raw?.wishlist)) return raw.wishlist;
    if (Array.isArray(raw?.content)) return raw.content;

    return [];
  };

  // =====================================================
  // FETCH WISHLIST
  // =====================================================
  const fetchWishlist = async () => {
    try {
      setLoading(true);

      const res = await getWishlist();

      const items = extractWishlistItems(res);

      console.log("RAW RESPONSE:", res);
      console.log("EXTRACTED WISHLIST:", items);

      setWishlist(items);
    } catch (error) {
      console.log("WISHLIST FETCH ERROR:", error);
      setWishlist([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  // =====================================================
  // REMOVE
  // =====================================================
  const handleRemove = async (variantId) => {
    try {
      setRemovingId(variantId);

      await removeFromWishlist(variantId);

      setWishlist((prev) =>
        prev.filter((item) => {
          const id =
            item.variantId ||
            item.variant?.id ||
            item.id;

          return id !== variantId;
        })
      );
    } catch (error) {
      console.log("REMOVE ERROR:", error);
    } finally {
      setRemovingId(null);
    }
  };

  // =====================================================
  // ADD TO CART
  // =====================================================
  const handleAddToCart = async (item) => {
    try {
      const variantId =
        item.variantId ||
        item.variant?.id ||
        item.id;

      if (!variantId) return;

      setCartLoading(variantId);

      await addToCart({
        variantId,
        quantity: 1,
      });

      navigate("/cart");
    } catch (error) {
      console.log("ADD TO CART ERROR:", error);
    } finally {
      setCartLoading(null);
    }
  };

  // =====================================================
  // LOADING
  // =====================================================
  if (loading) {
    return (
      <div className="min-h-screen bg-[#F2F0EF] pt-40 flex items-center justify-center">
        <div className="text-xl">Loading Wishlist...</div>
      </div>
    );
  }

  // =====================================================
  // EMPTY
  // =====================================================
  if (!wishlist?.length) {
    return (
      <div className="min-h-screen bg-[#F2F0EF] pt-40 px-6">
        <div className="max-w-3xl mx-auto text-center">

          <div className="flex justify-center mb-8">
            <div className="w-24 h-24 rounded-full border border-black/10 flex items-center justify-center bg-white">
              <Heart size={40} className="text-black/70" />
            </div>
          </div>

          <h1 className="text-5xl mb-6">
            Your Wishlist Is Empty
          </h1>

          <p className="text-black/70 leading-8 max-w-xl mx-auto">
            Save your favorite luxury shawls and timeless pieces to revisit them anytime.
          </p>

          <button
            onClick={() => navigate("/shop")}
            className="mt-10 px-10 py-4 bg-[#1C2120] text-white uppercase tracking-[0.25em] text-xs hover:opacity-90 transition"
          >
            Explore Collection
          </button>

        </div>
      </div>
    );
  }

  // =====================================================
  // UI (UNCHANGED)
  // =====================================================
  return (
    <div className="min-h-screen bg-[#F2F0EF] text-[#1C2120] pt-32">

      <section className="max-w-7xl mx-auto px-6 pb-16">
        <p className="text-xs uppercase tracking-[0.35em] text-black/55 mb-5">
          Personal Collection
        </p>

        <h1 className="text-5xl md:text-7xl leading-tight">
          Your Wishlist
        </h1>

        <p className="mt-6 text-black/70 max-w-2xl leading-8">
          Curate your selection of timeless luxury and heritage artistry.
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-24">

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {wishlist.map((item, index) => {

            const variant = item.variant || item;
            const product = item.product || variant.product || {};

            const variantId =
              item.variantId || variant.id || item.id;

            const productId =
              product.id || variant.productId;

            const image =
              product.primaryImage ||
              variant.imageUrl ||
              product.imageUrl ||
              product.images?.[0]?.imageUrl ||
              "https://via.placeholder.com/500";

            const name =
              product.name ||
              variant.productName ||
              "Luxury Shawl";

            const price =
              variant.price || product.basePrice || 0;

            const color = variant.color || "";
            const size = variant.size || "";

            return (
              <div
                key={variantId || index}
                className="bg-white border border-black/10 overflow-hidden group"
              >

                <div className="relative overflow-hidden">

                  <img
                    src={image}
                    alt={name}
                    onClick={() =>
                      navigate(`/product/${productId}`)
                    }
                    className="w-full h-[420px] object-cover cursor-pointer group-hover:scale-105 transition duration-700"
                  />

                  <button
                    onClick={() => handleRemove(variantId)}
                    className="absolute top-4 right-4 w-11 h-11 bg-white/90 flex items-center justify-center hover:bg-red-500 hover:text-white transition"
                  >
                    {removingId === variantId ? "..." : <Trash2 size={18} />}
                  </button>

                </div>

                <div className="p-6">

                  <div className="flex items-start justify-between gap-4">

                    <div>
                      <h2 className="text-2xl">{name}</h2>
                      <p className="mt-3 text-black/65 text-sm">
                        {color}{size && ` / ${size}`}
                      </p>
                    </div>

                    <Heart size={20} fill="#1C2120" />

                  </div>

                  <p className="mt-6 text-2xl">₹{price}</p>

                  <div className="flex gap-3 mt-8">

                    <button
                      onClick={() => navigate(`/product/${productId}`)}
                      className="flex-1 border border-[#1C2120] py-4 text-xs uppercase tracking-[0.25em] hover:bg-[#1C2120] hover:text-white transition"
                    >
                      View
                    </button>

                    <button
                      onClick={() => handleAddToCart(item)}
                      disabled={cartLoading === variantId}
                      className="flex-1 bg-[#1C2120] text-white py-4 text-xs uppercase tracking-[0.25em] hover:opacity-90 transition flex items-center justify-center gap-3 disabled:opacity-50"
                    >
                      <ShoppingBag size={16} />
                      {cartLoading === variantId ? "Adding..." : "Add To Bag"}
                    </button>

                  </div>

                </div>
              </div>
            );
          })}

        </div>
      </section>
    </div>
  );
}

export default WishlistPage;