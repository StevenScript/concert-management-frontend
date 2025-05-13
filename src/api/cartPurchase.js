import api from "./apiClient";
import { useAuth } from "../contexts/AuthContext";

/**
 * Purchase every item in the cart.
 * @param {Array} cartItems [{eventId, ...}]
 * @param {string} buyerEmail
 */
export const purchaseCart = async (cartItems, buyerEmail) => {
  const promises = cartItems.map((ev) =>
    api.post("/tickets", { eventId: ev.id, buyerEmail })
  );
  await Promise.all(promises);
  return true;
};
