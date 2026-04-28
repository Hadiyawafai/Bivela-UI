import React from "react";
import { Search, ArrowRight, Sparkles } from "lucide-react";

const SearchPage = () => {
  const collections = [
    "Classic Cashmere",
    "Royal Weave",
    "Limited Heritage",
    "Hand Embroidery",
    "Ivory Collection",
    "Emerald Reserve",
  ];

  return (
    <div className="min-h-screen bg-[#F2F0EF] text-[#1C2120] pt-32">
      {/* HERO */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <p
          className="text-xs uppercase tracking-[0.35em] text-[#1C2120]/55 mb-5"
          style={{ fontFamily: "Cardo, serif" }}
        >
          Search Bivela
        </p>

        <h1
          className="text-5xl md:text-7xl leading-tight"
          style={{ fontFamily: "TanAngleton, serif" }}
        >
          Discover Rare
          <br />
          Creations
        </h1>

        <p
          className="mt-8 max-w-2xl text-[#1C2120]/70 leading-8"
          style={{ fontFamily: "Cardo, serif" }}
        >
          Explore shawls, collections, heritage pieces and handcrafted luxury.
        </p>
      </section>

      {/* SEARCH BAR */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="border border-black/10 bg-white px-6 py-5 flex items-center gap-4">
          <Search className="w-5 h-5 text-[#1C2120]/60" />

          <input
            type="text"
            placeholder="Search for collections, designs, luxury shawls..."
            className="w-full bg-transparent outline-none text-lg"
            style={{ fontFamily: "Cardo, serif" }}
          />
        </div>
      </section>

      {/* TRENDING */}
      <section className="max-w-7xl mx-auto px-6 pb-28">
        <p
          className="text-xs uppercase tracking-[0.35em] text-[#1C2120]/55 mb-8"
          style={{ fontFamily: "Cardo, serif" }}
        >
          Popular Searches
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {collections.map((item, index) => (
            <div
              key={index}
              className="border border-black/10 p-8 hover:bg-[#1C2120] hover:text-[#F2F0EF] transition duration-500 cursor-pointer"
            >
              <div className="flex justify-between items-center">
                <p
                  className="text-xl"
                  style={{ fontFamily: "TanAngleton, serif" }}
                >
                  {item}
                </p>

                <ArrowRight size={18} />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default SearchPage;