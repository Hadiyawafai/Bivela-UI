// =======================================================
// src/features/shop/adminProducts.jsx
// FINAL MINIMAL LUXURY VERSION
// =======================================================

import React, { useEffect, useState } from "react";

import {
  Pencil,
  Trash2,
  Plus,
} from "lucide-react";

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
  // FETCH
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
    }
  };

  const handleEdit = (product) => {
    setEditData(product);
    setOpenForm(true);
  };

  const handleAdd = () => {
    setEditData(null);
    setOpenForm(true);
  };

  // =============================
  // UI
  // =============================
  return (
    <div className="min-h-screen bg-[#F2F0EF] pt-28 px-6">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-10">

          <div>
            <p className="text-[10px] uppercase tracking-[0.35em] text-black/50 mb-2"
              style={{ fontFamily: "Cardo, serif" }}>
              Bivela Admin
            </p>

            <h1 className="text-4xl text-black"
              style={{ fontFamily: "TanAngleton, serif" }}>
              Products
            </h1>
          </div>

          <button
            onClick={handleAdd}
            className="bg-[#1C2120] text-[#F2F0EF] px-6 py-2 text-[11px] uppercase tracking-[0.25em] rounded-xl flex items-center gap-2 hover:opacity-90 transition"
            style={{ fontFamily: "Cardo, serif" }}
          >
            <Plus size={14} />
            Add
          </button>
        </div>

        {/* LOADING */}
        {loading ? (
          <div className="h-[40vh] flex items-center justify-center">
            <p className="text-sm text-black/60">Loading...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="h-[40vh] flex items-center justify-center">
            <p className="text-sm text-black/60">No products found</p>
          </div>
        ) : (

          <div className="grid md:grid-cols-4 gap-6 pb-20">

            {products.map((item) => {

              const price =
                item.basePrice ??
                item.variants?.[0]?.price ??
                0;

              const image =
                item.primaryImage ||
                item.images?.[0]?.imageUrl ||
                "https://via.placeholder.com/300";

              return (
                <div
                  key={item.id}
                  className="bg-white border border-black/10 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition"
                >

                  {/* IMAGE */}
                  <div className="h-48 overflow-hidden">
                    <img
                      src={image}
                      alt={item.name}
                      className="w-full h-full object-cover hover:scale-105 transition duration-500"
                    />
                  </div>

                  {/* CONTENT */}
                  <div className="p-4">

                    <p className="text-[9px] uppercase tracking-[0.25em] text-black/50 mb-1"
                      style={{ fontFamily: "Cardo, serif" }}>
                      {item.categoryName || "No Category"}
                    </p>

                    <h2 className="text-base text-black mb-2"
                      style={{ fontFamily: "TanAngleton, serif" }}>
                      {item.name}
                    </h2>

                    <p className="text-[12px] text-black/60 line-clamp-2 mb-3">
                      {item.description || "No description"}
                    </p>

                    {/* FOOTER */}
                    <div className="flex justify-between items-center">

                      <p className="text-sm font-semibold text-black">
                        ₹{price}
                      </p>

                      {/* ACTIONS (inside card) */}
                      <div className="flex gap-2">

                        <button
                          onClick={() => handleEdit(item)}
                          className="w-8 h-8 flex items-center justify-center rounded-lg border border-black/20 hover:bg-black hover:text-white transition"
                        >
                          <Pencil size={14} />
                        </button>

                        <button
                          onClick={() => handleDelete(item.id)}
                          className="w-8 h-8 flex items-center justify-center rounded-lg border border-black/20 text-red-500 hover:bg-red-500 hover:text-white transition"
                        >
                          <Trash2 size={14} />
                        </button>

                      </div>

                    </div>

                  </div>

                </div>
              );
            })}

          </div>
        )}

        {/* FORM */}
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