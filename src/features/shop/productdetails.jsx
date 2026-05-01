// =======================================================
// src/features/shop/ProductDetails.jsx
// CLEAR PRODUCT DETAILS + REVIEWS MAP
// =======================================================

import React, { useEffect, useState } from "react";
import {
  useParams,
  useNavigate,
  NavLink,
} from "react-router-dom";

import { getProductById } from "./shopService";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [selectedImage,
    setSelectedImage] =
    useState("");

  const [selectedVariant,
    setSelectedVariant] =
    useState(null);

  // =====================================
  // FETCH PRODUCT
  // =====================================
  useEffect(() => {
    const fetchProduct =
      async () => {
        try {
          setLoading(true);

          const data =
            await getProductById(id);

          setProduct(data);

          const first =
            data.primaryImage ||
            data.images?.find(
              (img) =>
                img.isPrimary
            )?.imageUrl ||
            data.images?.[0]
              ?.imageUrl ||
            "";

          setSelectedImage(
            first
          );

          if (
            data.variants
              ?.length > 0
          ) {
            setSelectedVariant(
              data
                .variants[0]
            );
          }

        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      };

    fetchProduct();
  }, [id]);

  // =====================================
  // ADD TO BAG
  // =====================================
  const handleAddToBag =
    () => {
      const cart =
        JSON.parse(
          localStorage.getItem(
            "cart"
          )
        ) || [];

      cart.push({
        id: product.id,
        name: product.name,
        image:
          selectedImage,
        price:
          selectedVariant
            ?.price ||
          product.basePrice,
        qty: 1,
      });

      localStorage.setItem(
        "cart",
        JSON.stringify(
          cart
        )
      );

      navigate("/cart");
    };

  // =====================================
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
    selectedVariant?.price ||
    product.basePrice;

  const stock =
    selectedVariant?.stock ??
    0;

  const images =
    product.images
      ?.length > 0
      ? product.images
      : [
          {
            imageUrl:
              product.primaryImage,
          },
        ];

  // =====================================
  return (
    <div className="bg-[#F2F0EF] text-[#1C2120] min-h-screen pt-32">

      {/* TOP */}
      <section className="max-w-7xl mx-auto px-6 pb-10">
        <NavLink
          to="/shop"
          className="text-xs uppercase tracking-[0.30em] border-b border-[#1C2120] pb-1"
        style={{
              fontFamily: "TanAngleton, serif",
            }} >
          Back To Collection
        </NavLink>
      </section>

      {/* MAIN */}
      <section className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 pb-24">

        {/* LEFT */}
        <div>

          {/* MAIN IMAGE */}
          <div className="border border-[#1C2120]/10"
           style={{
              fontFamily: "TanAngleton, serif",
            }}>
            <img
              src={
                selectedImage
              }
              alt={
                product.name
              }
              className="w-full h-[650px] object-cover"
            />
          </div>

          {/* THUMBS */}
          <div className="grid grid-cols-4 gap-4 mt-4">
            {images.map(
              (
                img,
                i
              ) => (
                <button
                  key={i}
                  onClick={() =>
                    setSelectedImage(
                      img.imageUrl
                    )
                  }
                  className={`border ${
                    selectedImage ===
                    img.imageUrl
                      ? "border-black"
                      : "border-black/10"
                  }`}
                >
                  <img
                    src={
                      img.imageUrl
                    }
                    alt=""
                    className="w-full h-24 object-cover"
                  />
                </button>
              )
            )}
          </div>
        </div>

        {/* RIGHT */}
        <div>

          <p className="text-xs uppercase tracking-[0.35em] text-[#1C2120]/50 mb-4"
           style={{
              fontFamily: "TanAngleton, serif",
            }}>
            House Of Bivela
          </p>

          <h1
            className="text-5xl"
            style={{
              fontFamily:
                "TanAngleton, serif",
            }}
          >
            {product.name}
          </h1>

          <p className="mt-5 text-3xl">
            ₹{price}
          </p>

          <p className="mt-3 text-sm text-[#1C2120]/70">
            ★{" "}
            {product.averageRating ||
              0}{" "}
            / 5 ·{" "}
            {product.totalReviews ||
              0}{" "}
            Reviews
          </p>

          {/* DESCRIPTION */}
          <div className="mt-8 space-y-4 text-[#1C2120]/75 leading-8">
            <p>
              {
                product.description
              }
            </p>
          </div>

          {/* DETAILS */}
          <div className="mt-10 border-t border-[#1C2120]/10 pt-8 space-y-3 text-sm"
           style={{
              fontFamily: "TanAngleton, serif",
            }}>

            <p>
              <strong>
                Category:
              </strong>{" "}
              {
                product.categoryName
              }
            </p>

           

            <p>
              <strong
               style={{
              fontFamily: "TanAngleton, serif",
            }}>
                Availability:
              </strong>{" "}
              {stock >
              0
                ? "In Stock"
                : "Out Of Stock"}
            </p>

          </div>

          {/* VARIANTS */}
          {product.variants
            ?.length >
            0 && (
            <div className="mt-10">
              <p className="text-xs uppercase tracking-[0.30em] mb-4">
                Select Variant
              </p>

              <div className="flex flex-wrap gap-3"
               style={{
              fontFamily: "TanAngleton, serif",
            }}>
                {product.variants.map(
                  (
                    item
                  ) => (
                    <button
                      key={
                        item.id
                      }
                      onClick={() =>
                        setSelectedVariant(
                          item
                        )
                      }
                      className={`px-5 py-3 border ${
                        selectedVariant?.id ===
                        item.id
                          ? "bg-[#1C2120] text-[#F2F0EF] border-[#1C2120]"
                          : "border-black/10"
                      }`}
                    >
                      {
                        item.color
                      }{" "}
                      /{" "}
                      {
                        item.size
                      }
                    </button>
                  )
                )}
              </div>
            </div>
          )}

          {/* BUTTON */}
          <button
            onClick={
              handleAddToBag
            }
            className="mt-10 w-full md:w-auto px-10 py-4 bg-[#1C2120] text-[#F2F0EF] text-xs uppercase tracking-[0.35em]"
           style={{
              fontFamily: "TanAngleton, serif",
            }}>
            Add To Bag
          </button>

        </div>
      </section>

      {/* REVIEWS */}
      <section className="border-t border-[#1C2120]/10">
        <div className="max-w-7xl mx-auto px-6 py-24">

          <p className="text-xs uppercase tracking-[0.35em] text-[#1C2120]/50 mb-4">
            Client Reviews
          </p>

          <h2
            className="text-4xl mb-14"
            style={{
              fontFamily:
                "TanAngleton, serif",
            }}
          >
            Reviews
          </h2>

          {product.reviews
            ?.length >
          0 ? (
            <div className="grid md:grid-cols-2 gap-8">

              {product.reviews.map(
                (
                  review,
                  index
                ) => (
                  <div
                    key={
                      index
                    }
                    className="border border-[#1C2120]/10 p-8"
                  >
                    <p className="text-lg mb-3">
                      {"★".repeat(
                        review.rating
                      )}
                    </p>

                    <p className="text-sm text-[#1C2120]/70 mb-3">
                      User ID:{" "}
                      {
                        review.userId
                      }
                    </p>

                    <p className="leading-7 text-[#1C2120]/75">
                      {
                        review.comment
                      }
                    </p>
                  </div>
                )
              )}

            </div>
          ) : (
            <p className="text-[#1C2120]60">
              No reviews yet.
            </p>
          )}

        </div>
      </section>
    </div>
  );
}

export default ProductDetails;