// =======================================================
// FINAL SHOP PAGE (PRICE + UI FIXED)
// =======================================================

import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { NavLink } from "react-router-dom";
import ProductCard from "../../components/common/card";
import { getAllProducts } from "./shopService";

// =====================================
// PRODUCT SLIDER CARD
// =====================================
function ProductSliderCard({ item, images }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!images || images.length <= 1) return;

    const interval = setInterval(() => {
      setIndex((prev) =>
        prev === images.length - 1 ? 0 : prev + 1
      );
    }, 2500);

    return () => clearInterval(interval);
  }, [images]);

  // ✅ PRICE FIX (IMPORTANT)
  const price =
    item.basePrice ??
    item.variants?.[0]?.price ??
    0;

  return (
    <div className="bg-white p-4 border border-black/8 hover:shadow-xl transition">

      <div className="relative">
        <ProductCard
          id={item.id}
          image={images[index] || "/placeholder.png"}
          title={item.name}
          description={item.description}
          price={price}
        />

        {/* DOTS */}
        {images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1">
            {images.map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full ${
                  i === index
                    ? "bg-black"
                    : "bg-black/30"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// =====================================
// MAIN SHOP PAGE
// =====================================
function ShopPage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  const dropdownRef = useRef(null);

  // =====================================
  // CLOSE DROPDOWN
  // =====================================
  useEffect(() => {
    const close = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", close);
    return () =>
      document.removeEventListener("mousedown", close);
  }, []);

  // =====================================
  // FETCH PRODUCTS
  // =====================================
  const fetchProducts = async () => {
    try {
      setLoading(true);

      const data = await getAllProducts();
      const safe = Array.isArray(data) ? data : [];

      setProducts(safe);
      setFilteredProducts(safe);
    } catch (err) {
      console.log("PRODUCT FETCH ERROR:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // =====================================
  // FILTER + SEARCH + SORT
  // =====================================
  useEffect(() => {
    let result = [...products];

    // FILTER
    if (activeFilter !== "All") {
      result = result.filter(
        (item) =>
          item.categoryName?.toLowerCase() ===
          activeFilter.toLowerCase()
      );
    }

    // SEARCH
    if (search.trim()) {
      result = result.filter((item) =>
        item.name
          ?.toLowerCase()
          .includes(search.toLowerCase())
      );
    }

    // SORT
    if (sortBy === "low-high") {
      result.sort(
        (a, b) =>
          Number(
            a.basePrice ??
              a.variants?.[0]?.price ??
              0
          ) -
          Number(
            b.basePrice ??
              b.variants?.[0]?.price ??
              0
          )
      );
    }

    if (sortBy === "high-low") {
      result.sort(
        (a, b) =>
          Number(
            b.basePrice ??
              b.variants?.[0]?.price ??
              0
          ) -
          Number(
            a.basePrice ??
              a.variants?.[0]?.price ??
              0
          )
      );
    }

    setFilteredProducts(result);
  }, [products, activeFilter, search, sortBy]);

  // =====================================
  // STATS
  // =====================================
  const totalProducts = filteredProducts.length;

  const avgPrice = useMemo(() => {
    if (!filteredProducts.length) return 0;

    const total = filteredProducts.reduce(
      (sum, item) =>
        sum +
        Number(
          item.basePrice ??
            item.variants?.[0]?.price ??
            0
        ),
      0
    );

    return Math.round(total / filteredProducts.length);
  }, [filteredProducts]);

  // =====================================
  return (
    <div className="bg-[#F2F0EF] min-h-screen pt-32">

      {/* HERO */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <p className="text-xs uppercase tracking-[0.35em] text-[#1C2120]/50 mb-4">
          Bivela House
        </p>

        <h1 className="text-5xl md:text-7xl">
          The Collection
        </h1>

        <p className="mt-8 max-w-2xl text-[#1C2120]/70 leading-8">
          Discover heirloom shawls shaped through heritage,
          craftsmanship and timeless luxury.
        </p>
      </section>

      {/* CONTROLS */}
      <section className="max-w-7xl mx-auto px-6 pb-10">
        <div className="grid md:grid-cols-3 gap-4">

          {/* SEARCH */}
          <input
            type="text"
            placeholder="Search Collection..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="border px-4 py-3 bg-white"
          />

          {/* SORT */}
          <div ref={dropdownRef} className="relative">
            <button
              onClick={() => setOpen(!open)}
              className="w-full flex justify-between items-center border px-4 py-3 bg-white"
            >
              <span>
                {sortBy === "default" && "Sort By"}
                {sortBy === "low-high" &&
                  "Price: Low to High"}
                {sortBy === "high-low" &&
                  "Price: High to Low"}
              </span>
              ▼
            </button>

            {open && (
              <div className="absolute mt-2 w-full bg-white border z-50">
                {[
                  { label: "Sort By", value: "default" },
                  { label: "Low to High", value: "low-high" },
                  { label: "High to Low", value: "high-low" },
                ].map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => {
                      setSortBy(opt.value);
                      setOpen(false);
                    }}
                    className="block w-full text-left px-4 py-3 hover:bg-black hover:text-white"
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* STATS */}
          <div className="border px-4 py-3 bg-white flex justify-between">
            <span>{totalProducts} Items</span>
            <span>Avg ₹{avgPrice}</span>
          </div>
        </div>
      </section>

      {/* FILTER */}
      <section className="max-w-7xl mx-auto px-6 pb-16">
        <div className="flex gap-4 flex-wrap border-y py-6">
          {["All", "Shawls", "Scarves"].map((item) => (
            <button
              key={item}
              onClick={() => setActiveFilter(item)}
              className={`px-5 py-3 text-xs uppercase border ${
                activeFilter === item
                  ? "bg-black text-white"
                  : "bg-white"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="max-w-7xl mx-auto px-6 pb-24 grid md:grid-cols-2 lg:grid-cols-3 gap-10">

        {loading ? (
          <p>Loading Products...</p>
        ) : filteredProducts.length === 0 ? (
          <p>No Products Found</p>
        ) : (
          filteredProducts.map((item) => {
            const images =
              item.images?.length > 0
                ? item.images.map((img) => img.imageUrl)
                : [item.primaryImage];

            return (
              <ProductSliderCard
                key={item.id}
                item={item}
                images={images}
              />
            );
          })
        )}
      </section>

      {/* CTA */}
      <section className="border-t">
        <div className="max-w-7xl mx-auto px-6 py-24 text-center">

          <h2 className="text-4xl md:text-6xl">
            Design What Does Not Yet Exist
          </h2>

          <p className="mt-6 text-black/70">
            Personalize your masterpiece.
          </p>

          <NavLink
            to="/atelier"
            className="inline-block mt-10 border px-8 py-3 hover:bg-black hover:text-white"
          >
            Enter Atelier
          </NavLink>
        </div>
      </section>
    </div>
  );
}

export default ShopPage;