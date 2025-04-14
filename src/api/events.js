import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8080";

// Fetch all events.
export const fetchEvents = async () => {
  const response = await axios.get(`${BASE_URL}/events`);
  return response.data;
};

// Fetch a single event by ID.
export const fetchEventById = async (id) => {
  const response = await axios.get(`${BASE_URL}/events/${id}`);
  return response.data;
};

// Create a new event.
export const createEvent = async (eventData) => {
  const response = await axios.post(`${BASE_URL}/events`, eventData);
  return response.data;
};

// Update an existing event.
export const updateEvent = async (id, eventData) => {
  const response = await axios.put(`${BASE_URL}/events/${id}`, eventData);
  return response.data;
};

// Add an artist to an event.
export const addArtistToEvent = async (eventId, artistId) => {
  const response = await axios.post(
    `${BASE_URL}/events/${eventId}/artists/${artistId}`
  );
  return response.data;
};

// Fetch tickets for a specific event.
export const fetchTicketsForEvent = async (eventId) => {
  const response = await axios.get(`${BASE_URL}/events/${eventId}/tickets`);
  return response.data;
};

// Fetch the total number of tickets for a specific event.
export const fetchTicketCountForEvent = async (eventId) => {
  const response = await axios.get(
    `${BASE_URL}/events/${eventId}/ticket-count`
  );
  return response.data;
};
