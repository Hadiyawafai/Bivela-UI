import React, { useState } from "react";
import ProductCard from "../../components/common/card";

import one from "../../assets/one.jpeg";
import two from "../../assets/two.jpeg";
import three from "../../assets/three.jpeg";
import { NavLink } from "react-router-dom";

const allProducts = [
    {
        id: 1,
        image: one,
        title: "Pashmina",
        category: "Classic",
        price: "₹18,500",
        description:
            "Made from rare Changthangi wool with feather-light softness and warmth.",
    },
    {
        id: 2,
        image: two,
        title: "Jamawar",
        category: "Royal",
        price: "₹24,000",
        description:
            "Intricate woven floral artistry inspired by regal Kashmiri heritage.",
    },
    {
        id: 3,
        image: three,
        title: "Kani",
        category: "Limited",
        price: "₹29,500",
        description:
            "Handwoven using traditional wooden sticks known as kanis.",
    },
    {
        id: 4,
        image: one,
        title: "Noor Cashmere",
        category: "Classic",
        price: "₹16,900",
        description:
            "Understated elegance with timeless texture and soft drape.",
    },
    {
        id: 5,
        image: two,
        title: "Royal Paisley",
        category: "Royal",
        price: "₹32,000",
        description:
            "Luxurious detailing crafted for statement sophistication.",
    },
    {
        id: 6,
        image: three,
        title: "Artisan Legacy",
        category: "Limited",
        price: "₹36,500",
        description:
            "A collector’s piece woven in limited artisan production.",
    },
];

function ShopPage() {
    const [activeFilter, setActiveFilter] = useState("All");

    const filters = ["All", "Classic", "Royal", "Limited"];

    const filteredProducts =
        activeFilter === "All"
            ? allProducts
            : allProducts.filter(
                (item) => item.category === activeFilter
            );

    return (
        <div className="bg-[#F2F0EF] min-h-screen pt-32">
            {/* Hero */}
            <section className="max-w-7xl mx-auto px-6 pb-20">
                <p className="text-xs uppercase tracking-[0.35em] text-[#1C2120]/55 mb-4"
                style={{ fontFamily: "Cardo, serif" }}>
                    Bivela House
                </p>

                <h1
                    className="text-5xl md:text-7xl text-[#1C2120] leading-tight"
                    style={{ fontFamily: "TanAngleton, serif" }}
                >
                    The Collection
                </h1>

                <p className="mt-8 max-w-2xl text-[#1C2120]/70 leading-8"
                style={{ fontFamily: "Cardo, serif" }}>
                    Discover heirloom shawls shaped through heritage,
                    craftsmanship, and timeless luxury. Each piece is
                    designed to be treasured for generations.
                </p>
            </section>

            {/* Filters */}
            <section className="max-w-7xl mx-auto px-6 pb-16">
                <div className="flex flex-wrap gap-4 border-y border-black/10 py-6">
                    {filters.map((item) => (
                        <button
                            key={item}
                            onClick={() => setActiveFilter(item)}
                            className={`px-5 py-2 text-xs uppercase tracking-[0.30em] transition duration-300 border ${activeFilter === item
                                    ? "bg-[#1C2120] text-[#F2F0EF] border-[#1C2120]"
                                    : "border-black/15 text-[#1C2120] hover:bg-[#1C2120] hover:text-[#F2F0EF]"
                                }`}
                        >
                            {item}
                        </button>
                    ))}
                </div>
            </section>

            {/* Products */}
            <section className="max-w-7xl mx-auto px-6 pb-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-14">
                {filteredProducts.map((item) => (
                    <div key={item.id}>
                        <ProductCard
                            id={item.id}
                            image={item.image}
                            title={item.title}
                            description={item.description}
                        />

                        <div className="mt-4 flex items-center justify-between">
                            <p className="text-xs uppercase tracking-[0.25em] text-[#1C2120]/55">
                                {item.category}
                            </p>

                            <p className="text-sm text-[#1C2120]">
                                {item.price}
                            </p>
                        </div>
                    </div>
                ))}
            </section>

            {/* Editorial Section */}
            <section className="border-t border-black/10">
                <div className="max-w-7xl mx-auto px-6 py-24 text-center">
                    <p className="text-xs uppercase tracking-[0.35em] text-[#1C2120]/55 mb-5"
                    style={{ fontFamily: "Cardo, serif" }}>
                        Private Atelier
                    </p>

                    <h2
                        className="text-4xl md:text-6xl text-[#1C2120]"
                        style={{ fontFamily: "TanAngleton, serif" }}
                    >
                        Design What Does
                        <br />
                        Not Yet Exist
                    </h2>

                    <p className="mt-8 max-w-2xl mx-auto text-[#1C2120]/70 leading-8"
                    style={{ fontFamily: "Cardo, serif" }}>
                        Personalize threads, patterns, and embroidery in
                        your own Bivela masterpiece.
                    </p>

                    <NavLink
                        to="/atelier"
                        className="inline-block mt-10 border border-[#1C2120] px-8 py-3 text-xs uppercase tracking-[0.30em] hover:bg-[#1C2120] hover:text-[#F2F0EF] transition"
                   style={{ fontFamily: "Cardo, serif" }} >
                        Enter Atelier
                    </NavLink>
                </div>
            </section>
        </div>
    );
}

export default ShopPage;