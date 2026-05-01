import React from "react";
import { useNavigate } from "react-router-dom";

function ProductCard({
  id,
  image,
  title,
  description,
}) {
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
            className="w-full h-[270px] object-cover transition duration-700 group-hover:scale-105"
          />
        </div>

        {/* CONTENT */}
        <div className="px-5 py-4">

          {/* SMALL LABEL */}
          <p
            className="text-[10px] uppercase tracking-[0.32em] text-[#1C2120]/45 mb-2"
            style={{
              fontFamily:
                "Cardo, serif",
            }}
          >
            Bivela Edition
          </p>

          {/* TITLE */}
          <h3
            className="text-[24px] leading-none text-[#1C2120] mb-3"
            style={{
              fontFamily:
                "TanAngleton, serif",
            }}
          >
            {title}
          </h3>

          {/* BUTTON MOVED UP */}
          <button
            onClick={() =>
              navigate(
                `/product/${id}`
              )
            }
            className="text-[11px] uppercase tracking-[0.26em] border-b border-[#1C2120] pb-1 hover:opacity-60 transition mb-4"
            style={{
              fontFamily:
                "Cardo, serif",
            }}
          >
            Own This Piece
          </button>

          {/* DESCRIPTION */}
          <p
            className="text-sm leading-6 text-[#1C2120]/70 min-h-[56px]"
            style={{
              fontFamily:
                "Cardo, serif",
            }}
          >
            {description}
          </p>

        </div>
      </div>
    </div>
  );
}

export default ProductCard;
