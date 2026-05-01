
import api from "../../api/axios";

// GET REVIEWS BY PRODUCT ID
export const getReviewsByProduct = async (productId) => {
  return await api.get(`/reviews/product/${productId}`, {
    headers: {
      "ngrok-skip-browser-warning": "true",
    },
  });
};

// ADD NEW REVIEW
export const createReview = async (reviewData) => {
  return await api.post("/reviews", reviewData, {
    headers: {
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "true",
    },
  });
};