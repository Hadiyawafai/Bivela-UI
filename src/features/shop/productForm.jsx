import React, { useEffect, useState } from "react";
import {
  createProduct,
  updateProduct,
  deleteProduct,
} from "./shopService";
import { getAllCategories } from "../category/categoryService";

export default function ProductForm({
  onClose,
  onSuccess,
  editData,
}) {
  const isEdit = !!editData;

  const [form, setForm] = useState({
    name: "",
    description: "",
    basePrice: "",
    categoryId: "",
  });

  const [categories, setCategories] = useState([]);
  const [openCat, setOpenCat] = useState(false);
  const [loading, setLoading] = useState(false);

  const [variants, setVariants] = useState([
    { size: "", color: "", price: "", stock: "" },
  ]);

  const [images, setImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);

  // ======================================
  // LOAD EDIT DATA
  // ======================================
  useEffect(() => {
    if (editData) {
      setForm({
        name: editData.name || "",
        description: editData.description || "",
        basePrice: editData.basePrice || "",
        categoryId: editData.category?.id || "",
      });

      setVariants(
        editData.variants?.length
          ? editData.variants.map((v) => ({
              size: v.size || "",
              color: v.color || "",
              price: v.price || "",
              stock: v.stock || "",
            }))
          : [{ size: "", color: "", price: "", stock: "" }]
      );

      setExistingImages(editData.images || []);
    }
  }, [editData]);

  // ======================================
  // FETCH CATEGORIES
  // ======================================
  useEffect(() => {
    const fetch = async () => {
      const res = await getAllCategories();
      setCategories(Array.isArray(res) ? res : res.data);
    };
    fetch();
  }, []);

  // ======================================
  // VARIANTS
  // ======================================
  const updateVariant = (i, field, value) => {
    const copy = [...variants];
    copy[i][field] = value;
    setVariants(copy);
  };

  const addVariant = () => {
    setVariants([
      ...variants,
      { size: "", color: "", price: "", stock: "" },
    ]);
  };

  const removeVariant = (i) => {
    setVariants(variants.filter((_, idx) => idx !== i));
  };

  // ======================================
  // IMAGE HANDLER (FINAL FIX)
  // ======================================
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    if (images.length + files.length > 5) {
      alert("You can upload maximum 5 images");
      return;
    }

    setImages((prev) => [...prev, ...files]);
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  // ======================================
  // SUBMIT
  // ======================================
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        name: form.name.trim(),
        description: form.description.trim(),
        basePrice: Number(form.basePrice),
        categoryId: Number(form.categoryId),
        variants: variants.map((v) => ({
          size: v.size.trim(),
          color: v.color.trim(),
          price: Number(v.price),
          stock: Number(v.stock),
        })),
      };

      if (isEdit) {
        await updateProduct(editData.id, payload, images);
      } else {
        await createProduct(payload, images);
      }

      onSuccess();
    } catch (err) {
      console.error(err);
      alert(
        err?.response?.data?.message ||
          "Failed to save product"
      );
    } finally {
      setLoading(false);
    }
  };

  // ======================================
  // DELETE
  // ======================================
  const handleDelete = async () => {
    if (!window.confirm("Delete this product?")) return;

    try {
      await deleteProduct(editData.id);
      onSuccess();
    } catch (err) {
      alert("Delete failed");
    }
  };

  const selectedCategory = categories.find(
    (c) => c.id === Number(form.categoryId)
  );

  return (
    <div className="fixed inset-0 z-50 bg-[#F2F0EF] flex justify-center items-start pt-5 px-4">
      <div className="w-full max-w-5xl bg-white rounded-[28px] shadow-2xl border border-black/10 overflow-hidden">

        {/* HEADER */}
        <div className="px-6 py-4 border-b flex justify-between items-center">
          <h2 className="text-2xl font-serif tracking-wide">
            {isEdit ? "Edit Product" : "Add Product"}
          </h2>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full border hover:bg-black hover:text-white transition"
          >
            ✕
          </button>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="px-6 py-5 max-h-[84vh] overflow-y-auto space-y-5"
        >

          {/* TOP */}
          <div className="grid grid-cols-4 gap-4">

            <div className="col-span-2">
              <label className="text-sm font-medium mb-1 block">
                Product Name
              </label>
              <input
                value={form.name}
                placeholder="luxury Shawls"
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
                className="w-full border rounded-xl px-4 py-3"
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-1 block">
                Base Price
              </label>
              <input
                type="number"
                value={form.basePrice}
                placeholder="Enter Price"
                onChange={(e) =>
                  setForm({ ...form, basePrice: e.target.value })
                }
                className="w-full border rounded-xl px-4 py-3"
              />
            </div>

            {/* CATEGORY */}
            <div className="relative">
              <label className="text-sm font-medium mb-1 block">
                Category
              </label>

              <div
                onClick={() => setOpenCat(!openCat)}
                className="border rounded-xl px-4 py-3 cursor-pointer flex justify-between"
              >
                <span>{selectedCategory?.name || "Select"}</span>
                <span>{openCat ? "▲" : "▼"}</span>
              </div>

              {openCat && (
                <div className="absolute top-full left-0 w-full bg-white border rounded-xl shadow-xl mt-1 z-20">
                  {categories.map((cat) => (
                    <div
                      key={cat.id}
                      onClick={() => {
                        setForm({ ...form, categoryId: cat.id });
                        setOpenCat(false);
                      }}
                      className="px-4 py-3 hover:bg-black hover:text-white cursor-pointer"
                    >
                      {cat.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* EXISTING IMAGES */}
          {isEdit && existingImages.length > 0 && (
            <div>
              <label className="text-sm font-medium mb-2 block">
                Existing Images
              </label>

              <div className="flex gap-2 flex-wrap">
                {existingImages.map((img, i) => (
                  <img
                    key={i}
                    src={img.imageUrl}
                    alt=""
                    className="w-14 h-14 rounded-xl object-cover border"
                  />
                ))}
              </div>
            </div>
          )}

          {/* VARIANTS */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <label className="text-sm font-medium">
                Variants
              </label>

              <button
                type="button"
                onClick={addVariant}
                className="border px-3 py-2 rounded-xl text-sm hover:bg-black hover:text-white"
              >
                + Add
              </button>
            </div>

            <div className="space-y-2">
              {variants.map((v, i) => (
                <div key={i} className="grid grid-cols-5 gap-2">
                  <input
                    placeholder="Size"
                    value={v.size}
                    onChange={(e) =>
                      updateVariant(i, "size", e.target.value)
                    }
                    className="border rounded-xl px-3 py-2"
                  />

                  <input
                    placeholder="Color"
                    value={v.color}
                    onChange={(e) =>
                      updateVariant(i, "color", e.target.value)
                    }
                    className="border rounded-xl px-3 py-2"
                  />

                  <input
                    type="number"
                    placeholder="Price"
                    value={v.price}
                    onChange={(e) =>
                      updateVariant(i, "price", e.target.value)
                    }
                    className="border rounded-xl px-3 py-2"
                  />

                  <input
                    type="number"
                    placeholder="Stock"
                    value={v.stock}
                    onChange={(e) =>
                      updateVariant(i, "stock", e.target.value)
                    }
                    className="border rounded-xl px-3 py-2"
                  />

                  {variants.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeVariant(i)}
                      className="border border-red-500 text-red-500 rounded-xl hover:bg-red-500 hover:text-white"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* DESCRIPTION + IMAGE */}
          <div className="grid grid-cols-3 gap-4">

            <div className="col-span-2">
              <label className="text-sm font-medium mb-1 block">
                Description
              </label>
              <textarea
                rows="4"
                value={form.description}
                placeholder="Description"
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                className="w-full border rounded-2xl px-4 py-3"
              />
            </div>

            {/* IMAGE UPLOAD */}
            <div>
              <label className="text-sm font-medium mb-1 block">
                Upload Photos (Max 5)
              </label>

              <div className="border rounded-2xl px-4 py-3 min-h-[118px]">

                <input
                  type="file"
                  multiple
                  onChange={handleImageChange}
                  className="text-sm"
                />

                {/* PREVIEW */}
                {images.length > 0 && (
                  <div className="flex gap-2 flex-wrap mt-3">
                    {images.map((file, i) => (
                      <div key={i} className="relative">
                        <img
                          src={URL.createObjectURL(file)}
                          alt=""
                          className="w-16 h-16 object-cover rounded-xl border"
                        />

                        <button
                          type="button"
                          onClick={() => removeImage(i)}
                          className="absolute -top-2 -right-2 bg-black text-white w-5 h-5 rounded-full text-xs"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* FOOTER */}
          <div className="grid grid-cols-2 gap-4">

            {isEdit ? (
              <button
                type="button"
                onClick={handleDelete}
                className="border border-red-500 text-red-500 py-3 rounded-2xl hover:bg-red-500 hover:text-white"
              >
                Delete Product
              </button>
            ) : (
              <div />
            )}

            <button
              type="submit"
              disabled={loading}
              className="bg-black text-white py-3 rounded-2xl"
            >
              {loading
                ? "Saving..."
                : isEdit
                ? "Save Changes"
                : "Create Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}