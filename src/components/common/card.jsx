import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ProductCard({
  id,
  image,
  title,
  description,
  price, // ✅ NEW PROP
}) {
  const navigate = useNavigate();

  const [currentImage, setCurrentImage] = useState(image);

  useEffect(() => {
    setCurrentImage(image);
  }, [image]);

  return (
    <div className="group cursor-pointer w-full">
      <div className="bg-[#F2F0EF] border border-black/8 overflow-hidden transition duration-500 hover:shadow-xl">

        {/* IMAGE */}
        <div className="overflow-hidden">
          <img
            src={currentImage || "/placeholder.png"}
            alt={title}
            className="w-full h-[270px] object-cover transition duration-700 group-hover:scale-105"
          />
        </div>

        {/* CONTENT */}
        <div className="px-5 py-4">

          <p className="text-[10px] uppercase tracking-[0.32em] text-[#1C2120]/45 mb-2">
            Bivela Edition
          </p>

          <h3 className="text-[24px] text-[#1C2120] mb-2">
            {title}
          </h3>

          {/* ✅ PRICE FIX */}
          <p className="text-lg font-semibold text-[#1C2120] mb-3">
            ₹{price ?? 0}
          </p>

          <button
            onClick={() => navigate(`/product/${id}`)}
            className="text-[11px] uppercase tracking-[0.26em] border-b border-[#1C2120] pb-1 hover:opacity-60 transition mb-4"
          >
            Own This Piece
          </button>

          <p className="text-sm text-[#1C2120]/70 min-h-[56px]">
            {description}
          </p>

        </div>
      </div>
    </div>
  );
}

export default ProductCard;