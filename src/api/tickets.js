import api from "./apiClient";

/**
 * Get all tickets for the signed‑in user.
 * We pass the buyerEmail in the path; backend derives list.
 * @param {string} email
 */
export const fetchMyTickets = (email) =>
  api.get(`/tickets/buyer/${encodeURIComponent(email)}`).then((r) => r.data);

/**
 * Purchase ticket(s) for the given event.
 * backend infers user if buyerEmail is omitted.
 * @param {{ eventId: number, buyerEmail?: string }} payload
 */
export const createTicket = (payload) =>
  api.post("/tickets", payload).then((r) => r.data);
