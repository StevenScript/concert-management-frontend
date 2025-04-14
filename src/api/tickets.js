import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8080";

// Fetch all tickets.
export const fetchTickets = async () => {
  const response = await axios.get(`${BASE_URL}/tickets`);
  return response.data;
};

// Fetch a single ticket by ID.
export const fetchTicketById = async (id) => {
  const response = await axios.get(`${BASE_URL}/tickets/${id}`);
  return response.data;
};

// Create (purchase) a new ticket.
export const createTicket = async (ticketData) => {
  const response = await axios.post(`${BASE_URL}/tickets`, ticketData);
  return response.data;
};

// Update an existing ticket.
export const updateTicket = async (id, ticketData) => {
  const response = await axios.put(`${BASE_URL}/tickets/${id}`, ticketData);
  return response.data;
};
