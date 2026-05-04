import api from "../../api/axios";

const config = {
  headers: {
    "ngrok-skip-browser-warning": "true",
  },
};

/**
 * ➕ Add item to cart
 */
export const addToCart = ({ variantId, quantity }) => {
  return api.post(
    "/cart/add",
    {
      variantId: Number(variantId),
      quantity: Number(quantity),
    },
    config
  );
};

/**
 * ❤️ Add to wishlist
 */
export const addToWishlist = (variantId) => {
  return api.post(
    `/cart/wishlist/${variantId}`,
    {},
    config
  );
};

/**
 * 📥 Get cart
 */
export const getCart = () => {
  return api.get("/cart", config);
};

/**
 * 🗑️ Clear cart
 */
export const clearCart = () => {
  return api.delete("/cart/clear", config);
};