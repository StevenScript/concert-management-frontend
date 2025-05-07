import api from "./apiClient";

// Fetch all artists.
export const fetchArtists = () => api.get("/artists").then((r) => r.data);

// Fetch a single artist by ID.
export const fetchArtistById = (id) =>
  api.get(`/artists/${id}`).then((r) => r.data);

// Create a new artist.
export const createArtist = (artistData) =>
  api.post("/artists", artistData).then((r) => r.data);

// Update an existing artist.
export const updateArtist = (id, artistData) =>
  api.put(`/artists/${id}`, artistData).then((r) => r.data);

// Fetch events for a specific artist.
export const fetchEventsForArtist = (artistId) =>
  api.get(`/artists/${artistId}/events`).then((r) => r.data);

// Fetch ticket‑count for artist
export const fetchTicketCountForArtist = (artistId) =>
  api.get(`/artists/${artistId}/ticket-count`).then((r) => r.data);

// Fetch venues where artist plays
export const fetchVenuesForArtist = (artistId) =>
  api.get(`/artists/${artistId}/venues`).then((r) => r.data);

export const deleteArtist = (id) =>
  api.delete(`/artists/${id}`).then((r) => r.status);
