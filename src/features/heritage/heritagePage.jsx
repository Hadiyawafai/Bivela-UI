import React from "react";

import one from "../../assets/one.jpeg";
import two from "../../assets/two.jpeg";
import three from "../../assets/three.jpeg";

function HeritagePage() {
  return (
    <div className="bg-[#F2F0EF] text-[#1C2120] pt-32 min-h-screen">
      {/* HERO */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <p className="text-xs uppercase tracking-[0.35em] text-[#1C2120]/55 mb-5">
          Heritage
        </p>

        <h1
          className="text-5xl md:text-7xl leading-tight"
          style={{ fontFamily: "TanAngleton, serif" }}
        >
          Where Craft
          <br />
          Becomes Legacy
        </h1>

        <p className="mt-8 max-w-2xl text-[#1C2120]/70 leading-8">
          Bivela celebrates the timeless artistry of Kashmir,
          where generations of master artisans transform rare
          fibers into treasured heirlooms.
        </p>
      </section>

      {/* FULL IMAGE */}
      <section className="px-6 pb-24">
        <div className="max-w-7xl mx-auto overflow-hidden">
          <img
            src={one}
            alt="Kashmir Craftsmanship"
            className="w-full h-[75vh] object-cover hover:scale-105 transition duration-700"
          />
        </div>
      </section>

      {/* STORY SECTION */}
    {/* STORY SECTION */}
<section className="max-w-7xl mx-auto px-6 pb-28 grid md:grid-cols-2 gap-16 items-center">
  <div>
    <p className="text-xs uppercase tracking-[0.35em] text-[#1C2120]/55 mb-5">
      The Origin
    </p>

    <h2
      className="text-4xl md:text-6xl leading-tight"
      style={{ fontFamily: "TanAngleton, serif" }}
    >
      Born In
      <br />
      Conviction
    </h2>

    <p className="mt-8 text-[#1C2120]/70 leading-8  text-sm tracking-wide">
      Bivela was born from a simple conviction: that true refinement
      is never created in haste, nor defined by excess, but shaped
      by time, culture, and the mastery of human hands.
      <br />
      <br />
      In a world driven by trends and immediacy, Bivela chooses
      a deliberate path—honouring tradition while speaking fluently
      to contemporary fashion.
      <br />
      <br />
      At the intersection of heritage and modernity, Bivela
      reimagines craft for the present. Tradition is not preserved
      behind glass; it is transformed into living expression.
      <br />
      <br />
      Each creation carries the quiet authority of generations,
      interpreted through a global contemporary lens.
      <br />
      <br />
      Rooted in artisanal craftsmanship where skill is inherited
      and every detail is intentional, Bivela stands for cultural
      pride and enduring prestige.
      <br />
      <br />
      It does not follow the world of fashion—it shapes it,
      with confidence, purpose, and vision.
      <br />
      <br />
      <span
        className="block text-[#1C2120] text-lg mt-4"
        style={{ fontFamily: "TanAngleton, serif" }}
      >
        With Bivela, You Wear Art.
      </span>
    </p>
  </div>

  <img
    src={two}
    alt="Artisan"
    className="w-full h-[620px] object-cover"
  />
</section>

      {/* TIMELINE */}
      <section className="border-t border-black/10 border-b border-black/10">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <p className="text-xs uppercase tracking-[0.35em] text-[#1C2120]/55 mb-12"
          style={{ fontFamily: "Cardo, serif" }}>
            The Journey
          </p>

          <div className="grid md:grid-cols-3 gap-10">
            <div>
              <h3
                className="text-3xl mb-4"
                style={{ fontFamily: "TanAngleton, serif" }}
              >
                01. Rare Fibers
              </h3>

              <p className="text-[#1C2120]/70 leading-7"
              style={{ fontFamily: "Cardo, serif" }}>
                The finest wool is gathered from Changthangi goats,
                known for softness and warmth.
              </p>
            </div>

            <div>
              <h3
                className="text-3xl mb-4"
                style={{ fontFamily: "TanAngleton, serif" }}
              >
                02. Hand Weaving
              </h3>

              <p className="text-[#1C2120]/70 leading-7"
              style={{ fontFamily: "Cardo, serif" }}>
                Skilled artisans weave patiently over weeks,
                preserving ancient techniques.
              </p>
            </div>

            <div>
              <h3
                className="text-3xl mb-4"
                style={{ fontFamily: "TanAngleton, serif" }}
              >
                03. Timeless Finish
              </h3>

              <p className="text-[#1C2120]/70 leading-7"
              style={{ fontFamily: "Cardo, serif" }}>
                Every finished piece becomes an heirloom of beauty,
                ready to be treasured for generations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* IMAGE + TEXT */}
      <section className="max-w-7xl mx-auto px-6 py-28 grid md:grid-cols-2 gap-16 items-center">
        <img
          src={three}
          alt="Luxury Shawl"
          className="w-full h-[540px] object-cover"
        />

        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-[#1C2120]/55 mb-5"
          style={{ fontFamily: "Cardo, serif" }}>
            Bivela Promise
          </p>

          <h2
            className="text-4xl md:text-6xl leading-tight"
            style={{ fontFamily: "TanAngleton, serif" }}
          >
            Not Fashion.
            <br />
            Legacy.
          </h2>

          <p className="mt-8 text-[#1C2120]/70 leading-8"
          style={{ fontFamily: "Cardo, serif" }}>
            Bivela pieces are designed beyond seasons. They are
            created for those who value rarity, elegance, and
            enduring craftsmanship.
          </p>

          <button className="mt-10 border border-[#1C2120] px-8 py-3 text-xs uppercase tracking-[0.30em] hover:bg-[#1C2120] hover:text-[#F2F0EF] transition">
            Discover Collection
          </button>
        </div>
      </section>

      {/* QUOTE */}
      <section className="border-t border-black/10">
        <div className="max-w-7xl mx-auto px-6 py-24 text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-[#1C2120]/55 mb-5"
          style={{ fontFamily: "Cardo, serif" }}>
            House Of Bivela
          </p>

          <h2
            className="text-4xl md:text-6xl leading-tight"
            style={{ fontFamily: "TanAngleton, serif" }}
          >
            Crafted By Hands.
            <br />
            Remembered By Time.
          </h2>
        </div>
      </section>
    </div>
  );
}

export default HeritagePage;