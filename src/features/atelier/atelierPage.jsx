import React, { useState } from "react";
import { createCustomProductRequest } from "./atelierService";

import one from "../../assets/one.jpeg";
import two from "../../assets/two.jpeg";
import three from "../../assets/three.jpeg";

// ======================================================
// 🧵 PREMIUM SHAWLS
// ======================================================

const baseShawls = [
  {
    id: 1,
    name: "Pashmina",
    subtitle: "Pure Himalayan Cashmere",
    image: one,
  },
  {
    id: 2,
    name: "Tosha",
    subtitle: "Luxury Winter Weave",
    image: two,
  },
  {
    id: 3,
    name: "Shahtoosh Inspired",
    subtitle: "Heritage Artisan Finish",
    image: three,
  },
];

const sizes = ["Small", "Medium", "Large"];

const colors = [
  { name: "Ivory", hex: "#F6F1E9" },
  { name: "Sand", hex: "#D6C2A1" },
  { name: "Noir", hex: "#1C1C1C" },
  { name: "Rose", hex: "#D9A5A5" },
  { name: "Emerald", hex: "#0F6B50" },
  { name: "Royal Blue", hex: "#1B2D5A" },
];

const patterns = [
  "Minimal",
  "Paisley",
  "Floral",
  "Regal",
  "Vintage Kashmiri",
];

const embroidery = [
  "None",
  "Gold Thread",
  "Silver Thread",
  "Hand Kani",
  "Royal Zari",
];

