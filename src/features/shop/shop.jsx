// =======================================================
// src/features/shop/shop.jsx
// FINAL CLEAN SHOP PAGE
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

function ShopPage() {
  const [products, setProducts] =
    useState([]);

  const [filteredProducts,
    setFilteredProducts] =
    useState([]);

  const [activeFilter,
    setActiveFilter] =
    useState("All");

  const [search, setSearch] =
    useState("");

  const [sortBy, setSortBy] =
    useState("default");

  const [loading, setLoading] =
    useState(true);

  const [open, setOpen] =
    useState(false);

  const dropdownRef =
    useRef(null);

  // =====================================
  // CLOSE SORT
  // =====================================
  useEffect(() => {
    const close = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(
          e.target
        )
      ) {
        setOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      close
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        close
      );
  }, []);

  // =====================================
  // FETCH PRODUCTS
  // =====================================
  const fetchProducts =
    async () => {
      try {
        setLoading(true);

        const data =
          await getAllProducts();

        const safe =
          Array.isArray(data)
            ? data
            : [];

        setProducts(safe);
        setFilteredProducts(
          safe
        );
      } catch (err) {
        console.log(err);
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
    let result = [
      ...products,
    ];

    if (
      activeFilter !== "All"
    ) {
      result =
        result.filter(
          (item) =>
            item.categoryName ===
            activeFilter
        );
    }

    if (
      search.trim()
    ) {
      result =
        result.filter(
          (item) =>
            item.name
              ?.toLowerCase()
              .includes(
                search.toLowerCase()
              )
        );
    }

    if (
      sortBy ===
      "low-high"
    ) {
      result.sort(
        (a, b) =>
          Number(
            a.basePrice
          ) -
          Number(
            b.basePrice
          )
      );
    }

    if (
      sortBy ===
      "high-low"
    ) {
      result.sort(
        (a, b) =>
          Number(
            b.basePrice
          ) -
          Number(
            a.basePrice
          )
      );
    }

    setFilteredProducts(
      result
    );
  }, [
    products,
    activeFilter,
    search,
    sortBy,
  ]);

  // =====================================
  const totalProducts =
    filteredProducts.length;

  const avgPrice =
    useMemo(() => {
      if (
        !filteredProducts.length
      )
        return 0;

      const total =
        filteredProducts.reduce(
          (
            sum,
            item
          ) =>
            sum +
            Number(
              item.basePrice ||
                0
            ),
          0
        );

      return Math.round(
        total /
          filteredProducts.length
      );
    }, [
      filteredProducts,
    ]);

  // =====================================
  return (
    <div className="bg-[#F2F0EF] min-h-screen pt-32">

      {/* HERO */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <p className="text-xs uppercase tracking-[0.35em] text-[#1C2120]/50 mb-4">
          Bivela House
        </p>

        <h1
          className="text-5xl md:text-7xl"
          style={{
            fontFamily:
              "TanAngleton, serif",
          }}
        >
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
              setSearch(
                e.target.value
              )
            }
            className="border border-[#1C2120]/15 bg-white px-4 py-3 outline-none focus:border-[#1C2120]"
          />

          {/* SORT */}
          <div
            ref={
              dropdownRef
            }
            className="relative"
          >
            <button
              onClick={() =>
                setOpen(
                  !open
                )
              }
              className="w-full flex justify-between items-center border border-[#1C2120]/15 bg-white px-4 py-3 hover:bg-black hover:text-white transition"
            >
              <span>
                {sortBy ===
                  "default" &&
                  "Sort By"}

                {sortBy ===
                  "low-high" &&
                  "Price: Low to High"}

                {sortBy ===
                  "high-low" &&
                  "Price: High to Low"}
              </span>

              <span>
                ▼
              </span>
            </button>

            {open && (
              <div className="absolute mt-2 w-full bg-white border border-[#1C2120] z-50">
                {[
                  {
                    label:
                      "Sort By",
                    value:
                      "default",
                  },
                  {
                    label:
                      "Price: Low to High",
                    value:
                      "low-high",
                  },
                  {
                    label:
                      "Price: High to Low",
                    value:
                      "high-low",
                  },
                ].map(
                  (
                    opt
                  ) => (
                    <button
                      key={
                        opt.value
                      }
                      onClick={() => {
                        setSortBy(
                          opt.value
                        );
                        setOpen(
                          false
                        );
                      }}
                      className="w-full text-left px-4 py-3 hover:bg-[#1C2120] hover:text-white"
                    >
                      {
                        opt.label
                      }
                    </button>
                  )
                )}
              </div>
            )}
          </div>

          {/* STATS */}
          <div className="border border-black/15 bg-white px-4 py-3 flex justify-between ">
            <span>
              {
                totalProducts
              }{" "}
              Items
            </span>

            <span>
              Avg ₹
              {avgPrice}
            </span>
          </div>
        </div>
      </section>

      {/* FILTER */}
      <section className="max-w-7xl mx-auto px-6 pb-16">
        <div className="flex gap-4 flex-wrap border-y border-[#1C2120]/10 py-6">
          {[
            "All",
            "Shawls",
            "Scarves",
          ].map(
            (
              item
            ) => (
              <button
                key={
                  item
                }
                onClick={() =>
                  setActiveFilter(
                    item
                  )
                }
                className={`px-5 py-3 text-xs uppercase tracking-[0.30em] border transition ${
                  activeFilter ===
                  item
                    ? "bg-[#1C2120] text-white border-black"
                    : "bg-white border-[#1C2120]/10 hover:bg-[#1C2120] hover:text-white"
                }`}
              >
                {item}
              </button>
            )
          )}
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="max-w-7xl mx-auto px-6 pb-24 grid md:grid-cols-2 lg:grid-cols-3 gap-10">

        {loading ? (
          <p>
            Loading Products...
          </p>
        ) : filteredProducts.length ===
          0 ? (
          <p>
            No Products Found
          </p>
        ) : (
          filteredProducts.map(
            (
              item
            ) => {
              const image =
                item.primaryImage ||
                item.images?.find(
                  (
                    img
                  ) =>
                    img.isPrimary
                )
                  ?.imageUrl ||
                item.images?.[0]
                  ?.imageUrl;

              return (
                <div
                  key={
                    item.id
                  }
                  className="bg-white p-4 border border-black/8 hover:shadow-xl transition"
                >
                  <ProductCard
                    id={
                      item.id
                    }
                    image={
                      image
                    }
                    title={
                      item.name
                    }
                    description={
                      <span className="text-lg font-bold text-[#1C2120]">
                        ₹
                        {
                          item.basePrice
                        }
                      </span>
                    }
                  />
                </div>
              );
            }
          )
        )}
      </section>

      {/* CTA */}
      <section className="border-t border-black/10">
        <div className="max-w-7xl mx-auto px-6 py-24 text-center">

          <p className="text-xs uppercase tracking-[0.35em] text-black/50 mb-5">
            Private Atelier
          </p>

          <h2
            className="text-4xl md:text-6xl"
            style={{
              fontFamily:
                "TanAngleton, serif",
            }}
          >
            Design What Does
            <br />
            Not Yet Exist
          </h2>

          <p className="mt-8 max-w-2xl mx-auto text-black/70 leading-8">
            Personalize threads, patterns and embroidery
            in your own masterpiece.
          </p>

          <NavLink
            to="/atelier"
            className="inline-block mt-10 border border-black px-8 py-3 text-xs uppercase tracking-[0.30em] hover:bg-black hover:text-white transition"
          >
            Enter Atelier
          </NavLink>
        </div>
      </section>
    </div>
  );
}

export default ShopPage;