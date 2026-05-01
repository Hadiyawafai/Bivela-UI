import React from "react";
import {
  Package,
  ShoppingBag,
  Users,
  ArrowUpRight,
} from "lucide-react";

export default function DashboardHome() {
  return (
    <div className="min-h-screen bg-[#F2F0EF] px-2 md:px-4">
      {/* Heading */}
      <p
        className="text-xs uppercase tracking-[0.35em] text-black/45 mb-3"
        style={{
          fontFamily: "Cardo, serif",
        }}
      >
        Bivela Admin
      </p>

      <h1
        className="text-4xl md:text-6xl text-black mb-12"
        style={{
          fontFamily: "TanAngleton, serif",
        }}
      >
        Dashboard
      </h1>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card
          title="Products"
          value="18"
          icon={<Package size={20} />}
          growth="+4 This Month"
        />

        <Card
          title="Orders"
          value="7"
          icon={<ShoppingBag size={20} />}
          growth="+2 Today"
        />

        <Card
          title="Users"
          value="42"
          icon={<Users size={20} />}
          growth="+11 New Users"
        />
      </div>
    </div>
  );
}

function Card({
  title,
  value,
  icon,
  growth,
}) {
  return (
    <div className="group bg-white border border-black/10 rounded-3xl p-7 md:p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition duration-300">

      {/* Top */}
      <div className="flex justify-between items-center mb-8">
        <div className="w-11 h-11 rounded-full border border-black/10 flex items-center justify-center text-black">
          {icon}
        </div>

        <ArrowUpRight
          size={18}
          className="text-black/30 group-hover:text-black transition"
        />
      </div>

      {/* Title */}
      <p
        className="text-xs uppercase tracking-[0.28em] text-black/45 mb-3"
        style={{
          fontFamily: "Cardo, serif",
        }}
      >
        {title}
      </p>

      {/* Number */}
      <h2
        className="text-5xl md:text-6xl text-black leading-none"
        style={{
          fontFamily: "TanAngleton, serif",
        }}
      >
        {value}
      </h2>

      {/* Bottom */}
      <div className="mt-7 pt-5 border-t border-black/10">
        <p className="text-sm text-black/55 tracking-wide">
          {growth}
        </p>
      </div>
    </div>
  );
}