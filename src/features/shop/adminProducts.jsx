// =======================================================
// src/features/shop/adminProducts.jsx
// FINAL WORKING VERSION (PRICE FIXED)
// =======================================================

import React, { useEffect, useState } from "react";
import {
  getAllProducts,
  deleteProduct,
} from "./shopService";

import ProductForm from "./productForm";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openForm, setOpenForm] = useState(false);
  const [editData, setEditData] = useState(null);

  // =============================
  // FETCH PRODUCTS
  // =============================
  const fetchProducts = async () => {
    try {
      setLoading(true);

      const data = await getAllProducts();

      setProducts(Array.isArray(data) ? data : []);
    } catch (error) {
      console.log("FETCH ERROR:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // =============================
  // DELETE
  // =============================
  const handleDelete = async (id) => {
    const ok = window.confirm("Delete product?");
    if (!ok) return;

    try {
      await deleteProduct(id);
      fetchProducts();
    } catch (error) {
      console.log("DELETE ERROR:", error);
      alert("Delete failed");
    }
  };

  // =============================
  const handleEdit = (product) => {
    setEditData(product);
    setOpenForm(true);
  };

  const handleAdd = () => {
    setEditData(null);
    setOpenForm(true);
  };

  // =============================
  return (
    <div className="min-h-screen bg-[#F2F0EF] pt-28 px-6">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-12">
          <div>
            <p
              className="text-xs uppercase tracking-[0.35em] text-black/50 mb-3"
              style={{ fontFamily: "Cardo, serif" }}
            >
              Bivela Admin
            </p>

            <h1
              className="text-5xl text-black"
              style={{ fontFamily: "TanAngleton, serif" }}
            >
              Products
            </h1>
          </div>

          <button
            onClick={handleAdd}
            className="bg-black text-white px-7 py-3 text-xs uppercase tracking-[0.30em] hover:opacity-90 transition"
            style={{ fontFamily: "Cardo, serif" }}
          >
            Add Product
          </button>
        </div>

        {/* PRODUCTS */}
        {loading ? (
          <p>Loading...</p>
        ) : products.length === 0 ? (
          <p>No products found</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-8 pb-20">

            {products.map((item) => {

              // =============================
              // ✅ FIXED PRICE LOGIC
              // =============================
              const price =
                item.basePrice ??
                item.variants?.[0]?.price ??
                0;

              // =============================
              // ✅ SAFE IMAGE
              // =============================
              const image =
                item.primaryImage ||
                item.images?.[0]?.imageUrl ||
                "https://via.placeholder.com/300";

              return (
                <div
                  key={item.id}
                  className="bg-white p-5 border border-black/10 shadow-sm"
                >
                  <img
                    src={image}
                    alt={item.name}
                    className="w-full h-64 object-cover mb-5"
                  />

                  <p className="text-xs uppercase tracking-[0.25em] text-black/50 mb-2">
                    {item.categoryName || "No Category"}
                  </p>

                  <h2
                    className="text-2xl mb-2"
                    style={{ fontFamily: "TanAngleton, serif" }}
                  >
                    {item.name}
                  </h2>

                  <p className="text-sm text-black/65 line-clamp-2 mb-4">
                    {item.description || "No description"}
                  </p>

                  {/* =============================
                      ✅ PRICE FIXED HERE
                  ============================= */}
                  <div className="flex justify-between items-center">
                    <p className="font-semibold text-lg">
                      ₹{price}
                    </p>

                    <div className="flex gap-3">
                      <button
                        onClick={() => handleEdit(item)}
                        className="text-xs uppercase border border-black px-4 py-2 hover:bg-black hover:text-white transition"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(item.id)}
                        className="text-xs uppercase border border-red-500 text-red-500 px-4 py-2 hover:bg-red-500 hover:text-white transition"
                      >
                        Delete
                      </button>
                    </div>
                  </div>

                </div>
              );
            })}

          </div>
        )}

        {/* FORM MODAL */}
        {openForm && (
          <ProductForm
            editData={editData}
            onClose={() => setOpenForm(false)}
            onSuccess={() => {
              setOpenForm(false);
              fetchProducts();
            }}
          />
        )}
      </div>
    </div>
  );
}