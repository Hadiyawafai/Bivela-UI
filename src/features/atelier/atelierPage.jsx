import React, { useState } from "react";

import one from "../../assets/one.jpeg";
import two from "../../assets/two.jpeg";
import three from "../../assets/three.jpeg";

const baseShawls = [
  { id: 1, name: "Classic Cashmere", image: one },
  { id: 2, name: "Royal Weave", image: two },
  { id: 3, name: "Limited Heritage", image: three },
];

const colors = ["Ivory", "Sand", "Noir", "Rose", "Emerald"];
const patterns = ["Minimal", "Paisley", "Floral", "Regal"];
const embroidery = ["None", "Gold Thread", "Silver Thread", "Hand Kani"];

function AtelierPage() {
  const [selectedShawl, setSelectedShawl] = useState(baseShawls[0]);
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [selectedPattern, setSelectedPattern] = useState(patterns[0]);
  const [selectedEmbroidery, setSelectedEmbroidery] = useState(embroidery[0]);

  return (
    <div className="bg-[#F2F0EF] min-h-screen pt-32 text-[#1C2120]">
      {/* HERO */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <p
          className="text-xs uppercase tracking-[0.35em] text-[#1C2120]/55 mb-5"
          style={{ fontFamily: "Cardo, serif" }}
        >
          Private Atelier
        </p>

        <h1
          className="text-5xl md:text-7xl leading-tight"
          style={{ fontFamily: "TanAngleton, serif" }}
        >
          Design What
          <br />
          Does Not Yet Exist
        </h1>

        <p
          className="mt-8 max-w-2xl text-[#1C2120]/70 leading-8"
          style={{ fontFamily: "Cardo, serif" }}
        >
          Enter the Bivela atelier and personalize a shawl through colors,
          patterns, and handcrafted finishing details.
        </p>
      </section>

      {/* MAIN GRID */}
      <section className="max-w-7xl mx-auto px-6 pb-24 grid lg:grid-cols-2 gap-16 items-start">
        {/* LEFT PREVIEW FIXED */}
        <div className="lg:sticky lg:top-28 self-start h-fit">
          <div className="relative overflow-hidden bg-[#E9E6E1] rounded-sm">
            <img
              src={selectedShawl.image}
              alt={selectedShawl.name}
              className="w-full h-[600px] object-cover transition duration-700 hover:scale-105"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>

            {/* Bottom Tag */}
            <div className="absolute bottom-0 left-0 w-full p-6">
              <p
                className="text-[#F2F0EF] text-xs uppercase tracking-[0.30em] mb-2"
                style={{ fontFamily: "Cardo, serif" }}
              >
                Live Preview
              </p>

              <h3
                className="text-[#F2F0EF] text-3xl"
                style={{ fontFamily: "TanAngleton, serif" }}
              >
                {selectedShawl.name}
              </h3>
            </div>
          </div>

          {/* Preview Details */}
          <div className="mt-8 border-t border-black/10 pt-8 grid grid-cols-2 gap-6 text-sm">
            <div>
              <p
                className="text-xs uppercase tracking-[0.25em] text-[#1C2120]/50 mb-2"
                style={{ fontFamily: "Cardo, serif" }}
              >
                Color
              </p>
              <p>{selectedColor}</p>
            </div>

            <div>
              <p
                className="text-xs uppercase tracking-[0.25em] text-[#1C2120]/50 mb-2"
                style={{ fontFamily: "Cardo, serif" }}
              >
                Pattern
              </p>
              <p>{selectedPattern}</p>
            </div>

            <div>
              <p
                className="text-xs uppercase tracking-[0.25em] text-[#1C2120]/50 mb-2"
                style={{ fontFamily: "Cardo, serif" }}
              >
                Embroidery
              </p>
              <p>{selectedEmbroidery}</p>
            </div>

            <div>
              <p
                className="text-xs uppercase tracking-[0.25em] text-[#1C2120]/50 mb-2"
                style={{ fontFamily: "Cardo, serif" }}
              >
                Delivery
              </p>
              <p>4–6 Weeks</p>
            </div>
          </div>
        </div>

        {/* RIGHT CONTROLS */}
        <div>
          {/* Step 1 */}
          <div className="pb-12 border-b border-black/10">
            <p
              className="text-xs uppercase tracking-[0.30em] text-[#1C2120]/55 mb-5"
              style={{ fontFamily: "Cardo, serif" }}
            >
              Step 1
            </p>

            <h2
              className="text-3xl mb-8"
              style={{ fontFamily: "TanAngleton, serif" }}
            >
              Select Base Shawl
            </h2>

            <div className="grid sm:grid-cols-3 gap-5">
              {baseShawls.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSelectedShawl(item)}
                  className={`border transition duration-300 ${
                    selectedShawl.id === item.id
                      ? "border-[#1C2120]"
                      : "border-black/10"
                  }`}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-44 object-cover"
                  />

                  <div className="p-4 text-left">
                    <p className="text-sm">{item.name}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2 */}
          <div className="py-12 border-b border-black/10">
            <p
              className="text-xs uppercase tracking-[0.30em] text-[#1C2120]/55 mb-5"
              style={{ fontFamily: "Cardo, serif" }}
            >
              Step 2
            </p>

            <h2
              className="text-3xl mb-8"
              style={{ fontFamily: "TanAngleton, serif" }}
            >
              Choose Color
            </h2>

            <div className="flex flex-wrap gap-4">
              {colors.map((item) => (
                <button
                  key={item}
                  onClick={() => setSelectedColor(item)}
                  className={`px-5 py-3 text-xs uppercase tracking-[0.25em] border transition ${
                    selectedColor === item
                      ? "bg-[#1C2120] text-[#F2F0EF] border-[#1C2120]"
                      : "border-black/15 hover:bg-[#1C2120] hover:text-[#F2F0EF]"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Step 3 */}
          <div className="py-12 border-b border-black/10">
            <p
              className="text-xs uppercase tracking-[0.30em] text-[#1C2120]/55 mb-5"
              style={{ fontFamily: "Cardo, serif" }}
            >
              Step 3
            </p>

            <h2
              className="text-3xl mb-8"
              style={{ fontFamily: "TanAngleton, serif" }}
            >
              Select Pattern
            </h2>

            <div className="grid sm:grid-cols-2 gap-4">
              {patterns.map((item) => (
                <button
                  key={item}
                  onClick={() => setSelectedPattern(item)}
                  className={`p-4 border text-left transition ${
                    selectedPattern === item
                      ? "border-[#1C2120]"
                      : "border-black/10"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Step 4 */}
          <div className="py-12">
            <p
              className="text-xs uppercase tracking-[0.30em] text-[#1C2120]/55 mb-5"
              style={{ fontFamily: "Cardo, serif" }}
            >
              Step 4
            </p>

            <h2
              className="text-3xl mb-8"
              style={{ fontFamily: "TanAngleton, serif" }}
            >
              Finishing Embroidery
            </h2>

            <div className="grid sm:grid-cols-2 gap-4">
              {embroidery.map((item) => (
                <button
                  key={item}
                  onClick={() => setSelectedEmbroidery(item)}
                  className={`p-4 border text-left transition ${
                    selectedEmbroidery === item
                      ? "border-[#1C2120]"
                      : "border-black/10"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-12 flex flex-wrap gap-4">
              <button
                className="px-8 py-4 bg-[#1C2120] text-[#F2F0EF] text-xs uppercase tracking-[0.30em] hover:opacity-90 transition"
                style={{ fontFamily: "Cardo, serif" }}
              >
                Save Design
              </button>

              <button
                className="px-8 py-4 border border-[#1C2120] text-xs uppercase tracking-[0.30em] hover:bg-[#1C2120] hover:text-[#F2F0EF] transition"
                style={{ fontFamily: "Cardo, serif" }}
              >
                Add To Cart
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Quote */}
      <section className="border-t border-black/10">
        <div className="max-w-7xl mx-auto px-6 py-24 text-center">
          <p
            className="text-xs uppercase tracking-[0.35em] text-[#1C2120]/55 mb-5"
            style={{ fontFamily: "Cardo, serif" }}
          >
            Bivela Signature
          </p>

          <h2
            className="text-4xl md:text-6xl leading-tight"
            style={{ fontFamily: "TanAngleton, serif" }}
          >
            Luxury Begins
            <br />
            With Personal Meaning
          </h2>
        </div>
      </section>
    </div>
  );
}

export default AtelierPage;