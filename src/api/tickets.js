import api from "./apiClient";

// Fetch all tickets.
export const fetchTickets = () => api.get("/tickets").then((r) => r.data);

// Fetch a single ticket by ID.
export const fetchTicketById = (id) =>
  api.get(`/tickets/${id}`).then((r) => r.data);

// Create (purchase) a new ticket.
export const createTicket = (ticketData) =>
  api.post("/tickets", ticketData).then((r) => r.data);

// Update an existing ticket.
export const updateTicket = (id, ticketData) =>
  api.put(`/tickets/${id}`, ticketData).then((r) => r.data);
