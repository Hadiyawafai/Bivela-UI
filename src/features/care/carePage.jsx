import React from "react";
import {
  Sparkles,
  ShieldCheck,
  CalendarDays,
  ArrowRight,
} from "lucide-react";

const CarePage = () => {
  const services = [
    {
      title: "Cleaning",
      desc: "Gentle restoration of softness, texture and brilliance using artisan-approved care methods.",
      icon: <Sparkles size={20} />,
    },
    {
      title: "Restoration",
      desc: "Repair delicate threads, revive embroidery and preserve treasured heritage pieces.",
      icon: <ShieldCheck size={20} />,
    },
    {
      title: "Pickup Scheduling",
      desc: "Arrange a private pickup with preferred date and time for complete convenience.",
      icon: <CalendarDays size={20} />,
    },
  ];

  return (
    <div className="min-h-screen bg-[#F2F0EF] text-[#1C2120] pt-32">
      {/* HERO */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <p
          className="text-xs uppercase tracking-[0.35em] text-[#1C2120]/55 mb-5"
          style={{ fontFamily: "Cardo, serif" }}
        >
          Care & Maintenance
        </p>

        <h1
          className="text-5xl md:text-7xl leading-tight"
          style={{ fontFamily: "TanAngleton, serif" }}
        >
          Preserve
          <br />
          Your Legacy Piece
        </h1>

        <p
          className="mt-8 max-w-2xl text-[#1C2120]/70 leading-8"
          style={{ fontFamily: "Cardo, serif" }}
        >
          Every Bivela creation deserves timeless care. Our premium maintenance
          service restores elegance, softness and craftsmanship.
        </p>
      </section>

      {/* IMAGE SECTION */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="h-[550px] overflow-hidden bg-[#E9E6E1]">
          <img
            src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1600&auto=format&fit=crop"
            alt="Luxury Care"
            className="w-full h-full object-cover hover:scale-105 transition duration-700"
          />
        </div>
      </section>

      {/* SERVICES */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid md:grid-cols-3 gap-6">
          {services.map((item, index) => (
            <div
              key={index}
              className="border border-black/10 p-8 hover:bg-[#1C2120] hover:text-[#F2F0EF] transition duration-500"
            >
              <div className="mb-6">{item.icon}</div>

              <h3
                className="text-3xl mb-4"
                style={{ fontFamily: "TanAngleton, serif" }}
              >
                {item.title}
              </h3>

              <p
                className="leading-8 text-sm opacity-80"
                style={{ fontFamily: "Cardo, serif" }}
              >
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* BOOKING */}
      <section className="border-t border-black/10">
        <div className="max-w-7xl mx-auto px-6 py-24 text-center">
          <p
            className="text-xs uppercase tracking-[0.35em] text-[#1C2120]/55 mb-5"
            style={{ fontFamily: "Cardo, serif" }}
          >
            Concierge Booking
          </p>

          <h2
            className="text-4xl md:text-6xl leading-tight mb-8"
            style={{ fontFamily: "TanAngleton, serif" }}
          >
            Arrange Premium
            <br />
            Pickup Service
          </h2>

          <button
            className="px-10 py-4 bg-[#1C2120] text-[#F2F0EF] text-xs uppercase tracking-[0.30em] hover:opacity-90 transition inline-flex items-center gap-3"
            style={{ fontFamily: "Cardo, serif" }}
          >
            Book Service <ArrowRight size={16} />
          </button>
        </div>
      </section>
    </div>
  );
};

export default CarePage;