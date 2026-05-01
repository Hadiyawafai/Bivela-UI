// =======================================================
// src/features/category/category.jsx
// PREMIUM CATEGORY MANAGEMENT PAGE
// GET + POST /api/categories
// =======================================================

import React, { useEffect, useState } from "react";
import {
  getAllCategories,
  createCategory,
} from "./categoryService";

export default function CategoryPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    name: "",
    description: "",
    parent: "",
  });

  // ==========================================
  // FETCH ALL CATEGORIES
  // ==========================================
  const fetchCategories = async () => {
    try {
      setLoading(true);
      const data = await getAllCategories();
      setCategories(Array.isArray(data) ? data : []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // ==========================================
  // SUBMIT
  // ==========================================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      await createCategory({
        name: form.name,
        description: form.description,
        parent: form.parent || null,
      });

      setForm({
        name: "",
        description: "",
        parent: "",
      });

      fetchCategories();
    } catch (err) {
      console.log(err);
    } finally {
      setSaving(false);
    }
  };

  // ==========================================
  return (
    <div className="min-h-screen bg-[#F2F0EF] pt-28 px-6 pb-16">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10">

        {/* LEFT FORM */}
        <div className="bg-white rounded-3xl shadow-xl border border-black/10 p-8">
          <p className="text-xs uppercase tracking-[0.35em] text-black/50 mb-3">
            Bivela Admin
          </p>

          <h1
            className="text-4xl mb-8"
            style={{
              fontFamily: "TanAngleton, serif",
            }}
          >
            Add Category
          </h1>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            {/* NAME */}
            <div>
              <label className="text-sm font-medium block mb-2">
                Category Name
              </label>

              <input
                type="text"
                placeholder="Shawls"
                value={form.name}
                onChange={(e) =>
                  setForm({
                    ...form,
                    name: e.target.value,
                  })
                }
                className="w-full border border-black/15 px-4 py-3 rounded-2xl outline-none focus:border-black"
                required
              />
            </div>

            {/* PARENT */}
            <div>
              <label className="text-sm font-medium block mb-2">
                Parent Category
              </label>

              <select
                value={form.parent}
                onChange={(e) =>
                  setForm({
                    ...form,
                    parent: e.target.value,
                  })
                }
                className="w-full border border-black/15 px-4 py-3 rounded-2xl outline-none focus:border-black bg-white"
              >
                <option value="">
                  None
                </option>

                {categories.map((cat) => (
                  <option
                    key={cat.id}
                    value={cat.name}
                  >
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* DESCRIPTION */}
            <div>
              <label className="text-sm font-medium block mb-2">
                Description
              </label>

              <textarea
                rows="4"
                placeholder="Luxury handcrafted heritage collection..."
                value={form.description}
                onChange={(e) =>
                  setForm({
                    ...form,
                    description:
                      e.target.value,
                  })
                }
                className="w-full border border-black/15 px-4 py-3 rounded-2xl resize-none outline-none focus:border-black"
              />
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={saving}
              className="w-full bg-black text-white py-4 rounded-2xl hover:opacity-90 transition"
            >
              {saving
                ? "Creating..."
                : "Create Category"}
            </button>
          </form>
        </div>

        {/* RIGHT LIST */}
        <div className="bg-white rounded-3xl shadow-xl border border-black/10 p-8">
          <p className="text-xs uppercase tracking-[0.35em] text-black/50 mb-3">
            Existing
          </p>

          <h2
            className="text-4xl mb-8"
            style={{
              fontFamily: "TanAngleton, serif",
            }}
          >
            Categories
          </h2>

          {loading ? (
            <p>Loading...</p>
          ) : categories.length === 0 ? (
            <p>No categories found.</p>
          ) : (
            <div className="space-y-4">
              {categories.map((cat) => (
                <div
                  key={cat.id}
                  className="border border-black/10 rounded-2xl p-5 hover:shadow-md transition"
                >
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-semibold">
                      {cat.name}
                    </h3>

                    <span className="text-xs uppercase tracking-[0.2em] text-black/45">
                      #{cat.id}
                    </span>
                  </div>

                  <p className="text-sm text-black/65 mb-2">
                    {cat.description ||
                      "No description"}
                  </p>

                  <p className="text-xs text-black/50 uppercase tracking-[0.18em]">
                    Parent:{" "}
                    {cat.parent ||
                      "None"}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}