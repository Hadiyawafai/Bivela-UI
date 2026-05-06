import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ProductCard({
  id,
  image,
  title,
  description,
  price,
}) {
  const navigate = useNavigate();

  const [currentImage, setCurrentImage] = useState(image);

  useEffect(() => {
    setCurrentImage(image);
  }, [image]);

  return (
    <div className="group cursor-pointer w-full">
      <div className="bg-[#F2F0EF] border border-black/8 overflow-hidden transition duration-500 hover:shadow-lg">

        {/* IMAGE */}
        <div className="overflow-hidden">
          <img
            src={currentImage || "/placeholder.png"}
            alt={title}
            className="w-full h-[200px] object-cover transition duration-700 group-hover:scale-105"
          />
        </div>

        {/* CONTENT */}
        <div className="px-4 py-3">

          <p className="text-[9px] uppercase tracking-[0.25em] text-[#1C2120]/45 mb-1">
            Bivela Edition
          </p>

          <h3 className="text-sm font-medium text-[#1C2120] mb-1 leading-tight">
            {title}
          </h3>

          <p className="text-sm font-semibold text-[#1C2120] mb-2">
            ₹{price ?? 0}
          </p>

          <button
            onClick={() => navigate(`/product/${id}`)}
            className="text-[10px] uppercase tracking-[0.2em] border-b border-[#1C2120] pb-1 hover:opacity-60 transition mb-2"
          >
            View Product
          </button>

          <p className="text-xs text-[#1C2120]/70 line-clamp-2">
            {description}
          </p>

        </div>
      </div>
    </div>
  );
}

export default ProductCard;