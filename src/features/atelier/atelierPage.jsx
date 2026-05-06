import React, { useState } from "react";
import { createCustomProduct } from "./atelierService";

import one from "../../assets/one.jpeg";
import two from "../../assets/two.jpeg";
import three from "../../assets/three.jpeg";

const baseShawls = [
  { id: 1, name: "Classic Cashmere", image: one },
  { id: 2, name: "Royal Weave", image: two },
  { id: 3, name: "Limited Heritage", image: three },
];

const sizes = ["Small", "Medium", "Large"];
const colors = ["Ivory", "Sand", "Noir", "Rose", "Emerald"];
const patterns = ["Minimal", "Paisley", "Floral", "Regal"];
const embroidery = ["None", "Gold Thread", "Silver Thread", "Hand Kani"];

function AtelierPage() {
  const [selectedShawl, setSelectedShawl] = useState(baseShawls[0]);
  const [selectedSize, setSelectedSize] = useState(sizes[0]);
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [selectedPattern, setSelectedPattern] = useState(patterns[0]);
  const [selectedEmbroidery, setSelectedEmbroidery] = useState(embroidery[0]);

  const [designText, setDesignText] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  // ==================================================
  // 🚀 FINAL SUBMIT (WORKING)
  // ==================================================
  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");

      if (!token) {
        alert("Please login first");
        return;
      }

      if (!userId) {
        alert("User not found. Please login again.");
        return;
      }

      setLoading(true);

      const formData = new FormData();

      // ✅ OPTION 1 (MOST COMPATIBLE - USE THIS FIRST)
      formData.append("userId", Number(userId));
      formData.append("size", selectedSize);
      formData.append("color", selectedColor);
      formData.append(
        "designDescription",
        `${selectedShawl.name} | Pattern: ${selectedPattern} | Embroidery: ${selectedEmbroidery} | Notes: ${designText}`
      );

      // ✅ IMAGE
      if (imageFile) {
        formData.append("image", imageFile);
      }

      await createCustomProduct(formData);

      alert("✨ Design submitted successfully!");

      // RESET
      setDesignText("");
      setImageFile(null);

    } catch (error) {
      console.log(error);
      alert(
        error?.response?.data?.message ||
        "Failed to submit design"
      );
    } finally {
      setLoading(false);
    }
  };

  // ==================================================
  return (
    <div className="bg-[#F2F0EF] min-h-screen pt-32 text-[#1C2120]">

      {/* HERO */}
      <section className="max-w-7xl mx-auto px-6 pb-16">
        <p className="text-xs uppercase tracking-[0.4em] text-black/50 mb-4">
          Private Atelier
        </p>

        <h1 className="text-6xl md:text-7xl leading-tight">
          Create Your
          <br />
          Signature Shawl
        </h1>

        <p className="mt-6 max-w-xl text-black/70">
          Personalize every detail — from fabric to embroidery.
        </p>
      </section>

      {/* MAIN */}
      <section className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 pb-24">

        {/* LEFT */}
        <div className="sticky top-28">
          <img
            src={selectedShawl.image}
            className="w-full h-[600px] object-cover"
          />

          <div className="mt-6 text-sm space-y-2">
            <p><b>Size:</b> {selectedSize}</p>
            <p><b>Color:</b> {selectedColor}</p>
            <p><b>Pattern:</b> {selectedPattern}</p>
            <p><b>Embroidery:</b> {selectedEmbroidery}</p>
          </div>
        </div>

        {/* RIGHT */}
        <div>

          {/* SHAWL */}
          <h2 className="text-2xl mb-4">Base Shawl</h2>
          <div className="grid grid-cols-3 gap-4 mb-8">
            {baseShawls.map((item) => (
              <button
                key={item.id}
                onClick={() => setSelectedShawl(item)}
                className={`border ${
                  selectedShawl.id === item.id
                    ? "border-black"
                    : "border-black/10"
                }`}
              >
                <img src={item.image} className="h-32 w-full object-cover" />
              </button>
            ))}
          </div>

          {/* SIZE */}
          <h2 className="text-2xl mb-4">Size</h2>
          <div className="flex gap-3 mb-8">
            {sizes.map((s) => (
              <button
                key={s}
                onClick={() => setSelectedSize(s)}
                className={`px-4 py-2 border ${
                  selectedSize === s ? "bg-black text-white" : ""
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          {/* COLOR */}
          <h2 className="text-2xl mb-4">Color</h2>
          <div className="flex gap-3 mb-8 flex-wrap">
            {colors.map((c) => (
              <button
                key={c}
                onClick={() => setSelectedColor(c)}
                className={`px-4 py-2 border ${
                  selectedColor === c ? "bg-black text-white" : ""
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          {/* PATTERN */}
          <h2 className="text-2xl mb-4">Pattern</h2>
          <div className="flex gap-3 mb-8 flex-wrap">
            {patterns.map((p) => (
              <button
                key={p}
                onClick={() => setSelectedPattern(p)}
                className={`px-4 py-2 border ${
                  selectedPattern === p ? "bg-black text-white" : ""
                }`}
              >
                {p}
              </button>
            ))}
          </div>

          {/* EMBROIDERY */}
          <h2 className="text-2xl mb-4">Embroidery</h2>
          <div className="flex gap-3 mb-8 flex-wrap">
            {embroidery.map((e) => (
              <button
                key={e}
                onClick={() => setSelectedEmbroidery(e)}
                className={`px-4 py-2 border ${
                  selectedEmbroidery === e ? "bg-black text-white" : ""
                }`}
              >
                {e}
              </button>
            ))}
          </div>

          {/* NOTES */}
          <h2 className="text-2xl mb-4">Design Notes</h2>
          <textarea
            value={designText}
            onChange={(e) => setDesignText(e.target.value)}
            className="w-full border p-4 mb-8"
            placeholder="Describe your design..."
          />

          {/* IMAGE */}
          <h2 className="text-2xl mb-4">Upload Reference</h2>
          <input
            type="file"
            className="mb-10"
            onChange={(e) => setImageFile(e.target.files[0])}
          />

          {/* SUBMIT */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-black text-white py-4 uppercase tracking-widest"
          >
            {loading ? "Submitting..." : "Submit Design"}
          </button>

        </div>
      </section>
    </div>
  );
}

export default AtelierPage;