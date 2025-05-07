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
 *
 */
export const createTicket = (payload) =>
  api.post("/tickets", payload).then((r) => r.data);

/** Admin: fetch every ticket in the system */
export const fetchAllTickets = () => api.get("/tickets").then((r) => r.data);

export const deleteTicket = (id) =>
  api.delete(`/tickets/${id}`).then((r) => r.status);

export const updateTicket = (id, data) =>
  api.put(`/tickets/${id}`, data).then((r) => r.data);
