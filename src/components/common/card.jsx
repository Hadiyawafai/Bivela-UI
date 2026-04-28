import React from "react";
import { useNavigate } from "react-router-dom";

function ProductCard({ id, image, title, description }) {
  const navigate = useNavigate();

  return (
    <div className="group cursor-pointer w-full">
      {/* CARD */}
      <div className="bg-[#F2F0EF] border border-black/8 overflow-hidden transition duration-500 hover:shadow-xl">
        {/* IMAGE */}
        <div className="overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-[390px] object-cover transition duration-700 group-hover:scale-105"
          />
        </div>

        {/* CONTENT */}
        <div className="px-7 py-7">
          <p
            className="text-[10px] uppercase tracking-[0.38em] text-[#1C2120]/45 mb-4"
            style={{ fontFamily: "Cardo, serif" }}
          >
            Bivela Edition
          </p>

          <h3
            className="text-[32px] leading-none text-[#1C2120] mb-5"
            style={{ fontFamily: "TanAngleton, serif" }}
          >
            {title}
          </h3>

          <p
            className="text-sm leading-7 text-[#1C2120]/70 min-h-[95px] mb-7"
            style={{ fontFamily: "Cardo, serif" }}
          >
            {description}
          </p>

          {/* BUTTON */}
          <button
            onClick={() => navigate(`/product/${id}`)}
            className="text-xs uppercase tracking-[0.32em] border-b border-[#1C2120] pb-1 hover:opacity-60 transition"
            style={{ fontFamily: "Cardo, serif" }}
          >
            Own This Piece
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;