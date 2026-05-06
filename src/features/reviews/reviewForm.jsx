import React, { useState } from "react";
import { createReview } from "../reviews/reviewService";

export default function ReviewForm({
  productId,
  onClose,
  onSuccess,
}) {
  const [form, setForm] = useState({
    rating: 1,
    comment: "",
  });

  const [hover, setHover] = useState(0);
  const [loading, setLoading] = useState(false);

  const userId = localStorage.getItem("userId");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      console.log("Please login first");
      return;
    }

    if (form.rating === 0) {
      console.log("Please select rating");
      return;
    }

    if (!form.comment.trim()) {
      console.log("Comment is required");
      return;
    }

    try {
      setLoading(true);

      await createReview({
        productId: Number(productId),
        userId: Number(userId),
        rating: Number(form.rating),
        comment: form.comment.trim(),
      });

      setForm({ rating: 0, comment: "" });

      onSuccess && onSuccess();
      onClose();

    } catch (err) {
      console.error(err);
      alert("Failed to submit review");
    } finally {
      setLoading(false);
    }
  };

  return (
   
     <div className="fixed inset-0 z-[9999] bg-black/40 flex justify-center items-start pt-24"
      onClick={onClose} // ✅ outside click closes
    >
      <div
        className="bg-white w-full max-w-lg p-8 rounded-xl shadow-xl relative"
        onClick={(e) => e.stopPropagation()} // ✅ prevent inside click close
      >

        {/* ❌ CLOSE BUTTON */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="absolute top-4 right-4 text-xl hover:text-red-500 z-[999]"
        >
          ✕
        </button>

        <h2
          className="text-2xl mb-6"
          style={{ fontFamily: "TanAngleton, serif" }}
        >
          Rate & Review
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* ⭐ STAR RATING */}
          <div>
            <label className="text-sm uppercase tracking-widest text-gray-600">
              Your Rating
            </label>

            <div className="flex gap-2 mt-3">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  type="button"
                  key={n}
                  onClick={() =>
                    setForm({ ...form, rating: n })
                  }
                  onMouseEnter={() => setHover(n)}
                  onMouseLeave={() => setHover(0)}
                  className={`text-3xl transition ${
                    (hover || form.rating) >= n
                      ? "text-yellow-500"
                      : "text-gray-300"
                  }`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>

          {/* COMMENT */}
          <div>
            <label className="text-sm uppercase tracking-widest text-gray-600">
              Your Review
            </label>

            <textarea
              value={form.comment}
              onChange={(e) =>
                setForm({
                  ...form,
                  comment: e.target.value,
                })
              }
              rows={4}
              placeholder="What did you like or dislike?"
              className="w-full border border-gray-300 px-4 py-3 mt-3 rounded-lg focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
            />
          </div>

          {/* ACTIONS */}
          <div className="flex justify-end gap-4 pt-4">

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              className="px-5 py-2 border border-gray-400 rounded-lg text-sm hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-black text-white rounded-lg text-sm"
            >
              {loading ? "Submitting..." : "Submit Review"}
            </button>

          </div>

        </form>
      </div>
    </div>
  );
}