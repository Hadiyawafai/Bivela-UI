import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import ProductCard from "../../components/common/card";

import one from "../../assets/one.jpeg";
import two from "../../assets/two.jpeg";
import three from "../../assets/three.jpeg";

import { getAllProducts } from "../shop/shopService";

const heroImages = [one, two, three];

function Home() {
  const [index, setIndex] = useState(0);
  const [products, setProducts] = useState([]);

  // ======================================
  // HERO SLIDER
  // ======================================
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % heroImages.length);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  // ======================================
  // FETCH REAL PRODUCTS FROM SHOP API
  // ======================================
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts();

        const safe = Array.isArray(data)
          ? data.slice(0, 3)
          : [];

        setProducts(safe);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="bg-[#F2F0EF] text-[#1C2120] overflow-hidden">
      {/* HERO */}
      <section className="relative h-screen w-full">
        <img
          src={heroImages[index]}
          alt="hero"
          className="w-full h-full object-cover transition duration-1000"
        />

        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <div className="text-center px-6 max-w-5xl">
            <p
              className="text-[#F2F0EF] text-xs md:text-sm uppercase tracking-[0.45em] mb-6 mt-5"
              style={{ fontFamily: "Cardo, serif" }}
            >
              House Of Bivela
            </p>

            <h1
              className="text-[#F2F0EF] text-4xl md:text-7xl leading-tight"
              style={{ fontFamily: "TanAngleton, serif" }}
            >
              Crafted In Legacy
              <br />
              Worn In Elegance
            </h1>

            <p
              className="mt-8 text-[#F2F0EF]/85 max-w-2xl mx-auto leading-8"
              style={{ fontFamily: "Cardo, serif" }}
            >
              A modern luxury house rooted in Kashmiri heritage,
              creating shawls that become timeless heirlooms.
            </p>

            <NavLink
              to="/shop"
              className="inline-block mt-10 border border-[#F2F0EF] px-8 py-3 text-[#F2F0EF] text-xs uppercase tracking-[0.35em] hover:bg-[#F2F0EF] hover:text-[#1C2120] transition duration-500"
              style={{ fontFamily: "Cardo, serif" }}
            >
              Discover Collection
            </NavLink>
          </div>
        </div>
      </section>

      {/* REAL PRODUCTS */}
      <section className="border-t border-black/10">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 mb-14">
            <div>
              <p
                className="text-xs uppercase tracking-[0.35em] text-[#1C2120]/55 mb-3"
                style={{ fontFamily: "Cardo, serif" }}
              >
                Signature Collection
              </p>

              <h2
                className="text-4xl md:text-6xl"
                style={{ fontFamily: "TanAngleton, serif" }}
              >
                Quiet Luxury
              </h2>
            </div>

            <NavLink
              to="/shop"
              className="text-xs uppercase tracking-[0.30em] border-b border-[#1C2120] pb-1 hover:opacity-60 transition w-fit"
              style={{ fontFamily: "Cardo, serif" }}
            >
              View All Pieces
            </NavLink>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.map((item) => {
              const image =
                item.primaryImage ||
                item.images?.find(
                  (img) => img.isPrimary
                )?.imageUrl ||
                item.images?.[0]?.imageUrl;

              return (
                <div
                  key={item.id}
                  className="max-w-[340px] mx-auto w-full"
                >
                  <ProductCard
                    id={item.id}
                    image={image}
                    title={item.name}
                    description={`₹${item.basePrice}`}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* HERITAGE */}
      <section className="border-t border-black/10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 items-center">
          <div>
            <img
              src={two}
              alt="heritage"
              className="w-full h-[620px] object-cover"
            />
          </div>

          <div className="px-6 md:px-16 py-20">
            <p
              className="text-xs uppercase tracking-[0.35em] text-[#1C2120]/55 mb-4"
              style={{ fontFamily: "Cardo, serif" }}
            >
              Heritage
            </p>

            <h2
              className="text-4xl md:text-6xl leading-tight"
              style={{ fontFamily: "TanAngleton, serif" }}
            >
              Woven By Hand.
              <br />
              Preserved By Time.
            </h2>

            <p
              className="mt-8 text-[#1C2120]/70 leading-8 max-w-lg"
              style={{ fontFamily: "Cardo, serif" }}
            >
              Every Bivela piece carries the story of Kashmiri
              artisans, where generations transform rare fibers
              into refined works of art.
            </p>

            <NavLink
              to="/heritage"
              className="inline-block mt-10 text-xs uppercase tracking-[0.30em] border-b border-[#1C2120] pb-1 hover:opacity-60 transition"
              style={{ fontFamily: "Cardo, serif" }}
            >
              Explore Heritage
            </NavLink>
          </div>
        </div>
      </section>

      {/* PRIVATE ATELIER */}
      <section className="border-t border-black/10">
        <div className="max-w-7xl mx-auto px-6 py-28 text-center">
          <p
            className="text-xs uppercase tracking-[0.35em] text-[#1C2120]/55 mb-5"
            style={{ fontFamily: "Cardo, serif" }}
          >
            Private Atelier
          </p>

          <h2
            className="text-4xl md:text-6xl leading-tight"
            style={{ fontFamily: "TanAngleton, serif" }}
          >
            Design What
            <br />
            Does Not Yet Exist
          </h2>

          <p
            className="mt-8 max-w-2xl mx-auto text-[#1C2120]/70 leading-8"
            style={{ fontFamily: "Cardo, serif" }}
          >
            Personalize colors, patterns and finishing details
            through our bespoke shawl atelier.
          </p>

          <NavLink
            to="/atelier"
            className="inline-block mt-10 px-8 py-4 bg-[#1C2120] text-[#F2F0EF] text-xs uppercase tracking-[0.35em] hover:opacity-90 transition"
            style={{ fontFamily: "Cardo, serif" }}
          >
            Enter Atelier
          </NavLink>
        </div>
      </section>

      {/* CARE */}
      <section className="border-t border-black/10">
        <div className="max-w-7xl mx-auto px-6 py-24 text-center">
          <p
            className="text-xs uppercase tracking-[0.35em] text-[#1C2120]/55 mb-4"
            style={{ fontFamily: "Cardo, serif" }}
          >
            Concierge Care
          </p>

          <h2
            className="text-4xl md:text-5xl"
            style={{ fontFamily: "TanAngleton, serif" }}
          >
            Luxury Continues
            <br />
            Beyond Purchase
          </h2>

          <p
            className="mt-8 max-w-2xl mx-auto text-[#1C2120]/70 leading-8"
            style={{ fontFamily: "Cardo, serif" }}
          >
            Cleaning, preservation and restoration services
            crafted to maintain the beauty of every heirloom.
          </p>

          <NavLink
            to="/care"
            className="inline-block mt-10 text-xs uppercase tracking-[0.30em] border-b border-[#1C2120] pb-1 hover:opacity-60 transition"
            style={{ fontFamily: "Cardo, serif" }}
          >
            Explore Care
          </NavLink>
        </div>
      </section>
    </div>
  );
}

export default Home;