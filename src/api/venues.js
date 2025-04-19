import api from "./apiClient";

// Fetch all venues.
export const fetchVenues = () => api.get("/venues").then((r) => r.data);

// Fetch a single venue by ID.
export const fetchVenueById = (id) =>
  api.get(`/venues/${id}`).then((r) => r.data);

// Create a new venue.
export const createVenue = (venueData) =>
  api.post("/venues", venueData).then((r) => r.data);

// Update an existing venue.
export const updateVenue = (id, venueData) =>
  api.put(`/venues/${id}`, venueData).then((r) => r.data);

// Fetch artists associated with a venue.
export const fetchArtistsForVenue = (venueId) =>
  api.get(`/venues/${venueId}/artists`).then((r) => r.data);

// Fetch upcoming events for a venue.
export const fetchUpcomingEventsForVenue = (venueId) =>
  api.get(`/venues/${venueId}/upcoming-events`).then((r) => r.data);