function AtelierPage() {
  const [selectedShawl, setSelectedShawl] = useState(baseShawls[0]);
  const [selectedSize, setSelectedSize] = useState(sizes[0]);
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [selectedPattern, setSelectedPattern] = useState(patterns[0]);
  const [selectedEmbroidery, setSelectedEmbroidery] =
    useState(embroidery[0]);

  const [designText, setDesignText] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const [loading, setLoading] = useState(false);

  // ======================================================
  // 🚀 SUBMIT
  // ======================================================

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login first");
        return;
      }

      setLoading(true);

      const designDescription = `
Fabric: ${selectedShawl.name}
Pattern: ${selectedPattern}
Embroidery: ${selectedEmbroidery}
Notes: ${designText}
      `;

      await createCustomProductRequest({
        size: selectedSize,
        color: selectedColor.name,
        designDescription,
        image: imageFile,
      });

      alert("✨ Your luxury shawl request has been submitted.");

      // RESET
      setDesignText("");
      setImageFile(null);

    } catch (error) {
      console.log(error);

      alert(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to submit design"
      );
    } finally {
      setLoading(false);
    }
  };

  // ======================================================
  // UI
  // ======================================================

  return (
    <div className="bg-[#F2F0EF] min-h-screen pt-32 text-[#1C2120]">

      {/* HERO */}
      <section className="max-w-7xl mx-auto px-6 pb-16">
        <p className="text-xs uppercase tracking-[0.45em] text-black/50 mb-4">
          Private Atelier
        </p>

        <h1 className="text-6xl md:text-7xl leading-tight font-light">
          Create Your
          <br />
          Signature Shawl
        </h1>

        <p className="mt-6 max-w-xl text-black/70 leading-8 text-lg">
          Personalize every detail — from rare Himalayan fabrics
          to handcrafted embroidery inspired by Kashmiri heritage.
        </p>
      </section>

      {/* MAIN */}
      <section className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 pb-24">

        {/* LEFT */}
        <div className="sticky top-28 self-start">

          <div className="overflow-hidden rounded-sm shadow-2xl bg-white">
            <img
              src={selectedShawl.image}
              alt={selectedShawl.name}
              className="w-full h-[650px] object-cover hover:scale-105 transition duration-700"
            />
          </div>

          <div className="mt-8 bg-white p-6 shadow-sm border border-black/5">
            <h3 className="text-2xl font-light mb-1">
              {selectedShawl.name}
            </h3>

            <p className="text-black/60 mb-6">
              {selectedShawl.subtitle}
            </p>

            <div className="space-y-3 text-sm">
              <p>
                <span className="font-medium">Size:</span>{" "}
                {selectedSize}
              </p>

              <p>
                <span className="font-medium">Color:</span>{" "}
                {selectedColor.name}
              </p>

              <p>
                <span className="font-medium">Pattern:</span>{" "}
                {selectedPattern}
              </p>

              <p>
                <span className="font-medium">Embroidery:</span>{" "}
                {selectedEmbroidery}
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div>

          {/* FABRIC */}
          <div className="mb-14">
            <h2 className="text-3xl font-light mb-6">
              Select Fabric
            </h2>

            <div className="grid grid-cols-3 gap-5">
              {baseShawls.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSelectedShawl(item)}
                  className={`group border transition-all duration-300 bg-white ${
                    selectedShawl.id === item.id
                      ? "border-black shadow-xl scale-[1.02]"
                      : "border-black/10 hover:border-black/30"
                  }`}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-40 w-full object-cover"
                  />

                  <div className="p-4 text-left">
                    <h3 className="text-lg font-medium">
                      {item.name}
                    </h3>

                    <p className="text-xs text-black/50 mt-1">
                      {item.subtitle}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* SIZE */}
          <div className="mb-14">
            <h2 className="text-3xl font-light mb-6">
              Select Size
            </h2>

            <div className="flex gap-4 flex-wrap">
              {sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedSize(s)}
                  className={`px-6 py-3 border uppercase tracking-widest text-sm transition ${
                    selectedSize === s
                      ? "bg-black text-white border-black"
                      : "bg-white border-black/10 hover:border-black"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* COLORS */}
          <div className="mb-14">
            <h2 className="text-3xl font-light mb-6">
              Color Palette
            </h2>

            <div className="flex flex-wrap gap-5">
              {colors.map((c) => (
                <button
                  key={c.name}
                  onClick={() => setSelectedColor(c)}
                  className="flex flex-col items-center gap-3"
                >
                  <div
                    className={`w-14 h-14 rounded-full border-4 transition-all ${
                      selectedColor.name === c.name
                        ? "border-black scale-110"
                        : "border-white shadow-md"
                    }`}
                    style={{
                      backgroundColor: c.hex,
                    }}
                  />

                  <span className="text-xs uppercase tracking-wider">
                    {c.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* PATTERN */}
          <div className="mb-14">
            <h2 className="text-3xl font-light mb-6">
              Pattern Style
            </h2>

            <div className="flex gap-4 flex-wrap">
              {patterns.map((p) => (
                <button
                  key={p}
                  onClick={() => setSelectedPattern(p)}
                  className={`px-5 py-3 border transition ${
                    selectedPattern === p
                      ? "bg-black text-white"
                      : "bg-white border-black/10 hover:border-black"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* EMBROIDERY */}
          <div className="mb-14">
            <h2 className="text-3xl font-light mb-6">
              Embroidery Finish
            </h2>

            <div className="flex gap-4 flex-wrap">
              {embroidery.map((e) => (
                <button
                  key={e}
                  onClick={() => setSelectedEmbroidery(e)}
                  className={`px-5 py-3 border transition ${
                    selectedEmbroidery === e
                      ? "bg-black text-white"
                      : "bg-white border-black/10 hover:border-black"
                  }`}
                >
                  {e}
                </button>
              ))}
            </div>
          </div>

          {/* NOTES */}
          <div className="mb-14">
            <h2 className="text-3xl font-light mb-6">
              Design Notes
            </h2>

            <textarea
              value={designText}
              onChange={(e) => setDesignText(e.target.value)}
              placeholder="Describe your desired shawl design, motifs, inspirations, initials, border details..."
              className="w-full border border-black/10 bg-white p-6 min-h-[180px] outline-none focus:border-black transition"
            />
          </div>

          {/* IMAGE */}
          <div className="mb-16">
            <h2 className="text-3xl font-light mb-6">
              Upload Reference
            </h2>

            <div className="bg-white border border-dashed border-black/20 p-10">
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setImageFile(e.target.files[0])
                }
              />

              {imageFile && (
                <p className="mt-4 text-sm text-black/60">
                  Selected: {imageFile.name}
                </p>
              )}
            </div>
          </div>

          {/* SUBMIT */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-black text-white py-5 uppercase tracking-[0.3em] hover:opacity-90 transition disabled:opacity-50"
          >
            {loading
              ? "Submitting Design..."
              : "Submit Luxury Design"}
          </button>

        </div>
      </section>
    </div>
  );
}

export default AtelierPage;