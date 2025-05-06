import api from "./apiClient";

// Fetch all events.
export const fetchEvents = () => api.get("/events").then((r) => r.data);

// Fetch upcoming events.
export const fetchUpcomingEvents = () =>
  api.get("/events/upcoming").then((r) => r.data);

// Fetch a single event by ID.
export const fetchEventById = (id) =>
  api.get(`/events/${id}`).then((r) => r.data);

// Create a new event.
export const createEvent = (eventData) =>
  api.post("/events", eventData).then((r) => r.data);

// Update an existing event.
export const updateEvent = (id, eventData) =>
  api.put(`/events/${id}`, eventData).then((r) => r.data);

// Add an artist to an event.
export const addArtistToEvent = (eventId, artistId) =>
  api.post(`/events/${eventId}/artists/${artistId}`).then((r) => r.data);

// Fetch tickets for a specific event.
export const fetchTicketsForEvent = (eventId) =>
  api.get(`/events/${eventId}/tickets`).then((r) => r.data);

// Fetch the total number of tickets for a specific event.
export const fetchTicketCountForEvent = (eventId) =>
  api.get(`/events/${eventId}/ticket-count`).then((r) => r.data);

export const deleteEvent = (id) =>
  api.delete(`/events/${id}`).then((r) => r.status); // returns 204

// (optional) Fetch events by artist
export const fetchEventsByArtist = (artistId) =>
  api.get(`/events/artist/${artistId}`).then((r) => r.data);
