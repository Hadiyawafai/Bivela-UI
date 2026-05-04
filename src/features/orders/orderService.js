import api from "../../api/axios";

const config = {
  headers: {
    "ngrok-skip-browser-warning": "true",
  },
};

/**
 * INITIATE ORDER
 * POST /api/orders/initiate
 */
export const initiateOrder = (items) => {
  return api.post(
    "/orders/initiate",
    {
      items: items.map((item) => ({
        variantId: Number(item.variantId),
        quantity: Number(item.quantity),
      })),
    },
    config
  );
};

/**
 * VERIFY PAYMENT
 * POST /api/orders/verify
 */
export const verifyOrder = ({
  razorpayOrderId,
  razorpayPaymentId,
  razorpaySignature,
}) => {
  return api.post(
    "/orders/verify",
    {
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature,
    },
    config
  );
};

/**
 * UPDATE ORDER STATUS
 * PATCH /api/orders/{id}/status
 */
export const updateOrderStatus = (id, status) => {
  return api.patch(
    `/orders/${id}/status`,
    { status },
    config
  );
};